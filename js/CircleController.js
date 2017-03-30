class CircleController{
  constructor(position) {
    var circleParts = [];
    CircleController.colors.forEach(function(color) {
      let sprite = new ObstacleController("circle_"+color,color,CircleController.configs,CircleController.configs.offsetAngle,position);
      circleParts.push(sprite.sprite);
    });

    this.circleParts = circleParts;
  }

  update() {
    this.circleParts.forEach(function(part) {
      part.body.clearShapes();
      if (part.color!=CSW.player.sprite.color) part.body.loadPolygon('circle_physics', part.color);
    });
  }
}

CircleController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 0
}

CircleController.colors= ["cyan","pink","purple","yellow"];