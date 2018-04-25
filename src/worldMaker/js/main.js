var mx = 0;
var my = 0;
var dragw = 0;
var dragh = 0;

var tempdragw = 0;
var tempdragh = 0;

var tempmx = 0;
var tempmy = 0;
var typeElm = "";
var target;
var startPoint;

var containerBtns;

var population;
var lifespan = 400;
var popsize = 200;
var count = 0;
var maxforce = 0.2;
var obnumer = 12;
var obstacles = [];
var totalCrashed = 0;
var totalComplete = 0;
var iteration = 1;
var bestFit = 0;
var start = false;

let slider;

function setup (){


  createCanvas(
    window.innerWidth-2,
    window.innerHeight
  );



  containerBtns = createDiv('');
  containerBtns.id('btns');

  containerBtnsStop= createDiv('');
  containerBtnsStop.id('btnStopDiv');
   containerBtnsStop.hide();
//div.hide();

   Obsbutn = createButton('Obstacle');
   Obsbutn.position(80, 20);
   Obsbutn.parent('btns');
   Obsbutn.mousePressed(function(){changeElm("OBS")});


   targetBtn = createButton('Target');
   targetBtn.position(170, 20);
   targetBtn.parent('btns');
   targetBtn.mousePressed(function(){changeElm("TRG")});

   startBtn = createButton('Start');
   startBtn.position(240, 20 );
   startBtn.parent('btns');
   startBtn.mousePressed(function(){changeElm("STR")});

   playBtn = createButton('Play');
   playBtn.position(19, 20 );
   playBtn.parent('btns');
   playBtn.mousePressed(function(){

      typeElm = "PLAY"
     if(startPoint && target){
       containerBtns.hide();
       containerBtnsStop.show();
       count = 0;
       start = true;

     }else{
       alert("Seleccione un punto de partida y un Objetivo")
     }
   });


   stopBtn = createButton('Stop');
   stopBtn.position(19, 20 );
   stopBtn.parent('btnStopDiv');
   stopBtn.mousePressed(function(){

      typeElm = "STOP";
      count = lifespan;
      start = false;
      containerBtns.show();
      containerBtnsStop.hide();

   });
   slider = createSlider(1,100,1)

   slider.position(19, 80);

}

function draw(){

  for (var n = 0; n < slider.value(); n++) {

    if (start && startPoint && target) {
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
  }


      background(0);
      noStroke();
if(start){
      fill(255  ,80);
      rect(width-220, 5, 150, 165,5);
      textSize(16);

      fill(51, 122, 183);
      text('Lifespan: ', width-200, 30);
      var totPro = map( count,0,lifespan,40,0)
      rect(width-130, 20,totPro , 5);

      fill(91, 192, 222);
      text('Iteration: '+iteration, width-200, 150);

      fill(92, 184, 92);
      text("Completed: "+totalComplete, width-200, 60);
      fill(217, 83, 79);
      text('Crashed: '+totalCrashed, width-200, 90);

      fill(240, 173, 78);
      text('Fitness: '+ round(bestFit), width-200, 120);

}

        fill(0, 255, 0);
        text('X: '+round(mouseX), mouseX, mouseY-20);
        fill(255);
        text('Y: '+round(mouseY), mouseX, mouseY);

      if(typeElm === "OBS"){
          rect(tempmx, tempmy, tempdragw, tempdragh);
      }


      if (!mouseIsPressed) {
        if(dragw && dragh){
          if(typeElm === "OBS"){

            var obs = new Obstacle(mx,my,dragw,dragh);
            obstacles.push(obs);
            console.log(obstacles);
          }
        }
      if(mx && my){
            if(typeElm === "TRG"){
                target = new Target(mx,my);
                console.log(target);
              }else if(typeElm === "STR"){
                startPoint = new Target(mx,my,"START");
                  population = new Population(popsize);
                console.log(startPoint);

              }
          }
        mx = 0;
        my = 0;
        dragw =0;
        dragh =0;
        tempmx = 0;
        tempmy = 0;
        tempdragw =0;
        tempdragh =0;
      }




      for (var i = 0; i < obstacles.length; i++) {
        obstacles[i].show();
      }

      if(target){
        target.show();
      }

      if(startPoint){
        startPoint.show();
      }

      if (start && startPoint && target) {
        population.show();
      }



  }

function calculateProgress(value,sizebar,life){
  var totalPorcent = (value * 100)/life;
  var totalProgress = (totalPorcent*sizebar)/100;
  return totalProgress;
}
function getJsonObs(){
    var obs = [];

    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
          var tempOb = {
            rx : ob.rx,
            ry : ob.ry,
            rw : ob.rw,
            rh : ob.rh
          }
          obs.push(tempOb)
    }
return obs;

}


  function changeElm(type) {
    typeElm = type;
  }

  function Target(x,y,type){
    this.pos = createVector(x,y);
    this.d = 15;
    if(type){
      this.type = type;
    }else{
      this.type = "END"
    }
    this.show =  function(){

      var col = color(0,70,255);
      if(this.type === "END"){
          col = color(0,255,70);
      }

      ellipseMode(RADIUS); // Set ellipseMode to RADIUS
      fill(0); // Set fill to white
      stroke(col);
      strokeWeight(2);
      ellipse(this.pos.x, this.pos.y,this.d,this.d);
      ellipseMode(CENTER);
      fill(col);
      noStroke(col);
      ellipse(this.pos.x, this.pos.y,this.d,this.d);
    }
  }

  function Obstacle(rx,ry,rw,rh){
    this.rx = rx;
    this.ry = ry;
    this.rw = rw;
    this.rh = rh;

    this.show = function(){
      fill(255,80)
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
      this.show =  function(){
        for (var i = 0; i < this.popsize; i++) {
            //this.rockets[i].update();
              this.rockets[i].show();
        }
      }
      this.run =  function(){
        for (var i = 0; i < this.popsize; i++) {
            this.rockets[i].update();
            //  this.rockets[i].show();
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

    if(startPoint){
      this.pos = startPoint.pos.copy();
    }else{
      this.pos = createVector(width/2,height);
    }



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
      var d = dist(this.pos.x,this.pos.y,target.pos.x,target.pos.y);
      this.fitness = map(d,0,width,width,0);
      if(this.complete){
        this.fitness *=10;
      }
      if(this.crashed){
        this.fitness /= 10;
      }
    }

    this.update = function(){
      var d =  dist(this.pos.x,this.pos.y,target.pos.x,target.pos.y);
      if (d < 10) {
        this.complete = true;
        this.pos = target.pos.copy();
        this.col = color(0,255,0,150);
      }


      for (var i = 0; i < obstacles.length; i++) {
        if (this.pos.x > obstacles[i].rx && this.pos.x <  obstacles[i].rx+ Math.abs( obstacles[i].rw) &&
          this.pos.y >  obstacles[i].ry && this.pos.y <  obstacles[i].ry+ Math.abs( obstacles[i].rh)) {
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

  function mouseDragged() {
    dragw = mouseX-mx;
    dragh = mouseY-my;

    tempdragw = mouseX-tempmx;
    tempdragh = mouseY-tempmy;

    if(tempdragw < 0){
      dragw = abs(tempdragw);
      mx =  mouseX;
    }
    if(tempdragh < 0){
      dragh = abs(tempdragh);
      my =  mouseY;
    }
  return true;
  }

  function mousePressed() {
    mx = mouseX;
    my = mouseY;
    tempmx = mouseX;
    tempmy = mouseY;

    return true;
  }
