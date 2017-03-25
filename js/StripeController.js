class StripeController{
  constructor(position) {
    StripeController.colors.forEach(function(color) {
      new ObstacleController(color.color,StripeController.configs,color.offsetAngle,position);
    });
  }
}

StripeController.configs= {
  anchor:{x:0,y:0.5},
  ratio:0.9
}

StripeController.colors= [
  {color: "stripe_cyan", offsetAngle: 0},
  {color: "stripe_pink", offsetAngle: 90},
  {color: "stripe_purple", offsetAngle: 180},
  {color: "stripe_yellow", offsetAngle: 270}
];