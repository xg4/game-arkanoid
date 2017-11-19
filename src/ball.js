class Ball {
    constructor(game) {
        this.game = game

        this.x = this.game.w / 2
        this.y = this.game.h / 2
        this.speedX = 4
        this.speedY = -4

        this.img = this.game.getImgByName('ball')
        this.w = this.img.width
        this.h = this.img.height

        this.fired = false
    }

    fire() {
        this.fired = true
    }

    move() {
        if (this.fired) {
            if (this.x < 0 || this.x + this.w > this.game.w) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y + this.h > this.game.h) {
                this.speedY *= -1;
            }

            this.x += this.speedX;
            this.y += this.speedY;
        }
    }

    reverse() {
        this.speedY *= -1;
    }

}

export default Ball