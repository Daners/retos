var traning_data =[
  {
    inputs:[1,0],
    targets:[1]
  },
  {
    inputs:[0,1],
    targets:[1]
  },
  {
    inputs:[0,0],
    targets:[0]
  },
  {
    inputs:[1,1],
    targets:[0]
  }
]

  let nn ;

function setup(){
 // let a =  new Matrix(2,3);
 // a.randomize().add(1).print();
 //
 // function dubleIt(x){
 //   return x * 2;
 // }
 //
 // a.map(dubleIt).print();

 // let b = new Matrix(3,2);
 // b.randomize().add(1);
 // a.print()
 // b.print()
 // let c =  Matrix.multiply(a,b);
 // c.print()

/*let a =  new Matrix(2,3);
  a.randomize();
 let b = a.transpose();
  console.table(a.data)
  console.table(b.data)*/


 nn =new NeuronalNetwork(2,2,1);
  let inputs= [1,0];
  let target = [1];

  for (var i = 0; i < 50000; i++) {
     let data  = random(traning_data);
      nn.train(data.inputs,data.targets);
  }
  let test1 = nn.feedforward([1,0])
  let test2 = nn.feedforward([0,1])
  let test3 = nn.feedforward([1,1])
  let test4 = nn.feedforward([0,0])

  console.log(test1[0],"RND: ",Math.round(test1[0])," = ", 1);
  console.log(test2[0],"RND: ",Math.round(test2[0])," = ", 1);
  console.log(test3[0],"RND: ",Math.round(test3[0])," = ", 0);
  console.log(test4[0],"RND: ",Math.round(test4[0])," = ", 0);

}

function draw(){



}
