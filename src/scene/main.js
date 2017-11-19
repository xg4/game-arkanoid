import Scene from './scene'
import SceneEnd from './end'
import ScenePass from './pass'

import Paddle from '../paddle'
import Ball from '../ball'

import { loadLevel } from '../level'
import { ballMove } from '../debug'

class SceneMain extends Scene {
    constructor(game) {
        super(game)
    }

    init() {

        this.paddle = new Paddle(this.game)
        this.ball = new Ball(this.game)

        this.blocks = loadLevel(this.game, this.game.level)

        this.game.actions = {}
        this.game.registerAction('a', () => {
            this.paddle.moveLeft()
        })

        this.game.registerAction('d', () => {
            this.paddle.moveRight()
        })

        this.game.registerAction('f', () => {
            this.ball.fire()
        })

        this.game.registerAction('A', () => {
            this.paddle.moveLeft()
        })

        this.game.registerAction('D', () => {
            this.paddle.moveRight()
        })

        this.game.registerAction('F', () => {
            this.ball.fire()
        })

        // 触屏滑块移动
        this.game.c.ontouchstart = (ev) => {
            let x = ev.touches[0].clientX
            let c = this.paddle.x
            this.game.c.ontouchmove = (ev) => {               
                this.paddle.x = c + ev.touches[0].clientX - x
            }
            this.game.c.ontouchend = function () {                
                this.ontouchmove = null
                this.ontouchend = null
            }
        }


        if (this.game.debug) {
            let game = this.game
            window.addEventListener('keydown', (ev) => {
                let k = ev.key
                if ('qQ'.includes(k)) {
                    game.pause = !game.pause
                } else if ('12345'.includes(k)) {
                    this.game.level = Number(k)
                    this.blocks = loadLevel(game, Number(k))
                }
            })

            document.querySelector('#changeFps')
                .addEventListener('input', function () {
                    let fps = this.value
                    fps = Math.min(fps, 100)
                    fps = Math.max(fps, 1)
                    game.fps = fps
                })

            ballMove(this.ball)
        }

    }

    update() {
        if (!this.blocks.some(block => block.alive)) {
            this.game.level = this.game.level == 5 ? 0 : this.game.level
            this.game.level += 1
            this.game.replaceScene(new ScenePass(this.game))
        }
        if (this.ball.y > this.paddle.y + 50) {
            this.game.lives -= 1
            if (this.game.lives < 1) {
                // 游戏结束
                this.game.lives = 3
                this.game.level = 1
                this.game.score = 0
                this.game.replaceScene(new SceneEnd(this.game))
            } else {
                // 死亡动画
                this.game.replaceScene(new ScenePass(this.game))
            }
        }
        if (this.game.pause) {
            return false
        }

        if (this.paddle.collide(this.ball)) {
            this.ball.reverse()
        }

        this.blocks.map(block => {
            if (block.collide(this.ball)) {
                block.kill()
                this.ball.reverse()
                this.game.score += 100
            }
        })

        this.ball.move()

    }

    draw() {
        this.game.ctx.drawImage(this.game.getImgByName('bg'), 0, 0, this.game.w, this.game.h)
        this.game.drawObj(this.paddle)
        this.game.drawObj(this.ball)
        this.blocks.map(block => {
            if (block.alive) {
                this.game.drawObj(block)
            }
        })

        this.game.ctx.save()
        this.game.ctx.fillStyle = '#fff'
        this.game.ctx.textBaseline = "top"
        this.game.ctx.textAlign = "start"
        this.game.ctx.fillText(`第${this.game.level}关：`, 0, 0)
        this.game.ctx.restore()

        this.game.ctx.save()
        this.game.ctx.fillStyle = '#fff'
        this.game.ctx.textBaseline = "top"
        this.game.ctx.textAlign = "end"
        this.game.ctx.fillText(`FPS : ${this.game.showFps}`, this.game.w, 0)
        this.game.ctx.restore()

        this.game.ctx.save()
        this.game.ctx.font = '15px sans-serif'
        this.game.ctx.fillStyle = '#fff'
        this.game.ctx.textBaseline = "bottom"
        this.game.ctx.textAlign = "start"
        this.game.ctx.fillText(`积分：${this.game.score}`, 0, this.game.h)
        this.game.ctx.restore()

        let h = this.game.getImgByName('heart')
        for (let i = 0; i < this.game.lives; i++) {
            this.game.ctx.drawImage(h, this.game.w - (h.width * (i + 1)), this.game.h - h.height)
        }

    }

}
export default SceneMain