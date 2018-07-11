const log = console.log;

const Width = 500;
const Height = 500;
var diameter = 10;
var gravConst = 5;

var particles;

class Particle {
	constructor(id) {
		this.id = id;
		this.loc = createVector(random()*300+Width/2-150, random()*300+Height/2-150);
		this.vel = createVector(0, 0);
		if (this.id === 1) {
			this.vel = createVector(0, 1);
		}
		this.acc = createVector(0, 0);

		this.diameter = random()*19+1;
		this.mass = this.diameter/10;
	}

	changeAcc() {
		this.acc.mult(0);

		this.attractOthers();



		if (mouseIsPressed && this.id === 1) {
			this.applyForce(createVector(0, -0.1));
		}
	}

	attractOthers() {
		this.others = particles.filter(p => p.id !== this.id);

		for (let other of this.others) {
			this.gravVec = other.loc.copy().sub(this.loc);
			this.gravDist = this.gravVec.mag();
			this.gravDist = constrain(this.gravDist, 10, 25);
			this.gravVec.normalize();
			this.toMult = (gravConst * this.mass * other.mass) / (this.gravDist**2);
			this.gravVec.mult(this.toMult);
			this.applyForce(this.gravVec);
		}		
	}

	run() {
		// if (this.id === 1) {
			this.changeAcc();
		// }

		this.vel.add(this.acc);
		this.loc.add(this.vel);
		
		this.edges();

		this.display();
	}

	applyForce(f) {
		// this.acc.add(f);
		this.acc.add(f.copy().div(this.mass));
	}

	edges() {
		if (this.loc.y > Height-this.diameter/2) {
			this.loc.y = Height-this.diameter/2;
			this.vel.y = -abs(this.vel.y);
		}
		if (this.loc.x > Width-this.diameter/2) {
			this.loc.x = Width-this.diameter/2;
			this.vel.x = -abs(this.vel.x);
		}
		if (this.loc.y < 0+this.diameter/2) {
			this.loc.y = 0+this.diameter/2;
			this.vel.y = abs(this.vel.y);
		}
		if (this.loc.x < 0+this.diameter/2) {
			this.loc.x = 0+this.diameter/2;
			this.vel.x = abs(this.vel.x);
		}
	}

	display() {
		stroke(0);
		fill(0);
		ellipse(this.loc.x, this.loc.y, this.diameter);
	}
}

function setup() {
	createCanvas(Width, Height);

	particles = [];
	for (var i=0; i<10; i++) {
		particles.push(new Particle(i));
	}

}

function sDraw() {
	background(220);
	// bigPlanet.run();
	// smallPlanet.run();
	for (let p of particles) {
		p.run();
	}
}

function draw() {
	// if (keyIsDown(65)) {
		sDraw();
	// }
}

function keyPressed() {
	if (keyCode === 83) {
		sDraw();
	}
}