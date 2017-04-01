var menuState={
  preload : function(){
    CSW.scale.pageAlignVertically = true;
    CSW.scale.pageAlignHorizontally = true;
    CSW.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    CSW.time.advancedTiming = true;
    CSW.load.atlasJSONHash('assets', 'Assets/Textures/buttons.png', 'Assets/Textures/buttons.json');
    CSW.load.image('playbutton','Assets/Textures/play.png');
  },

  create : function(){

    CSW.add.sprite(50, 50, 'assets','home.png');
    var style = { font: "70px Arial", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 250, align: "center", backgroundColor: "#000000" };
    text = CSW.add.text(CSW.configs.GAME_WIDTH/2- 80, 10, "COLOR SWITCH", style);

    button = CSW.add.button(CSW.configs.GAME_WIDTH/2- -10, 500, 'playbutton', this.actionOnClick, this, 1, 0, 2);
    button.anchor.setTo(0.5, 0.5);
    CSW.add.sprite(100, CSW.configs.GAME_HEIGHT- 80, 'assets','top.png');
    CSW.add.sprite(CSW.configs.GAME_WIDTH-420, CSW.configs.GAME_HEIGHT- 80, 'assets','scoreboard1.png');
    CSW.add.sprite(CSW.configs.GAME_WIDTH-300, CSW.configs.GAME_HEIGHT- 80, 'assets','star.png');
    CSW.add.sprite(CSW.configs.GAME_WIDTH-185, CSW.configs.GAME_HEIGHT- 80, 'assets','shop.png');



  },

  actionOnClick : function(){
    CSW.state.start('play');

  },
  update : function () {

    button.angle += 1;

  }



  // create: function(){
  //
  //   // CSW.state.start('play');
  //
  // }



}
