import Block from './block'

const levels = [
    [//1
        [20, 30]
    ],
    [//2
        [50, 20, 2],
        [150, 100]
    ],
    [//3
        [50, 20],
        [130, 80, 3],
        [260, 80]
    ],
    [//4
        [50, 20],
        [130, 80, 3],
        [260, 80, 3],
        [120, 100]
    ],
    [//5
        [50, 20],
        [130, 80, 2],
        [260, 80, 2],
        [120, 100, 3],
        [300, 50]
    ]
]

const loadLevel = function (game, n) {
    let level = levels[n - 1]
    let blocks = []
    for (let i = 0; i < level.length; i++) {
        blocks.push(new Block(game, level[i]))
    }
    return blocks
}

export { loadLevel }