var brain;
var inputs = [];
var points = new Array(100);
var trainIndex = 0;

function setup(){
  createCanvas(500, 500);
  brain =  new Perceptron(3);
  for (var i = 0; i < points.length; i++) {
    points[i] =  new Point();
  }
}

function draw(){
  background(255);
  stroke(0);

  var p1 =  new Point(-1,f(-1));
  var p2 =  new Point(1,f(1));

  line(p1.pixelX(),p1.pixelY(),p2.pixelX(),p2.pixelY());


  var p3 =  new Point(-1,brain.guessY(-1));
  var p4 =  new Point(1,brain.guessY(1));

  line(p3.pixelX(),p3.pixelY(),p4.pixelX(),p4.pixelY());

  points.forEach(function(po){
    po.show();
    var inp = [po.x,po.y,po.bias];
    var target = po.label;
    var guess  =  brain.guess(inp);
    if (guess == target) {
      fill(0,255,0)
    }else {
      fill(255,0,0);
    }
    noStroke();
    ellipse(po.pixelX(),po.pixelY(),8,8);
  })

  var pointt = points[trainIndex]
    var inp = [pointt.x,pointt.y,pointt.bias];
    var target = pointt.label;
    brain.train(inp,target);
    trainIndex ++;
    if(trainIndex == points.length){
       trainIndex =0;
    }

}

function mousePressed(){

}


var Perceptron =  function(w){
 this.weights = new Array(w);
 this.lr = 0.01;

 for (var i = 0; i < this.weights.length; i++) {
   this.weights[i] = random(-1,1);
 }

  this.guess = function(inputs){
    var sum = 0;
    var output;
    for (var i = 0; i < this.weights.length; i++) {
      sum += inputs[i] * this.weights[i];
    }
    output = sign(sum);
    return output;
  }

  this.train =  function(inputs,target){
    var guess = this.guess(inputs);
    var err =  target - guess;
    for (var i = 0; i < this.weights.length; i++) {
      this.weights[i] += err * inputs[i] * this.lr
    }
  }

  this.guessY =  function(x){
    var w0 = this.weights[0];
    var w1= this.weights[1];
    var w2 = this.weights[2];
    return  -(w2/w1) - (w0/w1) * x;
  }

  function sign(n){
    if (n  >= 0 ) {
      return 1;
    }else {
      return -1;
    }
  }
}

function Point(x,y){
  this.x = x || random(-1,1);
  this.y = y || random(-1,1);
  this.label;
  this.bias = 1;
   var liney = f(this.x);
     if (this.y > liney) {
       this.label = 1;
     }else {
        this.label = -1;
     }

   this.pixelX = function(){
     return map(this.x,-1,1,0,width);
   }

   this.pixelY =  function(){
     return map(this.y,-1,1,height,0);
   }
   this.show =  function(){
       stroke(0);
       if (this.label == 1) {
         fill(255);
       }else {
         fill(0);
       }
       var px = this.pixelX();
       var py =  this.pixelY();

       ellipse(px,py,16,16);
   }
}

function f(x){
  return 0.3*x+0.2;
}
