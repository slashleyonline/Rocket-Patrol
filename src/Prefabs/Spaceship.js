class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame)
        scene.add.existing(this)
        this.points = pointValue
        this.moveDir = Math.random()

        this.setOrigin(0.5)

        if (this.moveDir < 0.5) {
            this.moveDir = -1
            this.x = game.config.width
            this.spawnPoint = 0
            this.rotation = Math.PI
        }
        else {
            this.moveDir = 1
            this.spawnPoint = game.config.width
        }

        this.moveSpeed = game.settings.spaceshipSpeed * this.moveDir
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