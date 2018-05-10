// install plugin
Matter.use(MatterAttractors);

  // module aliases
  var Engine = Matter.Engine,
      Events = Matter.Events,
      Runner = Matter.Runner,
      Render = Matter.Render,
      World = Matter.World,
      Body = Matter.Body,
      Mouse = Matter.Mouse,
      Common = Matter.Common,
      Bodies = Matter.Bodies;

  // create engine
  var engine = Engine.create();

  // create renderer
  var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: Math.min(document.documentElement.clientWidth, 1024),
      height: Math.min(document.documentElement.clientHeight, 1024),
      wireframes: false
    }
  });

  // create runner
  var runner = Runner.create();

  Runner.run(runner, engine);
  Render.run(render);

  // create demo scene
  var world = engine.world;
  world.gravity.scale = 0;

  // create a body with an attractor
  var attractiveBody = Bodies.circle( render.options.width / 2, render.options.height / 2,50,
    {
    isStatic: true,

    // example of an attractor function that
    // returns a force vector that applies to bodyB
    plugin: {
      attractors: [
        function(bodyA, bodyB) {
          return {
            x: (bodyA.position.x - bodyB.position.x) * 1e-6,
            y: (bodyA.position.y - bodyB.position.y) * 1e-6,
          };
        }
      ]
    }
  });

  World.add(world, attractiveBody);

  // add some bodies that to be attracted
  for (var i = 0; i < 5; i += 1) {
    var body = Bodies.polygon(
      Common.random(0, render.options.width),
      Common.random(0, render.options.height),
      Common.random(1, 5),
      Common.random() > 0.9 ? Common.random(15, 25) : Common.random(5, 10)
    );

    World.add(world, body);
  }

var spaceShip = Bodies.rectangle(600, 100, 8, 22);

  Matter.Body.setDensity(spaceShip, .03);

  World.add(world, spaceShip);

  Matter.Body.rotate(spaceShip, 1);



  function keyPressed(event)
  {
      switch(event.keyCode)
      {
          case 37:
              // Left Arrow key
              Matter.Body.rotate(spaceShip, .1);
              console.log(spaceShip);
               //Body.translate(spaceShip,{x:10,y:0});
              break;
          case 39:
              // Right Arrow key
            Matter.Body.rotate(spaceShip, -.1);
             //Body.translate(spaceShip,{x:-10,y:0});
              break;
          case 38:
              // Up Arrow key
              //   spaceShip.velocity.x -= 5 * Math.sin(-spaceShip.angle);
              //  spaceShip.velocity.x -= 5 * Math.cos(spaceShip.angle);
              Matter.Body.applyForce(spaceShip, spaceShip.position, { x: Math.sin(-spaceShip.angle)/100, y: Math.cos(spaceShip.angle)/100 });
              break;
      }
  }

  document.addEventListener('keydown', keyPressed);

  // // add mouse control
  // var mouse = Mouse.create(render.canvas);
  //
  // Events.on(engine, 'afterUpdate', function() {
  //     if (!mouse.position.x) {
  //       return;
  //     }
  //
  //     // smoothly move the attractor body towards the mouse
  //     Body.translate(attractiveBody, {
  //         x: (mouse.position.x - attractiveBody.position.x) * 0.25,
  //         y: (mouse.position.y - attractiveBody.position.y) * 0.25
  //     });
  // });
