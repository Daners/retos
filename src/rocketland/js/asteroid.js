
class Asteroid{
  constructor(x,y,r){
    this.X = x || random(width);
    this.Y = y || random(height);
    this.pos = createVector(this.X,this.Y);
    this.radius = r || random(10,15);
    this.vel = p5.Vector.random2D();
    this.total = floor(random(5, 15));
    this.mass = 10;
    this.Gravity = .1;
    this.crashed = false;
    this.particles=[]
    this.offset = [];
    for (var i = 0; i < this.total; i++) {
      this.offset[i] = random(-this.radius * 0.5, this.radius * 0.5);
    }
  }


  applyForce(force){
      this.vel.add(force);
  }
  update(){
      if(!this.crashed){
        this.pos.add(this.vel);
      }


      for (var i = this.particles.length-1; i >=0; i--) {
        this.particles[i].update();
        if(this.particles[i].done()){
          this.particles.splice(i,1);
        }
      }
  }

  done(){
    var isdone = false;
    if(this.particles.length <= 0 && this.crashed ){
      isdone =  true;
    }
    return isdone;
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

  detectCrash(objects){
    for (var i = 0; i < objects.length; i++) {
      var hit;
      if(objects[i].radius){
      	hit = collideCircleCircle(this.pos.x,this.pos.y,this.radius,objects[i].X,objects[i].Y,objects[i].radius);
      }
      if (hit){
            this.explode();
            this.crashed = true;
          }
    }
  }

  explode(){
    if(!this.crashed){
        for (var i = 0; i < 100; i++) {
          var p =  new Particle(this.pos.x,this.pos.y,0);
          p.applyForce(0.0002);
          this.particles.push(p);
        }
    }
  }

  show(){
      if(!this.crashed){
    push();
    stroke(5);
    fill(25)
    translate(this.pos.x, this.pos.y);
  //  ellipse(0, 0, this.r * 2);
    rotate(this.vel.heading())
    beginShape();
    for (var i = 0; i < this.total; i++) {
      var angle = map(i, 0, this.total, 0, TWO_PI);
      var r = this.radius + this.offset[i];
      var x = r * cos(angle);
      var y = r * sin(angle);
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  }

  for (var i = 0; i < this.particles.length; i++) {
    this.particles[i].show();
  }
}

}



//   this.breakup = function() {
//     var newA = [];
//     newA[0] = new Asteroid(this.pos, this.r);
//     newA[1] = new Asteroid(this.pos, this.r);
//     return newA;
//   }
//
//   this.edges = function() {
//     if (this.pos.x > width + this.r) {
//       this.pos.x = -this.r;
//     } else if (this.pos.x < -this.r) {
//       this.pos.x = width + this.r;
//     }
//     if (this.pos.y > height + this.r) {
//       this.pos.y = -this.r;
//     } else if (this.pos.y < -this.r) {
//       this.pos.y = height + this.r;
//     }
//   }
//
// }
