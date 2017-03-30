var CSW = {};
CSW.configs = {
  GAME_WIDTH: 640,
  GAME_HEIGHT:  960,
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
  CSW.game.load.physics('circle_physics','Assets/Textures/Obstacles/Circle/circle.json');
}

// initialize the game
var create = function(){
  CSW.game.physics.startSystem(Phaser.Physics.P2JS);
  CSW.game.physics.p2.restitution = 0.9;

  CSW.keyboard = CSW.game.input.keyboard;
  CSW.playerGroup = CSW.game.add.physicsGroup();
  CSW.obstacleGroup = CSW.game.add.physicsGroup();

  CSW.player = new PlayerController("player",{
    TAP:Phaser.Keyboard.SPACEBAR,
    speed: 650,
    direction: new Phaser.Point(0,600)
  });
  CSW.game.physics.p2.enable([CSW.player.sprite],true);

  CSW.circle = new CircleController({x: 250, y: 200});

  //CSW.stripe = new StripeController({x: 450, y: 200});

  //console.log(CSW.player.sprite.body.debug);
  CSW.player.sprite.body.onBeginContact.add(blockHit, this);
}

// update game state each frame
var update = function(){
  CSW.player.update();
  //CSW.game.physics.arcade.overlap(CSW.playerGroup,CSW.obstacleGroup, onTouch);
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
  if (body)
  {
      result = 'You last hit: ' + body.sprite.key;
  }
  else
  {
      result = 'You last hit: The wall :)';
  }
  alert(result);
}