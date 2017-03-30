class ObstacleController{
	constructor(spriteName,configs,angle,position) {
		this.sprite = CSW.game.add.sprite(position.x,position.y,spriteName);
		this.configs = configs;
		this.sprite.anchor = new Phaser.Point(this.configs.anchor.x,this.configs.anchor.y);
		this.sprite.scale.setTo(this.configs.ratio,this.configs.ratio);
		this.sprite.angle = angle;
		this.spriteName = spriteName;
		CSW.game.physics.p2.enable([this.sprite],true);
		this.sprite.body.angularVelocity = 3;
		this.sprite.body.angularDamping = 0;
		this.sprite.body.data.gravityScale = 0;
	}
}