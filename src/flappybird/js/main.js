const TOTAL = 250;
var birds = [];
var pipes = [];
var mic;
var saveBirds = [];
var counter = 0;
let cycles = 100;
let slider;

function setup (){
  createCanvas(600,400);
  // mic = new p5.AudioIn();
  // mic.start();
slider = createSlider(1,100,1)
  for(let i = 0; i < TOTAL ;i++) {
    birds[i] = new Bird();
  }
//  pipes.push(new Pipe())
}

function draw(){

  for (var n = 0; n < slider.value( ); n++) {
    if(counter % 50 ==0){
        pipes.push(new Pipe())
    }
    counter++;
  //  var vol = mic.getLevel();

    for (var i =  pipes.length -1; i>=0; i--) {
      pipes[i].update();
      for (let j =birds.length-1; j>=0; j--) {
        if(pipes[i].hits(birds[j])){
          saveBirds.push( birds.splice(j,1)[0]);
        }
      }

      if(pipes[i].offscreen()){
        pipes.splice(i,1);
      }
    }

    for(let bird of birds) {
      bird.think(pipes);
      bird.update()
    }

    if (birds.length === 0) {
      counter = 0;
      nexGeneration();
      pipes = [];
    }
  }


//ALL drawing stuffs
  background(0);
  for(let bird of birds ){
    bird.show();
  }
  for(let pipe of pipes){
    pipe.show()
  }
}


//
// function keyPressed(){
//   if(key == ' '){
//     bird.up();
//   }
// }
