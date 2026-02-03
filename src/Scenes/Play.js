class Play extends Phaser.Scene {
    constructor() {
        super("playScene")
    }

    create() {
        //background sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0)

        //green UI
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0,0)
        this.fireText = this.add.text(borderUISize * 10, borderPadding * 5, 'FIRE').setFontSize('28px')
        this.fireText.setBackgroundColor('#F38141')
        this.fireText.setColor('#843605')
        this.fireText.visible = false

        //Timer for new score system
        this.timerText = this.add.text(borderUISize * 5, borderPadding * 5, borderUISize * 2).setFontSize('28px')
        this.timerText.setBackgroundColor('#FFF')
        this.timerText.setColor('#777')

        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0,0)

        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding,
            'rocket').setOrigin(0.5,0)
    
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0.5)
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0.5)
        this.ship03 = new Spaceship(this, game.config.width,  borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0.5)

        this.ufo = new Spaceship(this, game.config.width - borderUISize*2, borderUISize*4, 'ufo', 0, 50).setOrigin(0.5)
    
        keyFIRE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyRESET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT)
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)

        this.p1Score = 0

        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }

        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, this.scoreConfig)

        this.gameOver = false

        this.scoreConfig.fixedWidth = 0
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5),
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
                this.scoreConfig).setOrigin(0.5)
            this.gameOver = true
        }, null, this)

        //music
        this.bgMusic = this.sound.add('bg-music')
        this.bgMusic.loop = true
        this.bgMusic.play()
    }

    update() {
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyRESET)) {
            this.scene.restart()
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene")
        }
        //set timer number
        this.timerText.text = Math.floor(this.clock.getRemainingSeconds())

        this.starfield.tilePositionX -= 4
        if (!this.gameOver) {
            this.p1Rocket.update()
            this.ship01.update()
            this.ship02.update()
            this.ship03.update()
            this.ufo.update()
        }

        if (this.p1Rocket.isFiring == true) {
            this.fireText.visible = true
        }
        else {
            this.fireText.visible = false
        }

        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship03)
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship02)
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship01)
        }
        if (this.checkCollision(this.p1Rocket, this.ufo)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ufo)
        }

    }

    checkCollision(rocket, ship) {
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x &&
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship.y) {
            
            return true
            }
        else {
            return false
        }
    }

    shipExplode(ship) {
        ship.alpha = 0

        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0)
        boom.anims.play('explode')
        boom.on('animationcomplete', () => {
            ship.reset()
            ship.alpha =1
            boom.destroy()
        })

        this.p1Score += ship.points
        this.scoreLeft.text = this.p1Score
        this.sound.play('sfx-explosion')
        
        console.log(ship.isUFO)
        if (ship.texture.key == 'ufo') {
            this.addToTimer(5)
        }
        else{
            this.addToTimer(2)
        }

        // Used some  of Explosion Emitter Code from Phaser.io:
        // https://phaser.io/examples/v3.85.0/game-objects/particle-emitter/view/explode-emitter
        const emitter = this.add.particles(ship.x, ship.y, 'rocket', {
            lifespan: 500,
            speed: { min: 500, max: 600 },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            emitting: false
        });
        emitter.explode(16);



    }

    addToTimer(timeAdded) {
        let newTime = (this.clock.getRemainingSeconds() + timeAdded) * 1000
        this.clock.reset({ 
            delay: newTime,
            callback: () => {
                this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5),
                this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu',
                this.scoreConfig).setOrigin(0.5)
                this.gameOver = true
            }
         })
        console.log(newTime)
        Math.floor((game.settings.gameTimer - this.time.now) / 1000)
    }
    
}