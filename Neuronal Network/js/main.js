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


  let nn = new NeuronalNetwork(2,2,1);
  let inputs= [1,0];
  let target = [1];

  nn.train(inputs,target)
  let output = nn.feedforward(inputs);
  console.log(output);

}

function draw(){



}
