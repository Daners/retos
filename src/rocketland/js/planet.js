

class Planet{

  constructor(x,y,r){

    this.X = x || random(width);
    this.Y = y || random(height);
    this.pos = createVector(this.X,this.Y);
    this.radius = r || random(50,120);
    this.w = this.radius; // width of the Platform
    this.h = this.radius; // height of the Platform
    this.mass = random(10,1000);
    this.col = random(100,200)
  }

  show(){
    fill(this.col);
    ellipse(this.X, this.Y, this.radius, this.radius);
  //  this.mercurio();
  }

  mercurio(){
    var r =  this.radius /10;
    var x =  this.X - cos(r);
    var y = this.Y - sin(r);
    for (var i = 0; i < 10; i++) {
        fill(5);
        ellipse(random(x,r), random(y,r), r, r);

    }


  }

}
