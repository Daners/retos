var network = new synaptic.Architect.Perceptron(40, 25, 3);
var creatures = [];
var foods = [];
var poisons = [];

function setup() {
  createCanvas(600, 600);
  for (var i = 0; i < 10; i++) {
    var x = random(width);
    var y = random(height);
    creatures[i] = new Creature(x,y);
  }

   for (var i = 0; i < 50; i++) {
     foods.push(new Food());
   }
   for (var i = 0; i < 10; i++) {
     poisons.push(new Poison());
   }
}

function draw() {
  background(51);
//  var target = createVector(mouseX,mouseY);
//
if(random(1) < 0.05){
  foods.push(new Food());
}

if(random(1) < 0.01){
   poisons.push(new Poison());
}


  creatures.forEach(function(creature,index,crets){
    creature.boundaries();
    creature.behaviors(foods,poisons);
    creature.update();
    creature.show();
    if(creature.dead()){
      crets.splice(index,1)
    }

  })

  foods.forEach(function(food){
    food.show();
  });

  poisons.forEach(function(poison){
    poison.show();
  });


}

class Creature{

  constructor(x,y){
    this.pos = createVector(x,y);
    this.vel = createVector(0,-2);
    this.acc = createVector();
    this.maxspeed = 3 ;
    this.maxforce = 0.5;
     this.dna = [];
     this.dna[0] = random(-2,2)
     this.dna[1] = random(-2,2);
     this.dna[2] = random(0,100)
     this.dna[3] = random(0,100);
     this.health = 1;
  }


  applyForce(force){
    this.acc.add(force);
  }
  dead(){
    return (this.health < 0)
  }
  update (){
  //  var d =  dist(this.pos.x,this.pos.y,target.x,target.y);
      this.health -=0.005;
      this.vel.add(this.acc);
      this.vel.limit(this.maxspeed);
      this.pos.add(this.vel);
      this.acc.mult(0);



  }

  seek(target){
    var desired = p5.Vector.sub(target,this.pos);
    desired.setMag(this.maxspeed);

    var steer = p5.Vector.sub(desired,this.vel);
    steer.setMag(this.maxforce);
  //  this.applyForce(steer);
    return steer;
  }

  behaviors (good,bad){
    var steerG = this.eat(good);
    var steerB =  this.eat(bad);

    steerG.mult(this.dna[0]);
    steerB.mult(this.dna[1]);
    this.applyForce(steerG);
    this.applyForce(steerB)
  }
  eat(list){
    var record = Infinity;
    var closest = null;
    for (var i = list.length-1; i >=0;  i--) {
      var d = dist(this.pos.x,this.pos.y,list[i].x,list[i].y);
      var perception;
      if(list[i] instanceof Food){
        perception = this.dna[2]
      }else{
        perception = this.dna[3]
      }

      if(d < this.maxspeed ){
        this.health += list[i].nutrition;
        list.splice(i,1)
      }else {
        if(d< record && d < perception){
          record = d;
          closest = list[i];
        }
      }
    }

    if(closest !=null){
      return  this.seek(closest.target)
      }

    return createVector(0,0);
  }

  show(){

    var gr = color(0,255,0);
    var rd =  color(255,0,0);
    var col = lerpColor(rd,gr,this.health);

    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading())
    stroke(gr);
    noFill();
    line(0,0,0,-this.dna[0]*25);
    ellipse(0,0,this.dna[2]*2);
    stroke(rd);
    line(0,0,0,-this.dna[1]*25);
    ellipse(0,0,this.dna[3]*2);

    noStroke()
    fill(col)

    rectMode(CENTER)
    rect(0,0, 10,5, 20, 15, 10, 5);
    pop();
  }

  boundaries() {
    var d =25;
    let desired = null;

    if (this.pos.x < d) {
      desired = createVector(this.maxspeed, this.vel.y);
    } else if (this.pos.x > width - d) {
      desired = createVector(-this.maxspeed, this.vel.y);
    }

    if (this.pos.y < d) {
      desired = createVector(this.vel.x, this.maxspeed);
    } else if (this.pos.y > height - d) {
      desired = createVector(this.vel.x, -this.maxspeed);
    }

    if (desired !== null) {
      desired.normalize();
      desired.mult(this.maxspeed);
      let steer = p5.Vector.sub(desired, this.vel);
      steer.limit(this.maxforce);
      this.applyForce(steer);
    }
  }

}



class Item{
  constructor(){
    this.x = random(width);
    this.y = random(height);
    this.target = createVector(this.x,this.y);
    this.color = color(255);
  }
  show(){
    fill(this.color);
    ellipse(this.x, this.y, 5, 5);
  }
}


class Food extends  Item{
    constructor(){
      super();
      this.nutrition = 0.2
      this.color = color(0,255,0);
    }
}

class Poison extends Item{
  constructor(){
    super();
    this.nutrition = -0.5
    this.color = color(255,0,0);
  }
}
