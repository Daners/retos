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

    if(!this.firework){
      strokeWeight(2)
    stroke(this.hu,this.lifespan)
  }else{
    strokeWeight(4)
    stroke(this.hu)
  }
    point(this.pos.x, this.pos.y);
    fill(this.hu,this.lifespan)
    rect(this.pos.x, this.pos.y,3,3)
  }

  done(){
    if(this.lifespan<0){
      return true;
    }else{
      return false;
    }
  }
}
