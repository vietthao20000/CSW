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

  //CSW.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  // CSW.game.load.image('background', 'Assets/Map1.png');
  CSW.game.load.image('player','Assets/Textures/Player/Player.png');
  CSW.game.load.image('circle_cyan','Assets/Textures/Obstacles/Circle/Circle_cyan.png');
  CSW.game.load.image('circle_pink','Assets/Textures/Obstacles/Circle/Circle_pink.png');
  CSW.game.load.image('circle_purple','Assets/Textures/Obstacles/Circle/Circle_purple.png');
  CSW.game.load.image('circle_yellow','Assets/Textures/Obstacles/Circle/Circle_yellow.png');
  CSW.game.load.image('stripe_cyan','Assets/Textures/Obstacles/Stripes/cyan.png');
  CSW.game.load.image('stripe_pink','Assets/Textures/Obstacles/Stripes/pink.png');
  CSW.game.load.image('stripe_purple','Assets/Textures/Obstacles/Stripes/purple.png');
  CSW.game.load.image('stripe_yellow','Assets/Textures/Obstacles/Stripes/yellow.png');
}

// initialize the game
var create = function(){
  CSW.game.world.setBounds(0, 0, 640, 950);
  CSW.game.physics.startSystem(Phaser.Physics.P2JS);
  CSW.keyboard = CSW.game.input.keyboard;
  CSW.playerGroup = CSW.game.add.physicsGroup();
  CSW.obstacleGroup = CSW.game.add.physicsGroup();
  // CSW.obstaclePool = CSW.game.add.group();
  // CSW.obstaclePool.createMultiple(10);
  CSW.obstacleGroup.getFirstDead();



  CSW.player = new PlayerController("player",{
    TAP:Phaser.Keyboard.SPACEBAR,
    speed: 650,
    direction: new Phaser.Point(0,400)
  });

  CSW.circle = new CircleController({x: 150, y: 200});
  CSW.Stripe = new StripeController({x: 450, y: 200});
  CSW.game.physics.p2.enable(CSW.player,CSW.circle, CSW.Stripe);

  CSW.game.camera.follow(CSW.player.sprite);
  CSW.game.camera.deadzone = new Phaser.Rectangle(0, 480, 640, 480);
}

// update game state each frame
var update = function(){
  CSW.player.update();
  CSW.game.world.setBounds(0, -CSW.player.yChange, 640, 960);
  CSW.obstacleGroup.forEach(function(obs){
    if(obs.position.y > CSW.game.camera.y + CSW.configs.GAME_HEIGHT) {
      obs.kill();
      console.log(kill);
    };
  });
  // console.log(CSW.game.camera.y);
  var obs = CSW.obstacleGroup.getFirstDead();
  console.log(obs);
}

// before camera render (mostly for debug)
var render = function(){}

var onTouch = function(player,obstacle) {
  console.log("touched");
}
