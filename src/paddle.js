import { collide } from './util'

class Paddle {
    constructor(game) {
        this.game = game

        this.img = this.game.getImgByName('paddle')
        this.w = this.img.width
        this.h = this.img.height

        this.x = this.game.w / 2 - this.w / 2
        this.y = this.game.h - this.h - 50
        this.speed = 12
    }

    move(x) {
        if (x < 0) {
            x = 0
        }
        if (x > this.game.w - this.w) {
            x = this.game.w - this.w
        }
        this.x = x;
    }

    moveRight() {
        this.move(this.x + this.speed)
    }

    moveLeft() {
        this.move(this.x - this.speed)
    }

    collide(obj) {
        return collide(this, obj)
    }

}
export default Paddle