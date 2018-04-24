
var bird;
var pipes = [];
var mic;
var saveBirds = [];
var count = 0;
let cycles = 100;
let slider;
var flag = true;
pipe_flag =  true;
var w = window.screen.width/1.0;
var h = window.screen.height/1.2;
var cnv;
var clouds =[];

function centerCanvas(){
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x,y);
}

function setup (){
  cnv = createCanvas(w,h);
  centerCanvas();
  slider = 10
  bird = new Bird;

  for (var i = 0; i < 10; i++) {
    clouds.push(new Cloud(random(width)))
  }


}

function draw(){

    if(frameCount % 150 ==0){
        if(pipe_flag){
          pipes.push(new Pipe())
        }
          clouds.push(new Cloud())
    }

    for (var i =  pipes.length -1; i>=0; i--) {
      if(pipe_flag){
        pipes[i].update();
      }

      if (flag == true && pipes[i].x < 0){
        flag = false;
        count += 1;
        str = "Streak: " + count;
      }
        if(pipes[i].hits(bird)){
          pipe_flag = false;
        }


      if(pipes[i].offscreen()){
        pipes.splice(i,1);
        flag = true;
      }
    }

      bird.update()


//ALL drawing stuffs
background(176,224,230);
for (var i = 0; i < clouds.length; i++) {
  var cloud = clouds[i];
  cloud.show();
  cloud.update();

    if(cloud.offscreen()){
      clouds.splice(i,1);
    }
  }

  for(let pipe of pipes){
    pipe.show()
  }
    bird.show();
    fill(0);
    textSize(32);
    str = "Streak: " + count;
    text(str, w/3, h/5);
}



function windowResized(){
  centerCanvas();
}

function touchStarted(){
  if (pipe_flag == true){
    bird.up();
  }else{
    reset()
  }



  // if (pipe_flag == false){
  //   reset();
  // }
  return false;
}

function reset(){
  pipes = [];
  count = 0;
  pipe_flag = true;
  flag = true;
}

function keyPressed(){
  if(key == ' ' && pipe_flag){
    bird.up();
  }else if(key == ' ' && !pipe_flag){
    reset();
  }
}
