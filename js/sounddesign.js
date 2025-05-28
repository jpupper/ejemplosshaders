function runAudio() {

	let notes = ["A", "B", "C", "D", "E", "F", "G"];

	let mixer = new Tone.Gain();
	let index = floor(genR(notes.length));
	let reverb = new Tone.Reverb();
	reverb.wet = genR(150);
	//reverb.decay = 20;
	//reverb.preDelay = 2;
	let osc = new Tone.Oscillator();
	let osc2 = new Tone.Oscillator();

	let feedbackDelay = new Tone.FeedbackDelay(0.0, 0.9);

	let filter = new Tone.AutoFilter({
		frequency: notes[index] + 2,
		type: "sine",
		depth: 1,
		baseFrequency: 500,
		octaves: 15.6,
		filter: {
			type: "lowpass",
			rolloff: -12,
			Q: 20
		}
	});
	let chorus = new Tone.Chorus(2, 4.5, 1.5);
	let vibrat = new Tone.Vibrato({
		maxDelay: 0.005,
		frequency: 20,
		depth: 0.1,
		type: "sine2"
	});

	let autoWah = new Tone.AutoWah({
		baseFrequency: notes[index] + 2,
		octaves: floor(genR(1, 2536)),
		sensitivity: 0,
		Q: genR(2, 20),
		gain: 2,
		follower: {
			attack: genR(1),
			release: genR(1) * 15.5
		}
	});

	//	autoWah.Q.value = 6;
	let dist = new Tone.Distortion(0.05);





	let start = "0";
	let end = "2";
	if (uniforms_fxhash.dir < 0.5) {
		let auxstart = start;
		start = end;
		end = auxstart;
	}

	osc.type = "square";
	osc.partials = new Array(floor(genR(4, 8))).fill(0).map(() => genR(1));
	osc.frequency.value = notes[index] + start;
	osc.frequency.rampTo(notes[index] + end, 10);
	osc.start().stop("+6");


	osc.connect(dist);
	dist.connect(reverb);
	reverb.connect(autoWah);
	autoWah.connect(feedbackDelay);
	feedbackDelay.connect(filter);
	filter.connect(vibrat);
	vibrat.toDestination();
	//reverb.toDestination();
}
function runAudio2() {


	if (!musicplaying) {
		let index = uniforms_fxhash.sample;
		//index = 5;
		const player = new Tone.Player("sounds/sinthwave/" + index + ".mp3");
		// play as soon as the buffer is loaded
		player.autostart = true;
		player.loop = true;
		player.playbackRate = genR(0.25, 1.0);
		let reverb = new Tone.Reverb();
		reverb.decay = genR(2, 10);
		reverb.wet = genR(2, 5);
		const feedbackDelay = new Tone.FeedbackDelay("1n", 0.1);
		const autoWah = new Tone.AutoWah(genR(0, 250), genR(0, 250), genR(-0.5, 0.5))
		const pitchShift = new Tone.PitchShift();
		pitchShift.pitch = floor(genR(-1, 1)); // down one octave
		//pitchShift.pitch = 7; // up a fifth

		player.chain(reverb, feedbackDelay, autoWah, Tone.Destination);
		//vibrat.toDestination();
		//reverb.toDestination();
		musicplaying = true
	}
}
function runAudio3() {
	if (!musicplaying) {

		let notas = ["A", "B", "C", "D", "E", "F", "G"];
		let nindex = floor(genR(notas.length - 1));



		//LAYER 1 
		var vol = new Tone.Volume(-10);
		var fb1 = new Tone.FeedbackDelay("8n", 0.5);
		var filter = new Tone.AutoFilter(15).start();
		filter.wet = 10;
		var distortion = new Tone.Distortion(0.2);
		let jpsynth1 = new JPSynthManager(new Tone.FMSynth,
			Tonal.Scale.get(notas[nindex] + "1 egyptian").notes,
			"2n",
			"1n",
			0.9,
			true);

		jpsynth1.setLoop();
		jpsynth1.synth.connect(fb1);
		fb1.connect(filter)
		filter.connect(distortion)
		distortion.connect(vol)
		vol.toMaster();


		//LAYER 2
		var vol2 = new Tone.Volume(-7);
		var fb2 = new Tone.FeedbackDelay("16n", 0.5);
		const autoWah = new Tone.AutoWah(20, 8, -30)
		autoWah.Q = 100; 
		let jpsynth2 = new JPSynthManager(new Tone.PolySynth,
			Tonal.Scale.get(notas[nindex] + "2 egyptian").notes,
			"16n",
			"8n",
			0.2,
			false);
		jpsynth2.setLoop();
		jpsynth2.synth.connect(fb2);
		fb2.connect(autoWah);
		autoWah.connect(vol2);
		vol2.toMaster();



		Tone.Master.volume.value = 1.;
		Tone.Transport.start();

		musicplaying = true
	}
}
function runAudioAlien() {
	if (!musicplaying) {

		let notas = ["A", "B", "C", "D", "E", "F", "G"];
		let nindex = floor(genR(notas.length - 1));



		//LAYER 1 
		var vol = new Tone.Volume(-16);
		var fb1 = new Tone.FeedbackDelay("4n", 0.5);
		var filter = new Tone.AutoFilter(2);
		const cheby = new Tone.Chebyshev(floor(genR(50)));
		filter.wet = 1500;
		var distortion = new Tone.Distortion(0.2);
		let jpsynth1 = new JPSynthManager(new Tone.PolySynth,
			Tonal.Scale.get(notas[nindex] + "1 egyptian").notes,
			"8n",
			"1n",
			0.85,
			//0.0,
			false);

		jpsynth1.setLoop();
		jpsynth1.synth.connect(fb1);
		fb1.connect(filter)
		filter.connect(distortion)
		distortion.connect(cheby)
		cheby.connect(vol)
		vol.toDestination();

		//LAYER 2
		var vol2 = new Tone.Volume(-24);
		var fb2 = new Tone.FeedbackDelay("16n", 0.65);
		const cheby2 = new Tone.Chebyshev(60);
		let jpsynth2 = new JPSynthManager(new Tone.AMSynth,
			Tonal.Scale.get(notas[nindex] + "2 egyptian").notes,
			"16n",
			"4n",
			0.82,
			//0.0,
			false);
		jpsynth2.setLoop();
		jpsynth2.synth.connect(cheby2);
		cheby2.connect(fb2);
		fb2.connect(vol2);
		vol2.toDestination();

		//LAYER 3
		var vol3 = new Tone.Volume(-25);
		var fb3 = new Tone.FeedbackDelay("8n", 0.75);
		const cheby3 = new Tone.Chebyshev(60);
		const pingPong = new Tone.PingPongDelay("32n", 0.8)

		let jpsynth3 = new JPSynthManager(new Tone.AMSynth,
			Tonal.Scale.get(notas[nindex] + "4 egyptian").notes,
			"32n",
			"8n",
			0.72,
			false);
		jpsynth3.setLoop();
		jpsynth3.synth.connect(fb3);
		//cheby3.connect(fb3);
		fb3.connect(pingPong)
		pingPong.connect(vol3);
		vol3.toDestination();


		Tone.Master.volume.value = 1.;
		Tone.Transport.start();
		musicplaying = true
	}
}
function runAudioAlien2() {
	if (!musicplaying) {

		let notas = ["A", "B", "C", "D", "E", "F", "G"];
		let nindex = floor(genR(notas.length - 1));



		//LAYER 1 
		var vol = new Tone.Volume(-18);
		var distortion = new Tone.Distortion(0.2);
		var fb1 = new Tone.FeedbackDelay("18n", 0.65);
		let jpsynth1 = new JPSynthManager(new Tone.PluckSynth(),
			Tonal.Scale.get(notas[nindex] + "4 egyptian").notes,
			"4n",
			"8n",
			//0.52,
			0.9,
			false);

		jpsynth1.setLoop();
		jpsynth1.synth.connect(fb1);
		fb1.connect(vol);
		vol.toDestination();


		//LAYER 2 
		var vol2 = new Tone.Volume(-21);
		let jpsynth2 = new JPSynthManager(new Tone.MembraneSynth(),
			Tonal.Scale.get(notas[nindex] + "1 egyptian").notes,
			"2n",
			"1n",
			1.0,
			//0.0,
			false);

		var fb2 = new Tone.FeedbackDelay("48n", 0.85);

		jpsynth2.setLoop();
		jpsynth2.synth.connect(fb2);
		fb2.connect(vol2);
		vol2.toDestination();

		//LAYER 3
		var vol3 = new Tone.Volume(-24);
		var fb3 = new Tone.FeedbackDelay("18n", 0.65);
		const cheby3 = new Tone.Chebyshev(50);
		const freeverb = new Tone.Freeverb();
		freeverb.dampening = 1500;
		const autoWah = new Tone.AutoWah(40, 20, 70)
		autoWah.Q.value = 7;
		let jpsynth3 = new JPSynthManager(new Tone.PluckSynth,
			Tonal.Scale.get(notas[nindex] + "3 egyptian").notes,
			"8n",
			"4n",
			//0.0,
			0.8,
			false);

		jpsynth3.setLoop();
		jpsynth3.synth.connect(freeverb);
		//cheby3.connect(freeverb)
		freeverb.connect(fb3)
		fb3.connect(vol3);
		fb3.connect(autoWah);
		autoWah.connect(vol3)
		vol3.toDestination();



		Tone.Master.volume.value = 0.5;
		Tone.Transport.start();
		musicplaying = true
	}
}
function runAudioAlien3() {
	if (!musicplaying) {
		//console.log(Tonal.Scale.names());
		let notas = ["A", "B", "C", "D", "E", "F", "G"];
		let nindex = floor(genR(notas.length - 1));



		//LAYER 1 
		var vol = new Tone.Volume(-25);
		var distortion = new Tone.Distortion(4.2);
		var fb1 = new Tone.FeedbackDelay("4n", 0.65);
		const freeverb1 = new Tone.Freeverb().toDestination();
		freeverb1.dampening = 200;
		freeverb1.wet = 2000;
		const cheby = new Tone.Chebyshev(50)
		const tremolo = new Tone.Tremolo(10, 0.2)
		const chorus = new Tone.Chorus(4, 2.5, 0.5)
		const autoWah2 = new Tone.AutoWah(10, 6, -30)
		autoWah2.Q = 150;
	
		let jpsynth1 = new JPSynthManager(new Tone.DuoSynth(),
			Tonal.Scale.get(notas[nindex] + "1 major").notes,
			"6n",
			"1n",
			//0.52,
			0.9,
			false);

		jpsynth1.setLoop();
		jpsynth1.synth.connect(distortion);
		distortion.connect(fb1)
		fb1.connect(autoWah2);
		autoWah2.connect(vol);
		vol.toDestination();


		//LAYER 2 
		var vol2 = new Tone.Volume(-14);
		var distortion = new Tone.Distortion(4.2);
		var fb2 = new Tone.FeedbackDelay("8n", 0.75);
		const freeverb2 = new Tone.Freeverb();
		freeverb2.dampening = 1500;
		freeverb2.wet = 2000;

		const cheby2 = new Tone.Chebyshev(20);
		console.log(Tonal.Scale.names());
		let jpsynth2 = new JPSynthManager(new Tone.AMSynth(),
			Tonal.Scale.get(notas[nindex] + "2 major").notes,
			"18n",
			"2n",
			//0.52,
			0.9,
			false);

		jpsynth2.setLoop();
		jpsynth2.synth.connect(fb2);
		fb2.connect(freeverb2);
		freeverb2.connect(vol2);
		//cheby2.connect(vol2);
		vol2.toDestination();

		//LAYER 3
		var vol3 = new Tone.Volume(-24);
		var fb3 = new Tone.FeedbackDelay("18n", 0.75);
		const cheby3 = new Tone.Chebyshev(60);
		const pingPong = new Tone.PingPongDelay("64n", 0.8)

		let jpsynth3 = new JPSynthManager(new Tone.AMSynth,
			Tonal.Scale.get(notas[nindex] + "4 major").notes,
			"32n",
			"8n",
			0.72,
			false);
		jpsynth3.setLoop();
		jpsynth3.synth.connect(fb3);
		//cheby3.connect(fb3);
		fb3.connect(pingPong)
		pingPong.connect(vol3);
		vol3.toDestination();

		Tone.Master.volume.value = 1.;
		Tone.Transport.start();
		musicplaying = true
	}
}
function runAudioFaces() {
	if (!musicplaying) {
		//console.log(Tonal.Scale.names());
		let notas = ["A", "B", "C", "D", "E", "F", "G"];
		let nindex = floor(genR(notas.length - 1));



		//LAYER 1 
		/*var vol = new Tone.Volume(-4);
		var distortion = new Tone.Distortion(0.2);
		var fb1 = new Tone.FeedbackDelay("4n", 0.05);
		const freeverb1 = new Tone.Freeverb().toDestination();
		freeverb1.dampening = 200;
		freeverb1.wet = 3000;
		const cheby = new Tone.Chebyshev(50)
		const tremolo = new Tone.Tremolo(10, 0.2)
		const chorus = new Tone.Chorus(4, 2.5, 0.5)
		const autoWah2 = new Tone.AutoWah(8000, 6, -30)
		autoWah2.Q = 1500;
		const autoFilter = new Tone.AutoFilter("50n")
		let jpsynth1 = new JPSynthManager(new Tone.MembraneSynth(),
			Tonal.Scale.get(notas[nindex] + "1 major").notes,
			"6n",
			"2n",
			//0.52,
			1.0,
			false);

		jpsynth1.setLoop();
		jpsynth1.synth.connect(distortion);
		distortion.connect(fb1)
		fb1.connect(autoWah2);
		autoWah2.connect(autoFilter);
		autoFilter.connect(vol)
		vol.toDestination();*/

		let cnt = 4;
		for (let i = 0; i < cnt; i++) {


			let interval = map(i, 0, cnt - 1, 8, 1);
			let dur = map(i, 0, cnt - 1, 2, 8);
			let scale = map(i, 0, cnt - 1, 1, 6);
			jp = new JPTrack(dur + "n", interval + "n", scale);
		//	jp = new JPTrack(dur + "n", interval + "n", scale);
		//	jp.setup("4n", "2n");
        }
		//jp = new JPTrack("8n","4n", 4);
		Tone.Master.volume.value = 1.;
		Tone.Transport.start();
		musicplaying = true
	}
}







class JPTrack {
	constructor(_dur, _bpm,_scale) {
		let notas = ["A", "B", "C", "D", "E", "F", "G"];
		let nindex = floor(genR(notas.length - 1));

		var vol = new Tone.Volume(-4);
		var distortion = new Tone.Distortion(0.2);
		var fb1 = new Tone.FeedbackDelay("4n", 0.05);
		const freeverb1 = new Tone.Freeverb().toDestination();
		//freeverb1.dampening = 200;
		//freeverb1.wet = 3000;
		const cheby = new Tone.Chebyshev(50)
		const tremolo = new Tone.Tremolo(10, 0.2)
		const chorus = new Tone.Chorus(4, 2.5, 0.5)
		let autoWah2 = new Tone.AutoWah(200, 6, -30)
		// autoWah2.Q = 1500;
		const autoFilter = new Tone.AutoFilter("50n")
		let jpsynth1 = new JPSynthManager(new Tone.Synth(),
			Tonal.Scale.get(notas[nindex] +_scale+ " major").notes,
			_dur,
			_bpm,
			//0.52,
			.8,
			false);

		jpsynth1.setLoop();
		jpsynth1.synth.connect(distortion);
		distortion.connect(fb1)
		fb1.connect(autoWah2);
		autoWah2.connect(autoFilter);
		autoFilter.connect(vol)
		vol.toDestination();
	}
	/*setup(_dur, _bpm){
		 let notas = ["A", "B", "C", "D", "E", "F", "G"];
		 let nindex = floor(genR(notas.length - 1));

		 var vol = new Tone.Volume(-4);
		 var distortion = new Tone.Distortion(0.2);
		 var fb1 = new Tone.FeedbackDelay("4n", 0.05);
		 const freeverb1 = new Tone.Freeverb().toDestination();
		 //freeverb1.dampening = 200;
		 //freeverb1.wet = 3000;
		 const cheby = new Tone.Chebyshev(50)
		 const tremolo = new Tone.Tremolo(10, 0.2)
		 const chorus = new Tone.Chorus(4, 2.5, 0.5)
		 let autoWah2 = new Tone.AutoWah(8000, 6, -30)
		// autoWah2.Q = 1500;
		 const autoFilter = new Tone.AutoFilter("50n")
		 let jpsynth1 = new JPSynthManager(new Tone.MembraneSynth(),
			 Tonal.Scale.get(notas[nindex] + "1 major").notes,
			 _dur,
			 _bpm,
			 //0.52,
			 1.0,
			 false);

		 jpsynth1.setLoop();
		 jpsynth1.synth.connect(distortion);
		 distortion.connect(fb1)
		 fb1.connect(autoWah2);
		 autoWah2.connect(autoFilter);
		 autoFilter.connect(vol)
		 vol.toDestination();
	}*/
}
class JPSynthManager{
	constructor(synthobj, musicscale,noteduration,notebpm,posibility,canrepeat) {
		this.musicscale = musicscale;
		this.synth = synthobj;
		this.noteduration = noteduration;
		this.notebpm = notebpm;

		this.prevNote = 0;
		this.posibility = posibility;
		this.canrepeat = canrepeat;
    }
	setLoop() {
		let loop = new Tone.Loop((time) => {
			let n = noise(frameCount * 0.1);
			let idx = floor(map(n, 0, 1, 0, this.musicscale.length)); // floor rounds down
			let note = this.musicscale[idx];
			if (!this.canrepeat) {
				if (this.prevNote === note) {
					let idx2 = idx - 1;
					if (idx2 < -1) {
						idx2 += 2;
					}
					note = this.musicscale[idx2];
                }
            }
			if (genR(1) < this.posibility) {
				this.synth.triggerAttackRelease(note, this.noteduration, time);
			}
			this.prevNote = note;
		}, this.notebpm);
		loop.start();
    }
}