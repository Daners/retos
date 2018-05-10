function nexGeneration(){
  console.log("new Generation");

  calculateFitness();

  for (var i = 0; i < TOTAL; i++) {
    birds[i] =  pickOne();
  }
  saveBirds =[];

}

function pickOne(){

  var index = 0;
  var r = random(1);
  while (r > 0) {
    r = r -saveBirds[index].fitness;
    index++;
  }
  index --;

  let bird = saveBirds[index];
  let child = new Bird(bird.brain)
  return child;
}

function orderBirds(birds){
var ordBirds = birds.sort(function(a,b){
    return a.fitness -b.fitness
  });

  ordBirds[birds.length-1].col = color(0,255,255,100);

  return ordBirds;


}
  function calculateFitness(){
    let sum = 0;
    for (let bird of saveBirds) {
      sum += bird.score;
    }
    for (let bird of saveBirds) {
     bird.fitness = bird.score / sum;
    }

  }
