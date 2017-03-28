class CircleController{
  constructor(position) {
    var circleParts = [];
    CircleController.colors.forEach(function(color) {
      let sprite = new ObstacleController(color,CircleController.configs,CircleController.configs.offsetAngle,position);
      circleParts.push(sprite.sprite);
    });

    circleParts.forEach(function(part) {
      part.body.clearShapes();
      part.body.loadPolygon('circle_physics', part.spriteName);
    });
  }
}

CircleController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 0
}

CircleController.colors= ["circle_cyan","circle_pink","circle_purple","circle_yellow"];