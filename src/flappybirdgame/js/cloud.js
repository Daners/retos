class Cloud{
    constructor(x,y){
      this.x=x||width;
      this.y=y||random(height);
      this.size = random(1.3, 2.8);
    }


    update(){
      this.x -= 0.5;
      this.y -= random(-0.5, 0.5);
    }
    show(){
      fill(255, 255, 255);
    	noStroke();
    	arc(this.x, this.y, 25 * this.size, 20 * this.size, PI + TWO_PI, TWO_PI);
    	arc(this.x + 10, this.y, 25 * this.size, 45 * this.size, PI + TWO_PI, TWO_PI);
    	arc(this.x + 25, this.y, 25 * this.size, 35 * this.size, PI + TWO_PI, TWO_PI);
    	arc(this.x + 40, this.y, 30 * this.size, 20 * this.size, PI + TWO_PI, TWO_PI);

    }

    offscreen() {
      if (this.x+80 < this.size) {
        return true;
      } else {
        return false;
      }
    }
}
