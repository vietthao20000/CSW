var CSW = new Phaser.Game(640,960,Phaser.CANVAS,'');

CSW.state.add('boot',bootState);
CSW.state.add('load',loadState);
CSW.state.add('menu',menuState);
CSW.state.add('play',playState);
//game.state.add('win',winState);

CSW.configs = {
  GAME_WIDTH:640,
  GAME_HEIGHT:  960,
  COLORS: {
    pink: "0xfe0180",
    cyan: "0x36e1f3",
    purple: "0x8d13fe",
    yellow: "0xf5df10",
  }
};


console.log("game.js");

CSW.state.start('boot');
