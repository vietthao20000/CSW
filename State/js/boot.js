var bootState= {
  preload: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    console.log("boot.js");

    game.state.start('load');
  }
}
