class Rocket{


  constructor(){
    this.col = 255;
    this.width = 4;
    this.height= 12;
    this.pos = createVector(20,20);
    this.vel = createVector(0,0);
    this.angle = Math.PI / 2;
    this.orient = 0;
    this.engineOn = false;
    this.rotationLeft = false;
    this.rotationRight = false;
    this.crashed =false;
    this.thrust =0.009;
    this.speed = 0;
    this.land =  false;
    this.fuel = 500;
    this.particles = [];
    this.detectObj = [];
    this.count = 0;
    this.mass = 20;
    this.Gravity = .1;
  }


  orbit(body){
		var gravity_force = 0;
		var gravity_force_x = 0;
		var gravity_force_y = 0;
		var x_dir = 0;
		var y_dir = 0;
		var alpha =  0;


		/* Gravitational force */
		var g_dist = dist(this.pos.x,this.pos.y,body.pos.x,body.pos.y)
		gravity_force = ((this.Gravity * this.mass * body.mass)/(sq(g_dist)));
		if (body.pos.x != this.pos.x) {
			alpha = atan(abs((body.pos.y - this.pos.y)) / abs((body.pos.x - this.pos.x)));
			gravity_force_x = gravity_force * cos(alpha);
			gravity_force_y = gravity_force * sin(alpha);
		} else {
			gravity_force_x = 0;
			gravity_force_y = gravity_force;
		}

		/* Gravitational force direction */
		if (this.pos.x < body.pos.x) {
			if(this.pos.y < body.pos.y) {
				x_dir = 1;
				y_dir = 1;
			} else {
				x_dir = 1;
				y_dir = -1;
			}
		} else {
			if(this.pos.y < body.pos.y) {
				x_dir = -1;
				y_dir = 1;
			} else {
				x_dir = -1;
				y_dir = -1;
			}
		}

		/* Apply gravitational force */
		this.applyForce(createVector((x_dir * gravity_force_x), (y_dir * gravity_force_y)));
	}

  applyForce(force){
      this.vel.add(force);
      // for (var i = this.particles.length-1; i >=0; i--) {
      //   this.particles[i].applyForce(force);
      // }
  }

  detectCrash(objects){
    for (var i = 0; i < objects.length; i++) {
      // if (this.pos.x   > objects[i].X && this.pos.x  <  objects[i].X+ objects[i].w &&
      //   this.pos.y  >  objects[i].Y && this.pos.y  <  objects[i].Y+ objects[i].h ) {
      this.radarDetect(objects)

      var hit;
      if(objects[i].radius){
      	hit = collideRectCircle(this.pos.x,this.pos.y,this.width,this.height,objects[i].X,objects[i].Y,objects[i].radius);
      }else{
        hit = collideRectRect(this.pos.x,this.pos.y,this.width,this.height,objects[i].X,objects[i].Y,objects[i].w,objects[i].h);
      }

          if(objects[i] instanceof Planet && this.speed < 1 && hit ){

              this.land = true;

          }else if (hit){
            this.explode();
            this.crashed = true;
          }

      // }
    }

    if(this.pos.x > width || this.pos.x < 0){
          this.explode();
        this.crashed = true;
    }
    if(this.pos.y > height || this.pos.y < 0){
          this.explode();
        this.crashed = true;
    }
  }

  radarDetect(objs){

    if( this.count >=40){
      this.detectObj = [];
    }


    objs.forEach((obj)=>{
      if(this.count >= 5 && obj instanceof Planet){

        var d = dist(this.pos.x, this.pos.y, obj.X, obj.Y);
        var objectDetect = {
          X:  obj.X -cos(d),
          Y: obj.Y-sin(d),
          d:d
        }

        if(d<=290){
          this.detectObj.push(objectDetect);
        }
        if(this.detectObj.length >200){
            this.detectObj = [];
        }
      }
    })

  }

  turnLeft(){
    this.angle -= Math.PI / 180;
    this.orient -=.3;
    if(this.orient <-55){
      this.orient = 0;
    }
  }

  turnRight(){
    this.angle += Math.PI / 180;
    this.orient +=.3;
    if(this.orient > 55){
      this.orient = 0;
    }
  }

  engine(){
      if(this.fuel >0){
          this.vel.x -= this.thrust * Math.sin(-this.angle);
          this.vel.y -= this.thrust * Math.cos(this.angle);
          this.engineOn = true;
          this.fuel -= 0.5
        }
  }


  update(){

    if(!this.crashed && !this.land){
      this.pos.add(this.vel);
      this.speed = this.vel.mag();
    }

    for (var i = this.particles.length-1; i >=0; i--) {
      this.particles[i].update();
      if(this.particles[i].done()){
        this.particles.splice(i,1);
      }
    }

  }

  explode(){
    this.fuel = 0
    if(!this.crashed){
        for (var i = 0; i < 100; i++) {
          var p =  new Particle(this.pos.x,this.pos.y,255);
          p.applyForce(0.0002);
          this.particles.push(p);
        }
    }
  }

  show(){
    noStroke();

    push();
    if(!this.crashed){

      fill(this.col)
      translate(this.pos.x,this.pos.y);
      rotate(this.angle)

      // rect(0,0, 25,5);
      rect(this.width * -0.5, this.height * -0.5,this.width,  this.height);
      noFill();
      strokeWeight(1);
      stroke(0)
    //  ellipse(0,0,600,600);
       if(this.engineOn && !this.land){
         stroke(255);
         beginShape();
          vertex(this.width * 0.6, this.height * 0.5);
          vertex(0, this.height * 0.5 + Math.random() * 10);
          vertex(this.width * -0.5, this.height * 0.5);
          endShape();
            this.engineOn = false;;
      }
    }

    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
    pop();
  }
}
