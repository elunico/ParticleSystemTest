class Particle {
  constructor(x, y, v, size = 8) {
    this.pos = createVector(x, y);
    this.vel = v;
    this.acc = createVector(0, 0);
    // this.color = color(160, 30, 200);
    this.size = size;
    this.maxForce = 3;
    this.airResistance = 0.01;
  }

  loseEnergy() {
    this.vel.mult(1 - this.airResistance);
  }

  seek(x, y) {
    let goal = p5.Vector.sub(createVector(mouseX, mouseY), this.pos);
    goal.setMag(this.maxForce);
    this.applyForce(goal);
  }

  flee(x, y) {
    let goal = p5.Vector.sub(createVector(mouseX, mouseY), this.pos);
    goal.setMag(-this.maxForce);
    this.applyForce(goal);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    if (this.pos.x > width || this.pos.x < 0) {
      this.vel.x = -(this.vel.x * 0.9);
    }
    if (this.pos.y > height || this.pos.y < 0) {
      this.vel.y = -(this.vel.y * 0.9);
    }

    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  show() {
    colorMode(HSB);

    // let h = map(abs(this.vel.mag()), 0, 25, 230, 0);
    let h = 20;
    fill(h, 200, 200);

    let diameter = map(abs(this.vel.mag()), 0, 25, 4, 16);
    noStroke();
    ellipse(this.pos.x, this.pos.y, diameter);
  }

  copy(posOffset) {
    if (!posOffset) {
      posOffset = p5.Vector.random2D();
      posOffset.x *= width;
      posOffset.y *= height;
    }

    let p = new Particle(posOffset.x, posOffset.y, this.vel.copy(), this.size);
    p.acc = this.acc.copy();
    p.airResistance = this.airResistance;
    p.maxForce = this.maxForce;
    return p;
  }
}