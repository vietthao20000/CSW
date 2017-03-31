var CSW = {};
CSW.configs = {
  GAME_WIDTH: 640,
  GAME_HEIGHT:  960,
  COLORS: {
    pink: "0xfe0180",
    cyan: "0x36e1f3",
    purple: "0x8d13fe",
    yellow: "0xf5df10",
  }
};

window.onload = function(){
  CSW.game = new Phaser.Game(CSW.configs.GAME_WIDTH,CSW.configs.GAME_HEIGHT,Phaser.AUTO,'',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    }, false, false
  );
}

// preparations before game starts
var preload = function(){
  CSW.game.scale.pageAlignHorizontally = true;
  CSW.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  CSW.game.time.advancedTiming = true;

  //CSW.game.load.image('background', 'Assets/Map1.png');
  CSW.game.load.atlasJSONHash('assets', 'Assets/Textures/buttons.png', 'Assets/Textures/buttons.json');
  CSW.game.load.image('player','Assets/Textures/Player/Player.png');
  CSW.game.load.image('circle_cyan','Assets/Textures/Obstacles/Circle/cyan.png');
  CSW.game.load.image('circle_pink','Assets/Textures/Obstacles/Circle/pink.png');
  CSW.game.load.image('circle_purple','Assets/Textures/Obstacles/Circle/purple.png');
  CSW.game.load.image('circle_yellow','Assets/Textures/Obstacles/Circle/yellow.png');
  CSW.game.load.image('stripe_cyan','Assets/Textures/Obstacles/Stripes/cyan.png');
  CSW.game.load.image('stripe_pink','Assets/Textures/Obstacles/Stripes/pink.png');
  CSW.game.load.image('stripe_purple','Assets/Textures/Obstacles/Stripes/purple.png');
  CSW.game.load.image('stripe_yellow','Assets/Textures/Obstacles/Stripes/yellow.png');
  CSW.game.load.image('switch','Assets/Textures/Obstacles/switch.png');
  CSW.game.load.physics('circle_physics','Assets/Textures/Obstacles/Circle/circle.json');
  CSW.game.load.physics('stripe_physics','Assets/Textures/Obstacles/Stripes/stripe.json');
}

// initialize the game
var create = function(){
  CSW.game.world.setBounds(0, 0, CSW.configs.GAME_WIDTH, CSW.configs.GAME_HEIGHT);
  CSW.game.physics.startSystem(Phaser.Physics.P2JS);

  CSW.keyboard = CSW.game.input.keyboard;
  CSW.playerGroup = CSW.game.add.physicsGroup();
  // CSW.obstacleGroup = CSW.game.add.physicsGroup();
  // CSW.obstacleGroup.getFirstDead();



  CSW.player = new PlayerController({
    TAP:Phaser.Keyboard.SPACEBAR,
    speed: 1.4,
    direction: new Phaser.Point(0,600)
  },"purple");
  CSW.game.physics.p2.enable([CSW.player.sprite],false);

  CSW.pool = [];

  CSW.switch = new SwitchController("yellow",{x: 320, y: 0});

  CSW.pool.push(new CircleController({x: 320, y: 0}));
  CSW.pool.push(new StripeController({x: 400, y: 400}));

  CSW.pool.forEach(function(obstacle) {
    obstacle.update();
  });

  CSW.player.sprite.body.onBeginContact.add(blockHit, this);


  CSW.game.physics.p2.enable(CSW.player,CSW.circle, CSW.Stripe);

  CSW.game.camera.follow(CSW.player.sprite);
  CSW.game.camera.deadzone = new Phaser.Rectangle(0, CSW.configs.GAME_HEIGHT/2, CSW.configs.GAME_WIDTH, CSW.configs.GAME_HEIGHT/2);
}

// update game state each frame
var update = function(){
  CSW.player.update();
  CSW.game.world.setBounds(0, -CSW.player.yChange, CSW.configs.GAME_WIDTH, CSW.configs.GAME_HEIGHT);
  // CSW.game.camera.y = -CSW.player.yChange + CSW.configs.GAME_HEIGHT;
  CSW.pool.forEach(function(obs){
    if(obs.position.y > CSW.game.camera.y + CSW.configs.GAME_HEIGHT) {
      obs.parts.forEach( function(part, index) {
        part.kill();
      });
    };
  });
  CSW.game.camera.setBoundsToWorld();
}

// before camera render (mostly for debug)
var render = function(){}

var blockHit = function (body, bodyB, shapeA, shapeB, equation) {
  //  The block hit something.
  //
  //  This callback is sent 5 arguments:
  //
  //  The Phaser.Physics.P2.Body it is in contact with. *This might be null* if the Body was created directly in the p2 world.
  //  The p2.Body this Body is in contact with.
  //  The Shape from this body that caused the contact.
  //  The Shape from the contact body.
  //  The Contact Equation data array.
  //
  //  The first argument may be null or not have a sprite property, such as when you hit the world bounds.
  if (body) {
    if (body.sprite.key==='switch') {
      body.sprite.kill(); // Recycle object here
      CSW.player.sprite.tint = CSW.configs.COLORS[body.sprite.color];
      CSW.player.sprite.color = body.sprite.color;
      CSW.pool.forEach(function(obstacle) {
        obstacle.update();
      });
    }
    else {
      lose();
    }
    result = 'You last hit: ' + body.sprite.key;
  }
  else {
    result = 'You last hit: The wall :)';
    lose();
  }
  //console.log(result);
}


var lose = function() {
  console.log("You lose");
}
