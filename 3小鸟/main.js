var loadLevel = function(game, n) {
    n = n - 1
    var level = levels[n]
    // 现在循环加入三个砖块
    var blocks = []
    for(var i = 0; i < level.length; i++){
        var p = level[i]
        var block = Block(game, p)
        blocks.push(block)
    }
    return blocks
}
    var blocks = []
var enableDebugMode = function(game, enable) {
  if(!enable){
    return
  }
  window.paused = false
  window.addEventListener('keydown', function(event) {
    var k = event.key
    if(k == 'p'){
      // 暂停功能
        paused = !paused
    }else if ('123456789'.includes(k)) {
      // 暂时为了 debug 临时加入关卡功能
        log('k',k)
      // blocks = loadLevel(game, Number(k))
    }
  })
  // 控制速度
  document.querySelector('#id-input-speed').addEventListener('input', function(event) {
    var value = event.target.value
    window.fps = Number(value)
  })
}

var  __main = function() {
    var images = {
        bullet: 'img/ball.png',
        ball: 'img/ball.png',
        sky: 'img/sky.png',
        player: 'img/player.png',
        enemy: 'img/boss.png',
        fire: 'img/ball.png',
        love:'img/block.png',

        // 多动态
        // normal
        w1: 'img/work/normal/normal1.png',
        w2: 'img/work/normal/normal2.png',
        w3: 'img/work/normal/normal3.png',
        w4: 'img/work/normal/normal4.png',
        w5: 'img/work/normal/normal5.png',
        w6: 'img/work/normal/normal6.png',
        w7: 'img/work/normal/normal7.png',

        // run
        r1: 'img/work/run/run1.png',
        r2: 'img/work/run/run2.png',
        r3: 'img/work/run/run3.png',
        r4: 'img/work/run/run4.png',
        r5: 'img/work/run/run5.png',
        r6: 'img/work/run/run6.png',
        r7: 'img/work/run/run7.png',
        r8: 'img/work/run/run8.png',
        r9: 'img/work/run/run9.png',
        r10: 'img/work/run/run10.png',
        r11: 'img/work/run/run11.png',

        // 背景
        cover: 'img/work/normal/back.png',



        // flappy bird
        bg:'img/flappy/bg.png',
        bird1:'img/flappy/bird1.png',
        bird2:'img/flappy/bird2.png',
        bird3:'img/flappy/bird3.png',
        ground:'img/flappy/ground.png',
        tube1:'img/flappy/tube1.png',
        tube2:'img/flappy/tube2.png',
        start:'img/flappy/start.png',
        pause:'img/flappy/pause.png',
        modalbg: 'img/flappy/modalbg.png',
        title:'img/flappy/title.png',
        // 0-9
        start0:'img/flappy/number0.png',
        start1:'img/flappy/number1.png',
        start2:'img/flappy/number2.png',
        start3:'img/flappy/number3.png',
        start4:'img/flappy/number4.png',
        start5:'img/flappy/number5.png',
        start6:'img/flappy/number6.png',
        start7:'img/flappy/number7.png',
        start8:'img/flappy/number8.png',
        start9:'img/flappy/number9.png',
    }
    var game = Game.instance(60, images, function(g) {
        // var s = SceneTitle.new(g)
        var s = SceneStart.new(g)
        g.runWithScene(s)
        // var ball = Ball(game)
        // var paddle = Paddle(game)
        // var paused = false
        // var score = 0
        // game.registerAction('a', function() {
        //     paddle.moveLeft()
        // })
        //
        // game.registerAction('d', function() {
        //     paddle.moveRight()
        // })
        // game.registerAction('f', function() {
        //     ball.fire()
        // })
        // game.update = function() {
        //     if(window.paused){
        //         return
        //     }
        //     ball.move()
        //     if (paddle.collide(ball)) {
        //         // 这里应该调用一个 ball.反弹() 来实现
        //         ball.rebound()
        //     }
        //     // 这里需要判断 block 和 ball 是否相交
        //     for(var i = 0; i < blocks.length; i++){
        //         var block = blocks[i]
        //         if(block.collide(ball)) {
        //             block.kill()
        //             ball.rebound()
        //             score += 100
        //         }
        //     }
        // }
        //
        // var enableDrage = false
        // game.canvas.addEventListener('mousedown', function(event) {
        //     // 在点击的时候判断是不是点击到那个物体,即判断 x y 是不是在点击的矩形里面
        //     var x = event.offsetX
        //     var y = event.offsetY
        //     log(ball)
        //     if(ball.hasPoint(x, y)){
        //         // 点击的是我们的目标物体
        //         enableDrage = true
        //     }
        // })
        // game.canvas.addEventListener('mousemove', function(event) {
        //     var x = event.offsetX
        //     var y = event.offsetY
        //     if(enableDrage){
        //         ball.x = x
        //         ball.y = y
        //     }
        // })
        // game.canvas.addEventListener('mouseup', function(event) {
        //     enableDrage = false
        // })df
        // game.draw = function() {
        //     // draw 背景
        //     game.context.fillStyle = "#554"
        //     game.context.fillRect(0, 0, 500, 300)
        //
        //     game.drawImage(paddle)
        //     game.drawImage(ball)
        //     for(var i = 0; i < blocks.length; i++){
        //         var block = blocks[i]
        //         if(block.alive) {
        //             game.drawImage(block)
        //         }
        //     }
        //     game.context.fillText('分数：' + score, 10, 290);
        // }

    })

    enableDebugMode(game, true)

}

__main()
