class CircleController{
  constructor(configs) {
    new ObstacleController("circle_cyan",configs,0);
    new ObstacleController("circle_pink",configs,0);
    new ObstacleController("circle_purple",configs,0);
    new ObstacleController("circle_yellow",configs,0);
  }
}