class StripeController{
  constructor(configs) {
    new ObstacleController("stripe_cyan",configs,0);
    new ObstacleController("stripe_pink",configs,90);
    new ObstacleController("stripe_purple",configs,180);
    new ObstacleController("stripe_yellow",configs,270);
  }
}