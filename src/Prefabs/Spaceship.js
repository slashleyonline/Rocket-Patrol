class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveDir = Math.random()

        this.setOrigin(0.5)

        if (this.texture.key == 'ufo') {
            console.log('UFO spawned!')
            this.isUfo = true
            this.pointValue = 100
        }
        else {
            this.isUfo = false
        }

        if (this.moveDir < 0.5) {
            this.moveDir = -1
            this.x = game.config.width
            this.spawnPoint = 0
            if (!this.isUfo) {
                this.rotation = Math.PI
            }
        }
        else {
            this.moveDir = 1
            this.spawnPoint = game.config.width
        }

        if (!this.isUfo) {
            this.moveSpeed = game.settings.spaceshipSpeed * this.moveDir 
        }
        else {
            this.moveSpeed = 4 * this.moveDir
        }

    }

    update() {
        this.x -= this.moveSpeed


        if (this.x <= 0 - this.width && this.moveDir == 1) {
            this.x = game.config.width
            console.log('resetting position!')
        }
        else if (this.x >= game.config.width && this.moveDir == -1) {
            this.x = 0
        }
    }

    reset() {
        this.x = this.spawnPoint
    }
}