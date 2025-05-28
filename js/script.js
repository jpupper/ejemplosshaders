let EDITMODE = true;
let QUADCANVAS = false;
let disableDrawInterface = false;
let cargoArchivo = true;
let WEBGL_ON = false; //Algunas funcionan con esto otras no. //Si cambia esto cambia e
var dropzone;
document.addEventListener("keypress", documentOnKeyPressed, false);
var RM;
var img;
var interface;
var font;
let shtest;
let pgtest;
var p5jsdraw; 
//play a middle 'C' for the duration of an 8th note

let click_duration = 5000;
let click_lasttime = 0;
let first_click = false;
let gmixer;

//DesolatedLandManager
//ooxNM5jwVNtV7F2viGJ3Su9Temt5dhvtuhL3uma2fpgRAF5xAuz

let musicplaying = false;



//let musicscale;
//let synth;
let synth2;
let synth3;

//let loop;
let loop2;
let loop3;

//let scale;
let prevNote;

let init = false;
//setFxhash_cirline();
//setFxhash_luzYSombra();
let lerpmouse = 0.0;



window.onload = function() {
	//setFxhash_luzYSombra();
//	setFxhash_FBPointer();
	//preload();
	init = true;

	///doSomethingElse();

	//console.log("SOMETHING")
	/*window.$fxhashFeatures = {
		"Threads ": 0.2,
		"Nodes " : 45
	}*/
	//setFxhash_chalk();
	//setFxhash_cajas();
	//setFxhash_redbull();
	//setFxhash_noiseparty()
	//console.table(window.$fxhashFeatures);
};

function preload() {
	//if(init){return};
	
	//setFxhashValues_noiseWorms();
	//setFxhashValues_minigame();
	//setFxhashValues_rxrpure();
	//setFxhashValues_degrade();
	//setFxhashValues_dblc();


	
	//setFxhash_luzYSombra();
	
	
	//setFxhash_keti2();
	//setFxhash_aesteticpoly();

    RM = new RenderManager();
	//p5jsdraw1 = new PamiloManager();
	//p5jsdraw1 = new HandsManager();
	//p5jsdraw1 = new LunManager();
	p5jsdraw1 = new CoralManager();
	RM.addP5draw(p5jsdraw1, 0);
	//RM.addShader('shaders/imageprocessing/rotatecolor.frag', 1, "ROT.frag");
	
	//RM.addShader('shaders/imageprocessing/fede4.frag',  RM.pgs.length, "ROT.frag");
	//RM.addShader('shaders/imageprocessing/lighting3dminimal.frag', RM.pgs.length, "ROT.frag");
	/*RM.addShader('shaders/generative/noiseparty.frag', RM.pgs.length, "ROT.frag");
	RM.addShader('shaders/imageprocessing/rotatecolor.frag', 1, "ROT.frag");
	if(genR(1.0) < .14){
		RM.addShader('shaders/imageprocessing/lighting3dminimal.frag', RM.pgs.length, "ROT.frag");
	}*/

	//RM.addShader('shaders/imageprocessing/lighting3dminimal.frag', RM.pgs.length, "ROT.frag");
	//RM.addShader('shaders/imageprocessing/mano.frag', RM.pgs.length, "MANO.frag");
	//RM.addShader('shaders/imageprocessing/rotatecolor.frag', 1, "ROT.frag");
	font = loadFont('./font/nexaheavy.ttf');


}

function setup() {
	

	noiseSeed(genR(1, 100));
	//setFxhashValues_megaspace();
	//setFxhashValues_feedbackpointer();
	document.addEventListener('contextmenu', event => event.preventDefault());
	if (QUADCANVAS) {
		createCanvas(windowHeight, windowHeight, WEBGL)
	} else {
		const cnv = createCanvas(windowWidth, windowHeight, WEBGL) 
		cnv.elt.addEventListener("contextmenu", (e) => e.preventDefault())
	}
	//createCanvas(windowWidth, windowHeght, WEBGL) 
	interface = new Interface(RM);
	if (p5jsdraw1) {
		p5jsdraw1.setup();
	}
	//p5jsdraw1.setImagePositions();

	frameRate(60)
	pixelDensity(1);
	//Esto es para que no tire error en FXHASH
	if (!disableDrawInterface) {
		textFont(font);
	}
	textFont(font);
	//textFont('Helvetica');
	//noCursor();
	//background(0)
	//RM.addP5draw(InstaFractal, 0);
	//RM.activeRender = 0;
	//console.log(STsh[4]);
	/*
	window.$fxhashFeatures = {
		"Frequency 1": uniforms_klingon.f1,
		"Frequency 2": uniforms_klingon.f2,
		"Frequency 3": uniforms_klingon.f3,
		"Frequency 4": uniforms_klingon.f4,
		"Fase R": uniforms_klingon.faser,
		"Fase G": uniforms_klingon.faseg,
		"Fase B": uniforms_klingon.faseb,
	}*/
	//setTimeout(RM.addShader('shaders/generative/circulo.frag', 0), 2000);
	dropzone = select('#defaultCanvas0');
	dropzone.dragOver(highlight);
	dropzone.dragLeave(unhighlight);
	dropzone.drop(processFile, unhighlight);
	textureMode(NORMAL);
	//interface.drawActive = !interface.drawActive;
	interface.drawActive = false;

}



function mousePressed() {
	first_click = true;
	/*uniforms_klingon.f1 = fxrand();
	uniforms_klingon.f2 = fxrand();
	uniforms_klingon.f3 = fxrand();
	uniforms_klingon.f4 = fxrand();
	uniforms_klingon.faser = fxrand();
	uniforms_klingon.faseg = fxrand();
	uniforms_klingon.faseb = fxrand();*/
	/*const synth = new Tone.PolySynth(Tone.Synth).toDestination();
	const now = Tone.now()
	
	synth.triggerAttack("D4", now);
	synth.triggerAttack("F4", now + 1.);
	synth.triggerAttack("A4", now + 1.0);
	synth.triggerAttack("C5", now + 1.0);
	synth.triggerAttack("E5", now + 1.0);
	*/
	
	/*if(millis() -  click_lasttime > click_duration || first_click){
		click_lasttime = millis();
		runAudio();	
		RM.objts[0].generate2();
		first_click = false;
	}*/
	
	//if(p5jsdraw1
	//p5jsdraw1.initAudio();
	/*osc.frequency.value = "C4";
			osc.frequency.rampTo("C2", 2);
			osc.start().stop("+8");*/

	//runAudio2();
	//runAudio3();

	//runAudioAlien();
	//runAudioAlien2();
	//runAudioAlien3();
	/*if (uniforms_fxhash.cancion == 1) {
		runAudioAlien();
	} else if (uniforms_fxhash.cancion == 2) {
		runAudioAlien2();
	} else if (uniforms_fxhash.cancion == 3){
		runAudioAlien3();
	} */
	
	
	//runAudioFaces();
	
	
	//runAudioAlien3();
	//runAudioAlien2();
	//p5jsdraw1.runAudio();
}
function mouseWheel(event) {
	//print(event.delta);
	//mw += 0.000001 * event.delta;
	//mw = constrain(mw, -0.002, 0.002);
}
function documentOnKeyPressed(event) {
	var keyCode = event.keyCode;
	let chrCode = keyCode - 48 * Math.floor(keyCode / 48);
	let chr = String.fromCharCode(keyCode);
//	console.log("BUTTON PRESSED" + chr);

	if(chr == 'r'){
		//location.reload();
	}
	if (chr == 'b') {
		//RM.pgs[0].background(0);

		//RM.clean();
		//RM.activeRender = -1;
		//interface.cleanSliders();
	//	background(0);

	}
   
	if (!disableDrawInterface) {


		if (chr == 'y') {
			grilla.generate = true;
		}
		if (chr == 'r') {
			//interface.randomizeValues();

		}
		if (chr == 'o') {
			saveToJson();
		}
		if (chr == 'l') {

		}
		if (chr == 'a') {
			//console.log("A");
			//RM.addShader('shaders/generative/circulotest.frag', 0);
		}
		if (chr == 'd' && !disableDrawInterface) {
			interface.drawActive = !interface.drawActive;
		}

		if (chr == 'c') {
			//InstaFractal.rdmColors();
			//fifulim.randomizeValues();
		}

		if (chr == 'b') {
			RM.pgs[0].background(0);

			//RM.clean();
			RM.activeRender = -1;
			interface.cleanSliders();
			background(0);

		}
		//mw = constrain(mw, -0.002, 0.002);

		//console.log("SIZ " + RM.objts.length);

		for (var i = 0; i < 9; i++) {
			if (chr == str(i) && i <= RM.objts.length && i > 0) {
				RM.activeRender = i - 1;
//				console.log("Render active" + chr);
				interface.generateSliders();

				interface.drawActive = true;

			}
		}
	}
	for (var i = 0; i < 9; i++) {
		if (chr == str(i) && i <= RM.objts.length && i > 0) {
			RM.activeRender = i - 1;
		}
	}
}
function windowResized() {


	if (QUADCANVAS) {
		resizeCanvas(windowHeight, windowHeight);
	} else {
		resizeCanvas(windowWidth, windowHeight);
	}
	
	//lerpquad = new LerpQuadManager();
	//RM.addP5draw(lerpquad, 0);
	RM.resize();
	//location.reload();
}
function updateNONglobalUniforms() {
	//Pasar buffers por defecto 

	if (RM.objts.length > 0) {
		for (var i = 1; i < RM.objts.length; i++) {
			if (RM.objts[i] != null && RM.shorojb[i] == 0) {
				RM.objts[i].sh.setUniform("tx", RM.pgs[i - 1]);
			}
		}
	}
	
	
	//HARDCODING PARA FXHASH : 

	//No se que tan bien esta que esto lo haga todos los frames pero bueno. 
	for (let j = 0; j < RM.objts.length; j++) {
		if (RM.objts[j] != null) {
			for (let i = 0; i < RM.objts[j].localUniformsNames.length; i++) {
				for (let k = 0; k < Object.keys(uniforms_fxhash).length; k++) {
					if (RM.objts[j].localUniformsNames[i] == Object.keys(uniforms_fxhash)[k]) {
						RM.objts[j].sh.setUniform(RM.objts[j].localUniformsNames[i], Object.values(uniforms_fxhash)[k]);
					}

					for (let u = 0; u < interface.sliders.length; u++) {
						if (interface.sliders[u].name == Object.keys(uniforms_fxhash)[k] || 
						interface.sliders[u].name == "autoposx" || 
						interface.sliders[u].name == "autoposy" || 
						interface.sliders[u].name == "lerpm") {
							interface.sliders[u].isFxHashControlled = true;
							interface.sliders[u].value = Object.values(uniforms_fxhash)[k];
						}
					}
				}
			}
		}
	}
	
	if(mouseIsPressed){
		lerpmouse+=0.01;
	}else{
		lerpmouse-=0.01;
	}
	lerpmouse = constrain(lerpmouse,0.0,1.0);

	//RM.objts[0].sh.setUniform("autoposx", genR(1));
	/*RM.objts[0].sh.setUniform("lerpm", lerpmouse);
	if(uniforms_fxhash.isnoisePointer){
		RM.objts[0].sh.setUniform("autoposx", noise(millis()*0.0001));
		RM.objts[0].sh.setUniform("autoposy", noise(millis()*0.0001+656534412.));
	}else{
		RM.objts[0].sh.setUniform("autoposx", genR(1));
		RM.objts[0].sh.setUniform("autoposy", genR(1));
	}*/
	//RM.setValue("circlesize",0.1);
	
	//RM.setValue("tx2",RM.pgs[0]);
	
	//RM.objts[2].sh.setUniform("tx2",RM.pgs[0]);
	/*for (let u = 0; u < interface.sliders.length; u++) {		
			interface.sliders[u].isFxHashControlled = true;
			interface.sliders[u].value = Object.values(uniforms_fxhash)[k];
	}*/
	//}
}
function draw() {

	/*push();

	scale(sin(millis() * 0.001) * 0.5 + 0.5, cos(millis() * 0.001) * 0.5 + 0.5);
	ellipse(mouseX, mouseY, 150, 150);
	pop();*/
	//scale(0.8);
	background(0);
	updateNONglobalUniforms();
	translate(-width / 2, -height / 2, 0); //moves our drawing origin to the top left corner
	//interface.drawActive = false;
	RM.draw();
	RM.update();
	//updateNONglobalUniforms();
	if (cargoArchivo) {
	//	RM.draw();
	}
	interface.update();
	if (!disableDrawInterface) {
		interface.draw();
		fill(255);
	}

	fill(255, 255);
	//textSize(30);
	//text("FPS " + getFrameRate().toFixed(2), 30, 30);
	for (let i = 0; i < touches.length; i++) {
		fill(255, 0, 0);
		ellipse(touches[i].x, touches[i].y, 10, 10);
	}
	//fill(255, 0, 0);
	//ellipse(mouseX,mouseY,40,40);
	//ellipse(touches[0].x, touches[0].y, 30, 30);
	//fill(255, 0, 0);
	//rectMode(CENTER);
	//rect(width / 2, height / 2, width * .9, height * .9);


}
function highlight() {
	//console.log("HIGHLIGHT");
}
function unhighlight() {
	//console.log("UNHIGHLIGHT");
}
function processFile(file) {
	console.log("processfile");
	console.log(file.name);
	let coso;


	if (file.name.includes(".frag")) {


		/*if (RM.objts.length == 0) {
			RM.addShader(file.data, RM.activeRender + 1);
		} else {
		}*/
		interface.drawActive = false;
		interface.cleanSliders();
		console.log(file.data);
		RM.addShader(file.data, RM.activeRender + 1, file.name);

	} else if (file.name.includes(".json")) {
		loadJSONjp(file.data);
	}
}
function loadJSONjp(filedata) {

	RM.clean();
	let k = 0;

	let GlocalNames = [];
	let GlocalValues = [];

	for (let key in filedata) {
		if (filedata.hasOwnProperty(key)) {
			RM.addShader(filedata[key].dir, k, filedata[key].name);
			let localNames = [];
			let localValues = [];
			let l = 0;
			for (let [key2, value] of Object.entries(filedata[key])) {
				if (l != 0) {
					localNames.push(key2);
					localValues.push(value);
				}
				l++;
			}
			setTimeout(() => {
				if (!disableDrawInterface) {
					interface.cleanSliders();
				}
				for (let i = 0; i < RM.objts.length; i++) {
					for (let o = 0; o < RM.objts[i].localUniformsNames.length; o++) {

						RM.objts[i].localUniformsNames[o] = GlocalNames[i][o + 1];
						//Le pongo el +1 para que no me tome el name como uno de los parametros del shader.
						RM.objts[i].localUniformsValues[o] = GlocalValues[i][o + 1];
						/*console.log(RM.objts[i].localUniformsNames[o]);
						console.log(RM.objts[i].localUniformsValues[o]);
						console.log(GlocalNames[i][o]);
						console.log(GlocalValues[i][o]);*/
					}
				}
				console.log("TERMINO DE SETEAR LOS ARCHIVOS ")
				RM.activeRender = RM.objts.length - 1;
				cargoArchivo = true;
			}, 500);
			GlocalNames.push(localNames);
			GlocalValues.push(localValues);
		}
		k++;
	}
}
function loadJSONonStart(filedata) {



	let coso = loadJSON(filedata, () => {
		//	console.log(coso)

		loadJSONjp(coso);
	});
	//console.log(filedata);
}
function loadSaveFile(data) {
	console.log(data);
}
function saveToJson() {
	let json = {}
	for (var k = 0; k < RM.objts.length; k++) {
		json["box" + k] = {};
		json["box" + k].dir = RM.objts[k].dir;
		json["box" + k].name = RM.objts[k].name;
		for (var i = 0; i < RM.objts[k].localUniformsNames.length; i++) {
			json["box" + k][RM.objts[k].localUniformsNames[i]] = RM.objts[k].localUniformsValues[i];
		}
		if (json["box" + k]["data"]) {
			delete json["box" + k]["data"];
		}
	}
	saveJSON(json, 'savefile1.json');
}
function touchStarted() {
	return false;
}
function touchEnded() {
	return false;
}
