class Plataform {

  constructor(){
    this.w = 100; // width of the Platform
    this.h = 30; // height of the Platform
    this.X = width/2 - this.w; // x-coordinate of the Platform
    this.Y = height/2- this.h; // y-coordinate of the Platform;
    this.alt = 50;
    this.scoore = random(1,50);
  }

  show(){
    fill(255);
      // rect(this.X+this.h, this.Y-this.alt, 5, this.alt);
      // rect((this.X-this.h)+this.w, this.Y-this.alt, 5, this.alt);
     rect(this.X, this.Y, this.w, this.h);
  }



}
