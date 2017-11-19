import Game from './game'

import SceneMain from './scene/main'
import SceneStart from './scene/start'
import SceneEnd from './scene/end'

import { loadImg } from './util'


const images = {
    paddle: require('./assets/images/paddle.png'),
    ball: require('./assets/images/ball.png'),
    block1: require('./assets/images/block.png'),
    block2: require('./assets/images/block02.png'),
    block3: require('./assets/images/block03.png'),
    bg: require('./assets/images/bg.jpg'),
    heart: require('./assets/images/heart.png')
}

Promise.all(loadImg(images)).then(function () {

    const game = new Game('#xgame', 30, images)

    const sceneStart = new SceneStart(game)
    game.run(sceneStart)

})