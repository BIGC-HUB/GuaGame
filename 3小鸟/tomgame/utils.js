
var e = sel => document.querySelector(sel)
var log = console.log.bind(console)


var textureByName = function(path) {
    var img = new Image()
    img.src = path
    return img
}
const randomBetween = function(start, end) {
    var n = Math.random(start, end) * (end - start + 1)
    return Math.floor(n + start)
}
var rectIntersects = function(a, b) {
    var ball = a
    var o = b
    if (ball.x > o.x && ball.x < o.x + o.image.width) {
        if (ball.y > o.y && ball.y < o.y + o.image.height) {
            return true
        }
    }
    return false
}
