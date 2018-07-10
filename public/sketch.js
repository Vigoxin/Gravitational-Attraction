const log = console.log;
log('Hold \'a\' key to run');
log('Press \'s\' key once for next frame');

const Width = 500;
const Height = 500;

function setup() {
	createCanvas(Width, Height);
}

function sDraw() {
	log('h');
	background(0);
	fill(255);
	text('sketch.js is working', 50, 50);
}

function draw() {
	if (keyIsDown(65)) {
		sDraw();
	}
}

function keyPressed() {
	if (keyCode === 83) {
		sDraw();
	}
}