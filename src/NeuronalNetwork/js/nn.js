
class NeuronalNetwork{

  constructor(a,b,c){

    if (a instanceof NeuronalNetwork) {
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;

      this.weight_ih = a.weight_ih.copy();
      this.weight_ho = a.weight_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();
      this.lerning_rate =0.1;
    } else {
    this.input_nodes = a;
    this.hidden_nodes =  b;
    this.output_nodes = c;

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

  // Adding function for neuro-evolution
  copy() {
    return new NeuronalNetwork(this);
  }
  // Accept an arbitrary function for mutation
  mutate(func) {
    this.weight_ih.map(func);
    this.weight_ho.map(func);
    this.bias_h.map(func);
    this.bias_o.map(func);
  }

  sigmoid(x){
    return 1 /(1+ Math.exp(-x))
  }

  dsigmoid(y){
  //  return sigmoid(x) * (1 - sigmoid(x))
  return y *(1-y);

  }

}
