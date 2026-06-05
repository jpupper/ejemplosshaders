/**
 * Background shader — WebGL canvas con senos/cosenos + mouse displace
 * Olas fluidas, patrones de interferencia, y desplazamiento visible al mover el mouse.
 */
(function() {
    var canvas = document.getElementById('bg-shader');
    if (!canvas) return;

    var gl = canvas.getContext('webgl', { alpha: false }) ||
             canvas.getContext('experimental-webgl', { alpha: false });

    if (!gl) {
        canvas.style.display = 'none';
        return;
    }

    // ── Vertex shader (full-screen quad) ──
    var vsSource = [
        'attribute vec2 aPosition;',
        'varying vec2 vUv;',
        'void main() {',
        '  vUv = aPosition * 0.5 + 0.5;',
        '  gl_Position = vec4(aPosition, 0.0, 1.0);',
        '}'
    ].join('\n');

    var vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vsSource);
    gl.compileShader(vs);

    // ── Fragment shader: ondas, interferencia, mouse displace ──
    var fsSource = [
        'precision highp float;',
        'varying vec2 vUv;',
        'uniform vec2 uResolution;',
        'uniform vec2 uMouse;',
        'uniform float uTime;',

        'void main() {',
        '  vec2 uv = vUv;',

        // Distancia al mouse + zona de influencia (radio grande)
        '  float dist = length(uv - uMouse);',
        '  float influence = smoothstep(0.6, 0.0, dist);',
        '  float influenceSoft = exp(-dist * 3.5);',

        // El mouse "empuja" las UVs hacia afuera — efecto de lente
        '  vec2 dir = uv - uMouse;',
        '  float push = influenceSoft * 0.12;',
        '  uv += dir * push;',

        // Deformacion UV con senos y cosenos — 3 capas
        '  vec2 duv = uv;',

        // Capa 1: ondas grandes lentas
        '  duv.x += sin(uv.y * 4.5 + uTime * 0.18) * 0.025 * (1.0 + influence * 3.5);',
        '  duv.y += cos(uv.x * 5.2 + uTime * 0.22) * 0.025 * (1.0 + influence * 3.5);',

        // Capa 2: ondas medias — estas se amplifican mas con el mouse
        '  duv.x += sin(uv.y * 9.0 - uTime * 0.32) * 0.014 * (1.0 + influence * 6.0);',
        '  duv.y += cos(uv.x * 10.5 + uTime * 0.36) * 0.014 * (1.0 + influence * 6.0);',

        // Capa 3: ondas finas rapidas — se distorsionan cerca del mouse
        '  duv.x += sin(uv.y * 18.0 + uTime * 0.55) * 0.006 * (1.0 + influenceSoft * 8.0);',
        '  duv.y += cos(uv.x * 20.0 - uTime * 0.60) * 0.006 * (1.0 + influenceSoft * 8.0);',

        // Patrones de onda — interferencia de multiples frecuencias
        '  float wave1 = sin(duv.x * 8.0 + uTime * 0.35) * cos(duv.y * 6.5 + uTime * 0.42);',
        '  float wave2 = sin(duv.y * 10.0 + duv.x * 3.0 + uTime * 0.50);',
        '  float wave3 = cos(length(duv - 0.5) * 14.0 - uTime * 0.58);',
        '  float wave4 = sin(duv.x * 15.0 - uTime * 0.20) * sin(duv.y * 13.0 + uTime * 0.25);',

        // Patron de interferencia circular centrado en el mouse
        '  float ripple = sin(dist * 25.0 - uTime * 2.5) * influenceSoft * 0.55;',
        '  ripple += sin(dist * 15.0 - uTime * 1.8) * influenceSoft * 0.35;',
        '  ripple += sin(dist * 40.0 - uTime * 3.5) * influenceSoft * 0.20;',

        // Combinar todo
        '  float pattern = wave1 * 0.35 + wave2 * 0.30 + wave3 * 0.20 + wave4 * 0.15;',
        '  pattern = pattern * 0.5 + 0.5;', // normalizar a [0,1]
        '  pattern += ripple;',

        // Color base oscuro con matiz cyan/morado
        '  vec3 baseColor = vec3(0.02, 0.03, 0.08);',
        '  vec3 waveColor = mix(vec3(0.0, 0.12, 0.22), vec3(0.06, 0.02, 0.18), pattern);',
        '  vec3 color = baseColor + waveColor * 0.5;',

        // Brillo donde hay mas actividad de ondas
        '  color += vec3(0.01, 0.06, 0.12) * pattern * 0.9;',

        // Destello extra en picos de onda
        '  float peak = smoothstep(0.7, 1.0, pattern);',
        '  color += vec3(0.02, 0.10, 0.20) * peak * 0.4;',

        // Ripple del mouse da un glow cyan
        '  color += vec3(0.0, 0.15, 0.30) * abs(ripple) * 0.35;',

        // Viñeta suave en los bordes
        '  float vignette = 1.0 - length(uv - 0.5) * 0.55;',
        '  color *= vignette;',

        '  gl_FragColor = vec4(color, 1.0);',
        '}'
    ].join('\n');

    var fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fsSource);
    gl.compileShader(fs);

    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        console.error('BG shader error:', gl.getShaderInfoLog(fs));
        return;
    }

    // ── Link program ──
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    // ── Full-screen quad ──
    var verts = new Float32Array([-1,-1, 1,-1, -1,1, 1,1]);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);

    var aPos = gl.getAttribLocation(prog, 'aPosition');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // ── Uniforms ──
    var uRes = gl.getUniformLocation(prog, 'uResolution');
    var uMouse = gl.getUniformLocation(prog, 'uMouse');
    var uTime = gl.getUniformLocation(prog, 'uTime');

    // ── Mouse tracking con lerp ──
    var mouse = { x: 0.5, y: 0.5 };
    var target = { x: 0.5, y: 0.5 };

    document.addEventListener('mousemove', function(e) {
        target.x = e.clientX / window.innerWidth;
        target.y = 1.0 - e.clientY / window.innerHeight;
    });

    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 0) {
            target.x = e.touches[0].clientX / window.innerWidth;
            target.y = 1.0 - e.touches[0].clientY / window.innerHeight;
        }
    }, { passive: true });

    // ── Resize ──
    function resize() {
        var w = window.innerWidth;
        var h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
    }

    window.addEventListener('resize', resize);
    resize();

    // ── Render loop ──
    function render(t) {
        requestAnimationFrame(render);

        // Lerp suave del mouse
        mouse.x += (target.x - mouse.x) * 0.08;
        mouse.y += (target.y - mouse.y) * 0.08;

        gl.uniform2f(uMouse, mouse.x, mouse.y);
        gl.uniform1f(uTime, t * 0.001);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    requestAnimationFrame(render);
})();
