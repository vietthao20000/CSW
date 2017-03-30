class ObstacleController{
	constructor(spriteName,color,configs,angle,position) {
		this.sprite = CSW.game.add.sprite(position.x,position.y,spriteName);
		this.configs = configs;
		//this.sprite.scale.setTo(this.configs.ratio,this.configs.ratio);
		CSW.game.physics.p2.enable([this.sprite],false);
		this.sprite.body.angle = angle;
		this.sprite.color = color;
		this.sprite.anchor = new Phaser.Point(this.configs.anchor.x,this.configs.anchor.y);
		this.sprite.body.angularVelocity = 3;
		this.sprite.body.angularDamping = 0;
		this.sprite.body.data.gravityScale = 0;
		this.sprite.body.kinematic = true;
	}
}