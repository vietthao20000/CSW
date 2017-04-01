var gameOver={

  preload : function(){
    CSW.scale.pageAlignVertically = true;
    CSW.scale.pageAlignHorizontally= true;
    CSW.scale.scaleMode= Phaser.ScaleManager.SHOW_ALL;
    CSW.time.advancedTiming= true;

    CSW.load.spritesheet('button_replay','Assets/Textures/replay.png' , 0,0);
    CSW.load.spritesheet('button_home','Assets/Textures/home.png' , 0,0);

    CSW.load.image('title','Assets/Textures/maxresdefault.png');


    CSW.load.atlasJSONHash('assets', 'Assets/Textures/buttons.png', 'Assets/Textures/buttons.json');
  },

  create : function(){

    CSW.add.sprite(100,100,'title');

    var style = { font: "42px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 250, align: "center", backgroundColor: "#000000" };
    text = CSW.add.text(CSW.configs.GAME_WIDTH/2- 80, 320, "SCORE", style);


    var style = { font: "42px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: 500, align: "center", backgroundColor: "#000000" };
    text = CSW.add.text(CSW.configs.GAME_WIDTH/2- 130, 450, "BEST SCORE", style);


    //CSW.add.sprite(50, 50, 'assets','home.png');
    button_home = CSW.add.button(20, 20, 'button_home',this.actionOnClick_home, 1, 0, 2);
    button_replay = CSW.add.button(CSW.configs.GAME_WIDTH/2- 80, 580, 'button_replay', this.actionOnClick_replay, this, 1, 0, 2);

    // CSW.add.sprite(100, CSW.configs.GAME_HEIGHT- 80, 'assets','top.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-420, CSW.configs.GAME_HEIGHT- 80, 'assets','scoreboard1.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-300, CSW.configs.GAME_HEIGHT- 80, 'assets','star.png');
    // CSW.add.sprite(CSW.configs.GAME_WIDTH-185, CSW.configs.GAME_HEIGHT- 80, 'assets','shop.png');



  },

  actionOnClick_replay : function(){
    CSW.state.start('play');

  },

  actionOnClick_home : function(){
    CSW.state.start('menu');

  }


};
