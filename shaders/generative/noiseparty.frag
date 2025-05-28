precision mediump float;
//vec3 verdejpupper(){return vec3(0.0,1.0,0.8);}

// we need the sketch resolution to perform some calculations
uniform vec2 resolution ;
uniform float time ;
uniform vec2 mouse ;
uniform sampler2D feedback ;

varying vec2 vTexCoord ;

#define iTime time
#define iResolution resolution

#define PI 3.14159265359
#define TWO_PI 6.28318530718

#define OCTAVES 8
#define pi 3.14159265359


uniform float cnt ;
uniform float ite_scale ;
uniform float speedrdm ;
uniform float speedx ;
uniform float speedy ;

uniform float amp2 ;
uniform float f1 ;
uniform float f2 ;

vec2 scale(vec2 uv, float s);
float sin2(float f);
float cos2(float f);
mat2 scale(vec2 _scale);
mat2 rotate2d(float _angle);

//float noise (in vec2 st,float fase);
//vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
//vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
//float snoise(vec2 v);
//float random (in vec2 _st);
#define PI 3.14159265359
#define TWO_PI 6.28318530718

float sm(float v1,float v2,float val){return smoothstep(v1,v2,val);}

#define octaves 8

vec3 hsb2rgb( in vec3 c ){
    vec3 rgb = clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),
                             6.0)-3.0)-1.0,
                     0.0,
                     1.0 );
    rgb = rgb*rgb*(3.0-2.0*rgb);
    return c.z * mix(vec3(1.0), rgb, c.y);
}

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float random2 (in vec2 _st,float _time) {
    return fract(sin(dot(floor(_st.xy),
                         vec2(12.9898,78.233)))*
        43000.3+_time);
}
float random2 (in vec2 _st) {
    return fract(sin(dot(floor(_st.xy),
                         vec2(12.9898,78.233)))*
        43000.3);
}

float mapr(float _value,float _low2,float _high2) {
	float val = _low2 + (_high2 - _low2) * (_value - 0.) / (1.0 - 0.);
    //float val = 0.1;
	return val;
}

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.56222123);
}
float noise2 (in vec2 st,float fase) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float fase2 = fase;
    // Four corners in 2D of a tile
    float a = sin(random(i)*fase2);
    float b =  sin(random(i + vec2(1.0, 0.0))*fase2);
    float c =  sin(random(i + vec2(0.0, 1.0))*fase2);
    float d =  sin(random(i + vec2(1.0, 1.0))*fase2);

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}
float fbm2 (in vec2 st) {
    // Initial values
    float value = 0.0;
    float amplitude = 0.8;
    float frequency = 0.;
    vec2 shift = vec2(100);
    
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    
    // Loop of octaves
    for (int i = 0; i < octaves; i++) {
        value += amplitude * noise2(st,time);
        
    
        st = rot * st * 2.0 + shift;
       
        amplitude *= .5;
    }
    return value;
}
void main(void)
{   
    	vec2 uv = gl_FragCoord.xy / resolution;
	float fix = resolution.x/resolution.y;
	uv.x *=fix;
	vec2 puv = gl_FragCoord.xy ;
	vec4 fb =  texture2D(feedback, puv/resolution);

	
	vec3 dib = vec3(1.0);
	
	const int maxcnt = 8;
	int mcnt = int(floor(mapr(cnt,4.0,float(maxcnt))));
	
	float mite_scale = mapr(ite_scale,.2,0.45);
	float mspeedx = mapr(speedx,-0.005,0.005);
	float mspeedy = mapr(speedy,-0.005,0.005);
	//float mspeedrot = mapr(speedrot,-0.005,0.005);
	float mspeedrdm = mapr(speedrdm,0.0,0.1);
	
	//col1 = vec3(1.0,0.0,0.0);
	//col2 = vec3(0.0,0.0,1.0);

	for(int i=1; i<maxcnt; i++){
		float fase = float(i)*pi*2./float(mcnt);
		vec2 uv2 = uv;
		float indx = float(i)/float(mcnt);
		
		uv2.x+=time*mspeedx*10.;
		uv2.y+=time*mspeedy*10.;
	
		uv2-=vec2(0.5*fix,0.5);
		uv2 = scale(vec2(mite_scale*float(i)))*uv2;
		uv2+=vec2(0.5*fix,0.5);
		
			
		uv2-=vec2(resolution.x*fix,resolution.y);
		uv2 = rotate2d(fase*PI*2.0)*uv2;
		uv2+=vec2(resolution.x*fix,resolution.y);
		
		float e4 = sin(uv2.y*10.+time+sin(uv2.x*2.)*.5+.5)*mapr(amp2,0.05,0.3);
		
		uv2+=random2(uv2*uv.x*800.*f1+sin(uv.y*15.*f2+time*.2)*0.1+time*.5)*e4*4.;
		uv2+=random2(uv2*uv.y*10.*f2+sin(uv.x*5.*f1+time*.2)*0.1+time*.5)*e4*4.;
		float e = random2(uv2*mite_scale*float(i),time*mspeedrdm*.2+fase);
		vec3 col1 = hsb2rgb(vec3(0.8,1.0,1.0));
		vec3 col2 = hsb2rgb(vec3(0.2,0.8,1.0));
		
		float cnt_cols = 5.;
		
		col1 = vec3(sin(e*10.)*1.5,0.0,0.5);
		col2 = vec3(sin(e*2.+time*.5)*0.5,sin(e*10.)*1.5,0.0);
		
		dib+= vec3(e)*mix(col2,col1,e)*2.5;
	}
	
	
	dib/=(float(mcnt)+1.);
	
	//dib = smoothstep(sm1,sm2,dib);
	dib = smoothstep(.0,1.,dib);
	
	
	
	vec3 fin = dib*.8;
	
	gl_FragColor = vec4(fin,1.0); 
}
