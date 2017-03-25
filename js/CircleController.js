class CircleController{
  constructor(position) {
    CircleController.colors.forEach(function(color) {
      new ObstacleController(color,CircleController.configs,CircleController.configs.offsetAngle,position);
    });
  }
}

CircleController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 0
}

CircleController.colors= ["circle_cyan","circle_pink","circle_purple","circle_yellow"];