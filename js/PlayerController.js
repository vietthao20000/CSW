class PlayerController{
  constructor(spriteName,configs) {
    this.sprite = CSW.game.add.sprite(CSW.configs.GAME_WIDTH/2,CSW.configs.GAME_HEIGHT/2,spriteName);
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    this.configs = configs;
    this.elapsedTime = 1;
    this.tapCount = 0;
    this.sprite.tint = 0xfe0180;
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