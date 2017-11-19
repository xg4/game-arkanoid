
let img_read = []
const loadImg = function (images) {
    for (let name in images) {
        let img = new Image()

        img.src = images[name]

        img_read.push(new Promise(function (resolve, reject) {
            img.onload = function () {
                images[name] = img
                resolve()
            }
        }))
    }
    return img_read
}

const collide = function (a, b) {
    if ((a.x + a.w) <= b.x || (b.x + b.w) <= a.x || (a.y + a.h) <= b.y || (b.y + b.h) <= a.y) {
        return false
    }
    return true
}

export { loadImg, collide }