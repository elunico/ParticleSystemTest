// Inspired (copied) from Coding Challenge 56 from the Coding Train

let particles = [];
let sources = [];

let airResistanceDiv;
let airResistanceSlider;

let maxForceDiv;
let maxForceSlider;

let seekButton;
let haltButton;
let currentFPS;

let looping = true;
let seeking = true;

function setup() {

  haltButton = createButton('HALT!');
  haltButton.mousePressed(() => {
    if (looping) {
      noLoop();
      haltButton.html('RUN!');
    } else {
      loop();
      haltButton.html('HALT!');
    }
    looping = !looping;
  });
  createDiv('');
  createCanvas(600, 400);

  createDiv('');
  seekButton = createButton('Click adds Attractor');
  seekButton.mousePressed(() => {
    seeking = !seeking;
    if (seeking) {
      seekButton.html('Click adds Attractor');
    } else {
      seekButton.html('Click adds Repulser');

    }
  });
  airResistanceDiv = createDiv('Air Resistance: 0.20%');
  airResistanceSlider = createSlider(0, 0.15, 0.002, 0.0001);
  airResistanceSlider.input(() => {
    airResistanceDiv.html(`Air Resistance: ${nf(airResistanceSlider.value() * 100, 1, 2)}%`);
    particles.forEach((p) => p.airResistance = airResistanceSlider.value());
  });

  maxForceDiv = createDiv('Max Force: 3');
  maxForceSlider = createSlider(1, 35, 3, 0.5);
  maxForceSlider.input(() => {
    maxForceDiv.html(`Max Force: ${floor(maxForceSlider.value())}`);
    particles.forEach((p) => p.maxForce = maxForceSlider.value());
  });

  particlesCountDiv = createDiv('Particles: 100');
  particlesCountSlider = createSlider(1, 300, 100, 1);
  particlesCountSlider.input(() => {
    let p = particlesCountSlider.value();
    particlesCountDiv.html(`Particles: ${p}`);
    if (p < particles.length) {
      particles.splice(0, particles.length - p);
    } else {
      for (let i = 0; i < p - particles.length; i++) {
        // particles.push(new Particle(random(width), random(height), p5.Vector.random2D()));
        particles.push(particles[i].copy());
      }
    }
  });
  createDiv('');

  airResistanceSlider.style('width', `${width}px`);
  maxForceSlider.style('width', `${width}px`);
  particlesCountSlider.style('width', `${width}px`);

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle(random(width), random(height), p5.Vector.random2D()));
  }


  textAlign(CENTER, CENTER);
  textSize(18);

}

function mousePressed() {
  if (mouseX < width && mouseX > 0 && mouseY < height && mouseY > 0) {
    if (seeking) {
      sources.push(new Source(mouseX, mouseY, 10));
    } else {
      sources.push(new Source(mouseX, mouseY, 10));
    }
  }
}


function draw() {
  colorMode(RGB);
  background(51);

  for (let source of sources) {
    for (let particle of particles) {
      source.influence(particle);
    }
  }

  for (let particle of particles) {
    particle.loseEnergy();
    particle.update();
    particle.show();
  }

  for (let source of sources) {
    source.show();
  }

  fill(240);
  text(`${currentFPS || 0} fps`, width - 35, 15);
  if (frameCount % 10 == 0) {
    currentFPS = floor(frameRate());
  }
}
