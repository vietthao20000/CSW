class ObstacleController{
	constructor(spriteName,configs,angle) {
		this.sprite = CSW.obstacleGroup.create(CSW.configs.GAME_WIDTH/2,CSW.configs.GAME_HEIGHT/2,spriteName);
		this.configs = configs;
		this.sprite.anchor = new Phaser.Point(this.configs.anchor.x,this.configs.anchor.y);
		this.sprite.body.angularVelocity = 100;
		this.sprite.width = this.sprite.width*this.configs.ratio;
		this.sprite.height = this.sprite.height*this.configs.ratio;
		this.sprite.angle = angle;
	}
}