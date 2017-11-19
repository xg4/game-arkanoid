import Scene from './scene'
import SceneStart from './start'
class SceneEnd extends Scene {
    constructor(game) {
        super(game)
    }
    init() {
        this.game.actions = {}
        this.game.registerAction('r', () => {
            this.game.replaceScene(new SceneStart(this.game))
        })
        this.game.registerAction('R', () => {
            this.game.replaceScene(new SceneStart(this.game))
        })
    }
    draw() {
        this.game.ctx.save()
        this.game.ctx.font = '15px sans-serif'
        this.game.ctx.fillStyle = '#000'
        this.game.ctx.textAlign = "center"
        this.game.ctx.textBaseline = "middle"
        this.game.ctx.fillText('游戏结束！按 r 重新开始游戏！', this.game.w / 2, this.game.h / 2);
        this.game.ctx.restore()
    }
}

export default SceneEnd