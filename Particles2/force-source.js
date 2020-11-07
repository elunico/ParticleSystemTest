class Source {
  /**
   * Construct a Source
   *
   * @callback forceCallback
   * @param {number} x the x location of the Source
   * @param {number} y the y location of the Source
   * @param {number} repulseRadius distance to the particle after which repulsion takes over
   */
  constructor(x, y, repulseRadius) {
    this.pos = createVector(x, y);
    this.repulseRadius = repulseRadius;
  }

  influence(particle) {
    let d = particle.pos.dist(this.pos);
    let force = p5.Vector.sub(this.pos, particle.pos);
    force.mult(2);
    force.mult(1 / (d * d));

    // if (d < this.repulseRadius) {
    //      force.mult(-1);
    // }
    particle.applyForce(force);
  }

  show() {
    colorMode(RGB);
    fill(0, 230, 20);

    ellipse(this.pos.x, this.pos.y, 8, 8);

  }
}
