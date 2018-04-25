class Pipe {
  constructor() {

    // How big is the empty space
    let spacing = 110;
    // Where is th center of the empty space
    let centery = random(spacing, height - spacing);

    // Top and bottom of pipe
    this.top = centery - spacing / 2;
    this.bottom = height - (centery + spacing / 2);
    // Starts at the edge
    this.x = width;
    // Width of pipe
    this.w = 80;
    // How fast
    this.speed = 5;
      this.highlight = false;
  }

  // Did this pipe hit a bird?
  hits(bird) {
    if ((bird.y - bird.r) < this.top || (bird.y + bird.r) > (height - this.bottom)) {
      if (bird.x > this.x && bird.x < this.x + this.w) {
          this.highlight = true;
        return true;
      }
    }
    return false;
  }

  // Draw the pipe
  show() {
    fill(34,139,34);
    if (this.highlight){
      fill(255,0,0);
    }
    rect(this.x, 0, this.w, this.top);
    fill(34,120,34);
    rect(this.x-2, this.top-35, this.w+4, 5);
    fill(34,139,34);
    rect(this.x-2, this.top-30, this.w+4, 30);

    rect(this.x, height - this.bottom, this.w, this.bottom);
     fill(34,120,34);
     rect(this.x-2, height - this.bottom+30, this.w+4, 5);
    fill(34,139,34);
    rect(this.x-2, height - this.bottom, this.w+4, 30);
  }

  // Update the pipe
  update() {
    this.x -= this.speed;
  }

  // Has it moved offscreen?
  offscreen() {
    if (this.x < -this.w) {
      return true;
    } else {
      return false;
    }
  }
}
