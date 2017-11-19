import Scene from './scene'
import SceneMain from './main'

class ScenePass extends Scene {
    constructor(game) {
        super(game)

        this.transition()
    }

    init() {
        this.game.c.ontouchstart = null
        this.game.c.ontouchmove = null
        this.game.c.ontouchend = null
    }

    transition() {
        setTimeout(() => {
            this.game.replaceScene(new SceneMain(this.game))
        }, 2000)
    }

    draw() {
        this.game.ctx.save()
        this.game.ctx.font = '15px sans-serif'
        this.game.ctx.fillStyle = '#000'
        this.game.ctx.textAlign = "center"
        this.game.ctx.textBaseline = "middle"
        this.game.ctx.fillText('作者：XR', this.game.w / 2, this.game.h / 2 - 75)
        this.game.ctx.fillText('特别鸣谢： ZXC LWJ  ', this.game.w / 2, this.game.h / 2 - 45)
        this.game.ctx.fillText(`第${this.game.level}关`, this.game.w / 2, this.game.h / 2)
        let h = this.game.getImgByName('heart')
        for (let i = 0; i < this.game.lives; i++) {
            this.game.ctx.drawImage(h, this.game.w / 2 + (h.width * (i + 1)) - 40, this.game.h / 2 + 25)
        }
        this.game.ctx.restore()
    }
}

export default ScenePass