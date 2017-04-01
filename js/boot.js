var bootState= {
  preload: function(){
    CSW.physics.startSystem(Phaser.Physics.ARCADE);

    console.log("boot.js");
    CSW.state.start('load');
  }
}
