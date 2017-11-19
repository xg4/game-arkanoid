import { collide } from './util'

class Block {
    constructor(game, position) {
        this.game = game
        // img [1,2,3]  position [0,0,]
        let p = position
        this.x = p[0]
        this.y = p[1]

        this.lives = p[2] || 1
        this.alive = true

        this.img = this.game.getImgByName(`block${this.lives}`)
        this.w = this.img.width
        this.h = this.img.height
    }

    kill() {
        this.lives -= 1
        this.img = this.game.getImgByName(`block${this.lives}`)
        if (this.lives < 1) {
            this.alive = false
        }
    }

    collide(obj) {
        if (this.alive) {
            return collide(this, obj)
        }
        return false
    }

}

export default Block