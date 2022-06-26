//Jorge Celestino




const model_url = 
    'https://cdn.jsdelivr.net/gh/m15js/m15-data-and-model/models/pitch-detection/crepe/';
let pitch;
let mic;
let freq = 0;
let thresholds = 1;

let notes = [
    {
        note: 'A',
        freq: 440
    },
    {
        note: 'E',
        freq: 329.6276
    },
    {
        note: 'C',
        freq: '261.6256'
    },
    {
        note: 'G',
        freq: 391.9954
    }
];

function setup() {
    createCanvas(400, 400);
    audioContext = getAudioContext();
    mic = new p5.AudioIn();
    mic.start(listening);
}

function listening() {
 console.log('listening');
 pitch = m15.pitchDetection(mode_url, audioContext, mic.stream, modelLoaded);
}

function draw(){
    background(0);
    textAlign(CENTER, CENTER);
    fill (255);
    textSize(32);
    text(freq.toFixed(2), width / 2, height - 150);

    let closesNote = -1;
    let recordDiff = Infinity;
    for (let i = 0; < notes.length; i++) {
        let diff = freq - notes[i].freq;
        if (abs(dif) < abs(recordDiff)) {
            closeNote = notes[i];
            recordDiff = diff;
        }
    }

    textSize(64);
    text(closesNote.note, width / 2, height - 50);

    let diff = recordDiff;
    // let amt = map(diff, -100, 100, 0, 1);
    // let r = color(255, 0, 0);
    // let g = color(0, 255, 0);
    // let col = lerpColor(g, r, amt);

    let alpha = map(abs(dif), 0, 100, 255, 0);
    recMode(CENTER);
    fill(255, alpha);
    stroke(225);
    strokeWeight(1);
    if (abs(diff)< threshold) {
        fil(0, 255, 0);
    }
    rect(200, 100, 200, 50);
    
    stroke(255);
    strokeWeight(4);
    listening(200, 0, 200, 200);

    noStroke();
    fill(255, 0, 0);
    if (abs(diff) < threshold) {
        fill(0, 255, 0);
    }
    rect(200 + diff / 2, 100, 10, 75);
}

function modelLoaded() {
    console.log('model loaded');
    pitch.getPitch(gotPitch);
}

function gotPitch(error, frequency) {
    if (error) { 
        console .error(error);
    } else {
        //console.log(frequency);
        if(frequency) {
            freq = grequency;
        }
        pitch.getPitch(gotPitch);
    }
}