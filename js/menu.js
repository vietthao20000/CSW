var menuState={

  preload: function(){
    CSW.scale.pageAlignVertically = true;
    CSW.scale.pageAlignHorizontally = true;
    CSW.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    CSW.time.advancedTiming = true;

    CSW.load.atlasJSONHash('assets','Assets/Textures/buttons.png','Assets/Textures/buttons.json');
  },

  create: function(){

    CSW.add.sprite(0,0,'assets','gift.png');

    //CSW.state.start('play');

  }



}
