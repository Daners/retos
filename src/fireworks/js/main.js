

class Particle{

  constructor(x,y,hu,firework){
    this.pos = createVector(x,y);
    this.acc =  createVector(0,0);
    this.firework = firework;
    this.lifespan = 255;
    this.hu = hu
    if(this.firework){
      this.vel = createVector(0,random(-20,-10))
    }else {
        this.vel = p5.Vector.random2D();
        this.vel.mult(random(2,10));
    }
  }

  applyForce(force){
    this.acc.add(force);
  }

  update(){
    if(!this.firework){
      this.vel.mult(0.9);
      this.lifespan -=4;
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  show(){
    colorMode(HSB)
    if(!this.firework){
      strokeWeight(2)
    stroke(this.hu,255,255,this.lifespan)
  }else{
    strokeWeight(4)
    stroke(this.hu,255,255)
  }
    point(this.pos.x, this.pos.y);
  }

  done(){
    if(this.lifespan<0){
      return true;
    }else{
      return false;
    }
  }
}



class Firework{

  constructor(){
    this.hu = random(255);
    this.firework = new Particle(random(width),height,this.hu,true);
    this.exploded = false;
    this.particles = [];
  }

  update(force){
    if (!this.exploded) {
        this.firework.applyForce(force);
        this.firework.update();
        if(this.firework.vel.y >=0){
          this.exploded = true;
          this.explode();
        }
      }
      for (var i = this.particles.length-1; i >=0; i--) {
        this.particles[i].applyForce(force);
        this.particles[i].update();
        if(this.particles[i].done()){
          this.particles.splice(i,1);
        }
      }

  }

  explode(){
    for (var i = 0; i < 100; i++) {
      var p =  new Particle(this.firework.pos.x,this.firework.pos.y,this.hu);
      this.particles.push(p);
    }
  }

  show(){
    if (!this.exploded) {
      this.firework.show();
    }
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show()
    }
  }

  done(){
    if(this.exploded && this.particles.length ===0 ){
      return true;
    }else{
      return false;
    }
  }
}

var fireWorks = [];
var gravity;
function setup(){

  createCanvas(windowWidth+2,windowHeight);
  gravity = createVector(0,0.2);
  colorMode(HSB)
  stroke(255);
  strokeWeight(4);
  background(0);
}

function draw(){
  colorMode(RGB)
  background(0,0,0,25);
  if(random(1)<0.1){
    fireWorks.push(new Firework());
  }
  for (var i = fireWorks.length-1; i>=0 ; i--) {
    fireWorks[i].update(gravity);
      fireWorks[i].show();
      if(fireWorks[i].done()){
        fireWorks.splice(i,1);
      }
  }

}
