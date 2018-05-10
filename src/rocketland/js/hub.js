class Hub{

  constructor(rocket){
    this.rocket = rocket;
    this.x=50;
    this.y=50;
    this.w;
    this.h;


  }

  show(){

    this.showFuel();
    this.showSpeed();
    this.showGiro();
    this.showRadar();

  }

  showFuel(){
    strokeWeight(1);
    stroke(3)
    fill(51, 122, 183);
    textSize(15);
    text('Fuel', this.x+30, this.y+15);
    var totPro = map( this.rocket.fuel,500,0,60,0,true);
    fill(0);
    rect(this.x+39, this.y+80,12, -60);
    fill(51, 122, 183);
    rect(this.x+40, this.y+80,10, -totPro);
  }

  showSpeed(){
    strokeWeight(1);
    stroke(3)
    fill(51, 122, 183);
    textSize(15);
    text('Speed', this.x+70, this.y+15);
    var totSpeed = map( this.rocket.speed,0,4.5,0,60,true);
    fill(0);
    rect(this.x+89, this.y+80,12, -60);
    fill(51, 122, 183);
    rect(this.x+90, this.y+80,10, -totSpeed);
  }

  showRadar(){
    stroke(51, 122, 183);
    strokeWeight(2);
    noFill();
    translate(0,80);
    push();
    ellipse(0,0,60,60);
    fill(0);
    //rect((rocket.width )* -0.5, (rocket.height) * -0.5,rocket.width,  rocket.height);
    var s = map(this.rocket.count, 0, 60, 0, TWO_PI) - HALF_PI;
    var s2 = map(this.rocket.count-1, 0, 60, 0, TWO_PI) - HALF_PI;
    var s3 = map(this.rocket.count-2, 0, 60, 0, TWO_PI) - HALF_PI;

    line(0, 0,cos(s) * 30 , sin(s) * 30);
    stroke(51, 122, 183,130);
    line(0, 0,cos(s2) * 30 , sin(s2) * 30);
    line(0, 0,cos(s3) * 30 , sin(s3) * 30);
    stroke(51, 122, 183);

  //  rotate(this.rocket.angle)
    this.rocket.detectObj.forEach((obj)=>{
      ellipse((obj.X-this.rocket.pos.x)/10, (obj.Y- this.rocket.pos.y)/10,5,5);
    });
    this.detectObj = [];
    if(this.rocket.count>=60){
      this.rocket.count =0;
    }
    this.rocket.count +=0.5
    pop();

  }

  showGiro(){
      stroke(51, 122, 183);
      strokeWeight(2);
      noFill();
      var a = this.rocket.angle;
      translate(this.x+160,this.y+50);
      push();
      line(-30, 0, 30, 0);
      line(0, -30, 0, 30);
      ellipse(0,0,60,60)
      rotate(a);
      fill(0);
      stroke(51, 122, 183);
      strokeWeight(1);
      rect((rocket.width +5)* -0.5, (rocket.height+15) * -0.5,rocket.width+5,  rocket.height+15);
      triangle(-10, -7, 0, -17, 10, -7);
      pop();
  }

  update(x,y){
    this.x=x;
    this.y=y;
  }

}
