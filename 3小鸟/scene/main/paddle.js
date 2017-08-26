var Paddle = function(game) {
    var o = game.imageByName('paddle')
        o.x = 100
        o.y = 250
        o.speed = 10
    o.moveLeft = function() {
        if(o.x < 0){
          o.x = 0
        }
        o.x -= o.speed
    }
    o.moveRight = function() {
        if(o.x > 500-o.image.width){
          o.x = 500-o.image.width
        }
        o.x += o.speed
    }
    var aInb = function(x, x1, x2) {
        return x >= x1 && x <= x2
    }
    o.collide = function(ball) {
        // log('ball',ball)
        // if (ball.y + ball.image.height > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.image.width) {
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }
    return o
}
