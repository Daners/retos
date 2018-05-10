
var gravity;
var rocket;
var plataform;
var planet;
var planet2;
var asteroids = [];

function setup(){

  canvas = createCanvas(windowWidth,windowHeight);
  rocket = new Rocket();
  hub = new Hub(rocket);
  plataform = new Plataform();
  planet = new Planet(width/2,height/2);
  planet2 = new Planet();

  for (var i = 0; i < 10; i++) {
    asteroids.push( new Asteroid())
  }
  gravity =  gravity = createVector(0,0.00002);

}

function draw(){
  background(50);
  noStroke();

     rocket.update();
     var objs = [planet,planet2];
     objs = objs.concat(asteroids)

     rocket.detectCrash(objs);
    // rocket.applyForce(gravity);

    asteroids.forEach(function(asteroid,i){
      asteroid.orbit(planet)
      asteroid.orbit(planet2);
      asteroid.update();
      asteroid.detectCrash([planet,planet2]);
      asteroid.show();
      if(asteroid.done()){
        asteroids.splice(i,1);
      }
    });

     rocket.orbit(planet)

     planet2.show()
     planet.show();
     rocket.show();
     hub.show();
     hub.update(mouseX,mouseY)


     if (mousePressed) {
        fill(50)
           ellipse(mouseX, mouseY, 5, 5);
       }
    if (keyIsDown(UP_ARROW)) {
        rocket.engine();
      }
      if (keyIsDown(RIGHT_ARROW)) {
          rocket.turnRight();
        }
        if (keyIsDown(LEFT_ARROW)) {
            rocket.turnLeft()
          }


}

function mousePressed() {

  // prevent default
  return false;
}
