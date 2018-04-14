var population;
var lifespan = 400;
var popsize = 200;
var count = 0;
var target;
var maxforce = 0.2;
var obnumer = 12;
var obstacles = [];
// A HTML range slider
var slider;
var totalCrashed = 0;
var totalComplete = 0;
var iteration = 1;
var bestFit = 0;

function setup(){
  createCanvas(740, 580);
  population = new Population(popsize);
  target = createVector(width/2,50);
  var ob1 =  new Obstacle(150,250,400,10);
  var ob2 =  new Obstacle(150,350,200,10);
  var ob3 =  new Obstacle(450,350,200,10);
    var ob4 =  new Obstacle(550,50,10,250);
  obstacles.push(ob1);
  obstacles.push(ob2);
  obstacles.push(ob3);
    obstacles.push(ob4);
    slider = createSlider(0, 255, 127);

}

function draw(){

  background(0);


textSize(16);
fill(255, 255, 255);
text('Iteration: '+iteration, 10, 30);
fill(0, 255, 0);
text("Completed: "+totalComplete, 10, 60);
fill(255, 0, 0);
text('Crashed: '+totalCrashed, 10, 90);

fill(255, 204, 0);
text('Fitness: '+bestFit, 10, 120);




    fill(255);
    //rect(150,250,400,10);
    for (var i = 0; i < obstacles.length; i++) {
      obstacles[i].show();
    }
    ellipse(target.x,target.y,16,16);


      population.run();
      count++;
      if(count == lifespan){
        //  population = new Population();
          totalCrashed = 0;
          totalComplete = 0;
          iteration ++;
         population.evaluate();
         population.selection()
        count = 0;


      }

}

function Obstacle(rx,ry,rw,rh){
  this.rx = rx;
  this.ry = ry;
  this.rw = rw;
  this.rh = rh;

  this.show = function(){
    rect(this.rx,this.ry,  this.rw,  this.rh);
  }
}

function Population(popsize){

    this.rockets = [];
    if(popsize){
      this.popsize = popsize;
    }else{
      this.popsize = 200;
    }
    this.matingpool = [];
    for (var i = 0; i < this.popsize; i++) {
      this.rockets[i] = new Rocket();
    }


    this.evaluate =  function(){
      var maxfit = 0;
      for (var i = 0; i < this.popsize; i++) {
          this.rockets[i].calcFitness();
          if(this.rockets[i].fitness >maxfit){
            maxfit = this.rockets[i].fitness;

          }
      }

      bestFit = maxfit /popsize

      for (var i = 0; i < this.popsize; i++) {
        this.rockets[i].fitness /= maxfit;
      }

      this.matingpool = [];
      for (var i = 0; i < this.popsize; i++) {
        var n = this.rockets[i].fitness * 100;
        for (var j = 0; j < n; j++) {
            this.rockets[i].col = color(255, 204, 0,150);
          this.matingpool.push(this.rockets[i]);
        }
      }

    }

    this.selection = function(){
      var newRockets = [];
      for (var i = 0; i <this.rockets.length; i++) {
          var parentA = random(this.matingpool);
          var parentB = random(this.matingpool);
          var child = parentA.dna.crossover(parentB.dna);
          child.mutation();
          var colo;
          if(parentA.complete || parentB.complete){
            colo = color(0,255,0,150);
          }else{
            colo = parentA.col
          }
          newRockets[i] =  new Rocket(child,colo);
        }

        this.rockets = newRockets;
    }

    this.run =  function(){
      for (var i = 0; i < this.popsize; i++) {
          this.rockets[i].update();
            this.rockets[i].show();
      }
    }
}


function DNA(genes){

  if(genes){
    this.genes = genes;
  }else{
    this.genes = [];
    for (var i = 0; i < lifespan; i++) {
        this.genes[i] = p5.Vector.random2D();
        this.genes[i].setMag(maxforce);
    }
  }

  this.crossover =  function(partner){
    var newgenes = [];
    var mid = floor(random(this.genes.length))
    for (var i = 0; i < this.genes.length; i++) {
      if( i > mid){
        newgenes[i]= this.genes[i];
      }else{
        newgenes[i]= partner.genes[i];
      }
    }
  return new DNA(newgenes);
  }


  this.mutation = function(){
      for (var i = 0; i < this.genes.length; i++) {
        if(random(1) < 0.01){
          this.genes[i] = p5.Vector.random2D();
          this.genes[i].setMag(maxforce);
        }

      }
  }
}

function Rocket(dna,col){
  this.pos = createVector(width/2,height);
  this.vel = createVector();
  this.acc = createVector();
  this.complete = false;
  this.crashed = false;
  this.registered = false;
  if(col){
    this.col = col;
  }else{
    this.col = color(255,150);
  }
  if(dna){
    this.dna = dna;
  }else{
    this.dna =  new DNA();
  }
  this.fitness = 0;

  this.applyForce =  function(force){
    this.acc.add(force);
  }

  this.calcFitness =  function(){
    var d = dist(this.pos.x,this.pos.y,target.x,target.y);
    this.fitness = map(d,0,width,width,0);
    if(this.complete){
      this.fitness *=10;
    }
    if(this.crashed){
      this.fitness /= 10;
    }
  }

  this.update = function(){
    var d =  dist(this.pos.x,this.pos.y,target.x,target.y);
    if (d < 10) {
      this.complete = true;
      this.pos = target.copy();
      this.col = color(0,255,0,150);
    }


    for (var i = 0; i < obstacles.length; i++) {
      if (this.pos.x > obstacles[i].rx && this.pos.x <  obstacles[i].rx+ obstacles[i].rw &&
        this.pos.y >  obstacles[i].ry && this.pos.y <  obstacles[i].ry+ obstacles[i].rh) {
          this.crashed = true;
            this.col = color(255,0,0,150);

      }
    }


    if(this.pos.x > width || this.pos.x < 0){
        this.crashed = true;
        this.col = color(255,0,0,150);
    }
    if(this.pos.y > height || this.pos.y < 0){
        this.crashed = true;
        this.col = color(255,0,0,150);
    }


    if(this.crashed && !this.registered){
        totalCrashed +=1;
        this.registered = true;
    }
    if(this.complete && !this.registered){
      totalComplete +=1;
      this.registered = true;
    }

    this.applyForce(this.dna.genes[count]);
    if(!this.complete && !this.crashed){
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0.5);
      this.vel.limit(4);

    }
  }


  this.show =  function(){
    push();
    noStroke()
    fill(this.col)
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading())
    rectMode(CENTER)
    rect(0,0, 25,5);
    pop();
  }
}
