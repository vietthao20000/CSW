var game= new Phaser.Game(640,960,Phaser.AUTO,'gameDiv');

game.state.add('boot',bootState);
game.state.add('load',loadState);

console.log("game.js");

game.state.start('boot');
