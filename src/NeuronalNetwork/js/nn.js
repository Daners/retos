
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
    this.lerning_rate =0.1;

  }


  setLearningRate(learning_rate) {
      this.learning_rate = learning_rate;
    }
  predict(input_array){
    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weight_ih,inputs);
    hidden.add(this.bias_h);
    hidden.map(this.sigmoid);

    let output = Matrix.multiply(this.weight_ho,hidden);
    output.add(this.bias_o);
    output.map(this.sigmoid);

    return output.toArray();
  }

  train(input_array,targets_array){
    let inputs = Matrix.fromArray(input_array);

    let hidden = Matrix.multiply(this.weight_ih,inputs);
    hidden.add(this.bias_h);
    hidden.map(this.sigmoid);

    let outputs = Matrix.multiply(this.weight_ho,hidden);
    outputs.add(this.bias_o);
    outputs.map(this.sigmoid);



    let targets = Matrix.fromArray(targets_array);

    let outputs_error = Matrix.substract(targets,outputs);

      let gradients = Matrix.map(outputs,this.dsigmoid);
      gradients.multiply(outputs_error);
      gradients.multiply(this.lerning_rate);



      let hidden_T = Matrix.transpose(hidden);
      let weight_ho_deltas = Matrix.multiply(gradients,hidden_T);

      this.weight_ho.add(weight_ho_deltas);
      this.bias_o.add(gradients)

    let who_t =Matrix.transpose(this.weight_ho);
    let hidden_erros =  Matrix.multiply(who_t,outputs_error);

    let hidden_gradient = Matrix.map(hidden,this.dsigmoid);
    hidden_gradient.multiply(hidden_erros);
    hidden_gradient.multiply(this.lerning_rate);

    let inputs_T = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradient,inputs_T);

      this.weight_ih.add(weight_ih_deltas)
        this.bias_h.add(hidden_gradient)

    // outputs.print();
    // targets.print();
    // error.print();
  }

  sigmoid(x){
    return 1 /(1+ Math.exp(-x))
  }

  dsigmoid(y){
  //  return sigmoid(x) * (1 - sigmoid(x))
  return y *(1-y);

  }

}
