class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene")
    }

    preload() {
        //load assets
        this.load.image('rocket', './assets/rocket.png')
        this.load.image('spaceship', './assets/spaceship.png')
        this.load.image('starfield', './assets/starfield.png')

        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth : 64,
            frameHeight: 32,
            startFrame: 0,
            EndFrame: 9,
        })

        this.load.audio('sfx-select', './assets/sfx-select.wav')
        this.load.audio('sfx-explosion', './assets/sfx-explosion.wav')
        this.load.audio('sfx-shot', './assets/sfx-shot.wav')

    }

    create() {
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { start: 0, 
                end: 9, 
                first: 0 }),
            frameRate: 30,
        })

        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F38141',
            color: '#843605',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

        this.add.text(game.config.width/2, game.config.height/2 - borderUISize - borderPadding, 'ROCKET PATROL',
            menuConfig).setOrigin(0.5)
        this.add.text(game.config.width/2, game.config.height/2 , 'USE ARROWS TO MOVE AND (F) TO FIRE!',
            menuConfig).setOrigin(0.5)
            menuConfig.backgroundColor = '#00FF00'
            menuConfig.color = '#000'
            this.add.text(game.config.width/2, game.config.height/2 + borderUISize + borderPadding, 'PRESS (LEFT) FOR NOVICE OR (RIGHT) FOR EXPERT').setOrigin(0.5)

    }
}