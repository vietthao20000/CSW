class SwitchController{
	constructor(color,position) {
    this.sprite = new ObstacleController("switch",color,SwitchController.configs,SwitchController.configs.offsetAngle,position);
	}

	random(current) {
		var usable = [];
		SwitchController.forEach(function(color) {
			if (color!==current) {
				usable.push(color);
			}
		});
		return usable[Math.round(Math.random()*100)%(usable.length-1)];
	}
}

SwitchController.configs= {
  anchor:{x:0.5,y:0.5},
  ratio:0.5,
  offsetAngle: 0
}

SwitchController.colors= ["cyan","pink","purple","yellow"];