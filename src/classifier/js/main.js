p5.prototype.registerPreloadMethod('loadBytes');

p5.prototype.loadBytes = function(file, callback) {
  var self = this;
  var data = {};
  var oReq = new XMLHttpRequest();
  oReq.open("GET", file, true);
  oReq.responseType = "arraybuffer";
  oReq.onload = function(oEvent) {
    var arrayBuffer = oReq.response;
    if (arrayBuffer) {
      data.bytes = new Uint8Array(arrayBuffer);
      if (callback) {
        callback(data);
      }
      self._decrementPreload();
    }
  }
  oReq.send(null);
  return data;
}

const len = 784;
const total_data = 1000;
const CAT = 0;
const RAINBOWN = 1;
const TRAIN = 2;

let rainbowns_data;
let trains_data;
let cats_data;

let rainbowns = {};
let trains = {};
let cats = {};

let nn;



function preload(){
  rainbowns_data = loadBytes('data/rainbows1000.bin');
  trains_data = loadBytes('data/trains1000.bin');
  cats_data = loadBytes('data/cats1000.bin');

}
function prepareData(category,data,label){
  category.training = [];
  category.testing = [];
  for (var i = 0; i < total_data; i++) {
    let offset = i * len;
    let threshold = floor(0.8* total_data);
    if(i < threshold){
      category.training[i] = data.bytes.subarray(offset,offset+len);
      category.training[i].label = label;
    }else{
      category.testing[i - threshold] = data.bytes.subarray(offset,offset+len);
      category.testing[i - threshold].label = label;
    }

  }
}

function trainEpoch(training){
  shuffle(training,true);

  for (let i = 0; i < training.length; i++) {
    let data = training[i];
    let inputs = Array.from(data).map(x => x /255);
    let label = training[i].label;
    let targets = [0,0,0];
    targets[label]= 1;
    nn.train(inputs,targets);
  }
}

function testAll(testing){
let correct=0;
  for (let i = 0; i < testing.length; i++) {
    let data = testing[i];
    let inputs = Array.from(data).map(x => x /255);
    let label = testing[i].label;
    //let targets = [0,0,0];
    //targets[label]= 1;
    let guess = nn.predict(inputs);

    let m = max(guess);
    let classification = guess.indexOf(m);

    if(classification === label){
      correct++;
    }
  }
  let percent = 100*correct /testing.length;
  return percent;
}

function setup (){
  createCanvas(280,280);
  background(255);

  prepareData(rainbowns,rainbowns_data,RAINBOWN);
  prepareData(trains,trains_data,TRAIN);
  prepareData(cats,cats_data,CAT);

  nn = new NeuronalNetwork(len,64,3);

  //training
  let training = [];
  training =  training.concat(cats.training);
  training =  training.concat(rainbowns.training);
  training =  training.concat(trains.training);
  let testing = [];
  testing =  testing.concat(cats.testing);
  testing =  testing.concat(rainbowns.testing);
  testing =  testing.concat(trains.testing);



let trainButton = select("#train");

let epochCounter = 0;
trainButton.mousePressed(()=>{
  trainEpoch(training);
  epochCounter++;
  console.log("Epoch: "+epochCounter);
});
let testButton = select("#test");
testButton.mousePressed(()=>{
    let percent = testAll(testing);
    console.log("Percent: "+nf(percent,2,2)+"%");
});
let clearButton = select("#clear");
clearButton.mousePressed(()=>{
  background(255);
});

let guessButton = select("#guess");
guessButton.mousePressed(()=>{
  let inputs = [];
  let img = get();
  img.resize(28,28);
  img.loadPixels();
  for (var i = 0; i < len; i++) {
    let brigth = img.pixels[i*4];
    inputs[i] = (255-brigth) / 255.0
  }

  let guess = nn.predict(inputs);
//  image(img,0,0)
  let m = max(guess);
  let classification = guess.indexOf(m);

  if (classification === CAT) {
    console.log("CAT");
  }else if (classification === TRAIN) {
        console.log("TRAIN");
  }else if (classification === RAINBOWN) {
        console.log("RAINBOWN");
  }
});


// for (var i = 1; i < 6; i++) {
//   trainEpoch(training);
//
//   let percent = testAll(testing);
//   //console.log("% Correct: " + percent);
//   console.log(" Entenamiento: "+i+" >[]- %"+percent);
// }



  // let total = 100;
  // for (let n = 0; n < total; n++) {
  //   let img = createImage(28,28);
  //   img.loadPixels();
  //   let offset = n * 784;
  //   for (let i = 0; i < 784; i++) {
  //     let val = 255-rainbowns_data.bytes[i+offset];
  //     img.pixels[i*4 + 0] = val;
  //     img.pixels[i*4 + 1] = val;
  //     img.pixels[i*4 + 2] = val;
  //     img.pixels[i*4 + 3] = 255;
  //   }
  //   img.updatePixels();
  //   let x = (n %10) *28;
  //   let y = floor(n/10)*28;
  //   image(img,x,y);
  // }

}

function mouseDragged(){

}

function draw(){
    strokeWeight(16);
    stroke(0);
    if(mouseIsPressed){
      line(pmouseX,pmouseY,mouseX,mouseY);
  }
  }
