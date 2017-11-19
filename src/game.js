import { setInterval } from "timers";

class Game {
    constructor(id, fps, images, width, height) {
        this.c = document.querySelector(id)
        this.ctx = this.c.getContext('2d')

        this.c.width = width - this.c.clientLeft * 2
        this.c.height = 500
        this.w = this.c.width
        this.h = this.c.height

        this.images = images

        // 用户数据
        this.lives = 3
        this.level = 1
        this.score = 0

        this.start = false

        this.fps = fps
        this.realFps = 0
        this.showFps = 0

        this.debug = true

        this.actions = {}
        this.keydowns = {}

        this.init();
    }
    init() {
        window.addEventListener('keydown', e => {
            this.keydowns[e.key] = true
        })

        window.addEventListener('keyup', e => {
            this.keydowns[e.key] = false
        })

        setInterval(() => {
            this.showFps = this.realFps
            this.realFps = 0
        }, 1000)

    }
    run(scene) {
        this.scene = scene
        //timer
        const runloop = () => {
            console.log('run');
            for (let key in this.actions) {
                if (this.keydowns[key]) {
                    this.actions[key]()
                }
            }
            this.realFps++
            // update
            this.scene.update()

            this.ctx.clearRect(0, 0, this.w, this.h)

            //draw
            this.scene.draw()

            setTimeout(() => {
                runloop()
            }, 1000 / this.fps)
        }
        setTimeout(() => {
            runloop()
        }, 1000 / this.fps)
    }

    replaceScene(scene) {
        this.scene = scene
    }

    drawObj(obj) {
        this.ctx.drawImage(obj.img, obj.x, obj.y)
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    changeFps(fps) {
        this.fps = fps
    }

    getImgByName(name) {
        return this.images[name]
    }

}

export default Game