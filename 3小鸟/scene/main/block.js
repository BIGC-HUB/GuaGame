var Block = function(game, position) {
    // position 是 [0, 0] 格式
    var p = position
    var o = game.imageByName('block')
        o.x = p[0]
        o.y = p[1]
        o.alive = true
        o.lives =  p[2] || 1
    o.kill = function() {
        o.lives--
        if(o.lives < 1){
          o.alive = false
        }
    }
    o.collide = function(ball) {
      return o.alive && ( rectIntersects(o, ball) || rectIntersects(ball, o) )
    }
    return o
}
