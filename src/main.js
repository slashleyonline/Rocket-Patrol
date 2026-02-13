//Name: Ash Seward
// Title: I love the smell of Rockets in the morning
// 10 hours
//
/* MODS:
1) Scrolling background
2) Add looping background music
3) Randomize each spaceship's direction at the start of each play
4) Allow the player to control the rocket after it's fired
5) Fire UI text
6) new enemy spaceship
7) add time for hits, subtract for misses
8) explosion particles
*/
//Citations:
// Phaser.io(? It's technically not the documentation i dont think. Just in case there it is.)

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config)

//UI sizes
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let keyFIRE, keyRESET, keyLEFT, keyRIGHT


