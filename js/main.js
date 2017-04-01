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
    speed: 1,
    direction: new Phaser.Point(0,600)
  },"purple");
  CSW.game.physics.p2.enable([CSW.player.sprite],false);

  //Object trong pool có index càng lớn thì độ khó của nó càng lớn
  CSW.pool = [];

  CSW.switch = new SwitchController("yellow",{x: 320, y: 0});
  CSW.pool.push(new CircleController({x: 320, y: 0}));
  CSW.pool.push(new StripeController({x: 400, y: 400}));
  CSW.pool.push(new StripeController({x: 400, y: 400}));
  CSW.pool.push(new CircleController({x: 320, y: 0}));
  //lever quyết định cách thức lấy object từ pool, lever càng cao xác suất lấy object có index cao càng lớn
  //lever tăng khi ăn switch
  //lever max là CSW.pool.length
  CSW.lever = 3;

  //Để chắc chắn rằng ban đầu chỉ có 2 Object trong pool được dùng
  for (let i = 2; i < CSW.pool.length; i++) {
    CSW.pool[i].parts.forEach(function(part){
      part.kill();
    });
    CSW.pool[i].used = false;
    CSW.pool[i].position.y = -99999;
  }

  CSW.pool.forEach(function(obstacle) {
    obstacle.update();
  });

  CSW.player.sprite.body.onBeginContact.add(blockHit, this);


  CSW.game.physics.p2.enable(CSW.player,CSW.circle, CSW.Stripe);

  CSW.game.camera.follow(CSW.player.sprite);
  CSW.game.camera.deadzone = new Phaser.Rectangle(0, CSW.configs.GAME_HEIGHT/2, CSW.configs.GAME_WIDTH, CSW.configs.GAME_HEIGHT/2);

  console.log("Lever hiện tại: "+ CSW.lever);
}

// update game state each frame
var update = function(){
  CSW.player.update();
  CSW.game.world.setBounds(0, -CSW.player.yChange, CSW.configs.GAME_WIDTH, CSW.configs.GAME_HEIGHT);

  //Object trôi ra khỏi camera thì kill
  //Ngay sau khi kill sẽ khởi tạo lại object mới
  CSW.pool.forEach(function(obs){
    if(obs.position.y > CSW.game.camera.y + CSW.configs.GAME_HEIGHT) {
      obs.parts.forEach( function(part, index) {
        part.kill();
      });
      obs.used = false;
      obs.position.y = -99999;
      reUseOne();
    };
  });
}

//Lấy random 1 object trong pool ra, nếu object đó đang được dùng thì lấy
// object đầu tiên chưa được dùng từ CSW.pool[lever - 1]
var reUseOne = function(){
  var rd = Math.floor((Math.random() * CSW.lever));
  if(CSW.pool[rd].used == false) {
    CSW.pool[rd].parts.forEach(function(part){
      part.reset(part.position.x, -CSW.player.yChange);
      part.body.angularVelocity = 2.5;
    });
    CSW.pool[rd].used = true;
    CSW.pool[rd].position.y = -CSW.player.yChange;
  }
  else {
    for (let i = CSW.lever - 1; i >= 0; i--) {
      if(CSW.pool[i].used == false) {
        CSW.pool[i].parts.forEach(function(part){
          part.reset(part.position.x, -CSW.player.yChange);
          part.body.angularVelocity = 2.5;
        });
        CSW.pool[i].used = true;
        CSW.pool[i].position.y = -CSW.player.yChange;
        break;
      }
    }
  }
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
      if(CSW.lever < CSW.pool.length){
        CSW.lever ++;
        console.log("lever hiện tại: "+CSW.lever);
      }
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
