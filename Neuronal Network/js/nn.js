
class NeuronalNetwork{

  constructor(input_nodes,hidden_nodes,output_nodes){
    this.input_nodes = input_nodes;
    this.hidden_nodes =  hidden_nodes;
    this.output_nodes = output_nodes;

    this.weight_ih = new Matrix(this.hidden_nodes,this.input_nodes);
    this.weight_ho = new Matrix(this.output_nodes,this.hidden_nodes);
    this.weight_ih.randomize();
    this.weight_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes,1);
    this.bias_o = new Matrix(this.output_nodes,1);
    this.bias_h.randomize();
    this.bias_o.randomize();

  }

  feedforward(input_array){
    let inputs = Matrix.fromArray(input_array);
    let hidden = Matrix.multiply(this.weight_ih,inputs);
    hidden.add(this.bias_h);
    hidden.map(this.sigmoid);

    let output = Matrix.multiply(this.weight_ho,hidden);
    output.add(this.bias_o);
    output.map(this.sigmoid);

    return output.toArray();
  }

  train(inputs,targets){
    let  outputs =  this.feedforward(inputs);
    outputs = Matrix.fromArray(outputs);
    targets = Matrix.fromArray(targets);
    let outputs_error = Matrix.substract(targets,outputs);

    let who_t =Matrix.transpose(this.weight_ho);
    let hidden_erros =  Matrix.multiply(who_t,outputs_error);

    // outputs.print();
    // targets.print();
    // error.print();
  }

  sigmoid(x){
    return 1 /(1+ Math.exp(-x))
  }

}
