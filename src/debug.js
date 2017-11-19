


const ballMove = function (ball) {
    let move = false
    window.addEventListener('mousedown', function (ev) {
        if (ev.offsetX > ball.x && ev.offsetX < ball.x + ball.w && ev.offsetY > ball.y && ev.offsetY < ball.y + ball.h) {
            move = true
        }
    })
    window.addEventListener('mousemove', function (ev) {
        if (move) {
            ball.x = ev.offsetX
            ball.y = ev.offsetY
        }

    })
    window.addEventListener('mouseup', function () {
        move = false
    })
}

export { ballMove }