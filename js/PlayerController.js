class PlayerController{
  constructor(configs,color) {
    this.sprite = CSW.game.add.sprite(CSW.configs.GAME_WIDTH/2,CSW.configs.GAME_HEIGHT/2,"player");
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.configs = configs;
    this.elapsedTime = 1;
    this.tapCount = 0;
    this.sprite.tint = CSW.configs.COLORS[color];
    this.sprite.color = color;
  }

  update() {
      if (CSW.keyboard.isDown(this.configs.TAP)) {
        if (this.elapsedTime>=0.3) {
          this.elapsedTime = 0;
          if (this.tapCount==0) CSW.game.physics.p2.gravity.y = 1000;
          //this.configs.direction.y = this.sprite.body.velocity.y>=0?-this.configs.direction.y:this.configs.direction.y
          //this.sprite.body.velocity = this.configs.direction.setMagnitude(this.configs.speed);
          this.sprite.body.moveUp(this.configs.direction.y);
          this.tapCount++;
        }
      }
    this.elapsedTime += CSW.game.time.physicsElapsed;
  } 
}