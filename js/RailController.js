// class RailController{
// 	constructor(position) {
//     var parts = [];

//     RailController.colors.forEach(function(color) {
//       let sprite = new ObstacleController("circle_"+color,color,RailController.configs,RailController.configs.offsetAngle,position);
//       parts.push(sprite.sprite);
//     });
// 	}
// }

// RailController.colors= [
//   {color:"cyan",position: 0},
//   {color:"pink",position: {y:position.y,x:RailController.configs.width}},
//   {color:"purple",position: {y:position.y,x:2*RailController.configs.width}},
//   {color:"yellow",position: {y:position.y,x:3*RailController.configs.width}}
// ];

// RailController.configs= {
//   anchor:{x:0.5,y:0.5},
//   ratio:1,
//   offsetAngle: 0,
//   width:144,
//   height:32
// }
// class RailController{
//   constructor(position) {
//     var parts = [];

//     RailController.colors.forEach(function(color) {
//       let sprite = new ObstacleController("circle_"+color,color,RailController.configs,RailController.configs.offsetAngle,position);
//       parts.push(sprite.sprite);
//     });

//     this.parts = parts;
//     this.position = position;
//   }

//   update() {
//     this.parts.forEach(function(part) {
//       part.body.clearShapes();
//       if (part.color!=CSW.player.sprite.color) part.body.loadPolygon('circle_physics', part.color);
//     });
//   }
// }

// RailController.configs= {
//   anchor:{x:0.5,y:0.5},
//   ratio:0.5,
//   offsetAngle: 0
// }

// RailController.colors= ["cyan","pink","purple","yellow"];