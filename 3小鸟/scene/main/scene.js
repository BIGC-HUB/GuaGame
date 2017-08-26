class Scene extends GuaScene {
    constructor(game) {
        super(game)

        //bg
        var background = GuaImage.new(game,'bg')
        this.addElement(background)
        this.addPipes()
        this.addGround()
        this.addBird()
        this.addScore()
        this.addOver()
        // 分数
        // var s = String(config.score)
        // for (var i = 0; i < s.length; i++) {
        //     let score = GuaImage.new(game,`score${s[i]}`)
        //     score.x = 130 + (i * 20)
        //     score.y = 130
        //     this.addElement(score)
        // }
        this.setupInputs()



    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    addOver() {
        var game = this.game
        this.over = GuaImage.new(game,'gameOver')
        this.over.x = 50
        this.over.y = 200

        // this.restart = GuaImage.new(game, 'restart')
        // this.restart.x = 40
        // this.restart.y = 200
    }

    addScore() {
        var game = this.game
        this.scores = Scores.new(game)
        // // this.bg.w = 400
        // // this.bg.h = 600
        this.addElement(this.scores)
    }

    addPipes() {
        var game = this.game
        //加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
    }

    addGround() {
        var game = this.game
        // this.ground = GuaImage.new(game, 'ground')
        // this.ground.x = 0
        // this.ground.y = 500
        // this.ground.w = 700
        // this.ground.h = 100
        // this.addElement(this.ground)
        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GuaImage.new(game,'ground')
            g.x = i * 19
            g.y = 460
            this.addElement(g)
            this.grounds.push(g)
        }
    }

    addBird() {
        //bird
        var game = this.game
        var b = GuaAnimation.new(game)
        b.x = 100
        b.y = 200
        this.b = b
        this.addElement(b)
    }

    update() {
        super.update()
        //地面移动
        this.skipCount--
        var offset = -5
        if (this.skipCount == 0) {
            this.skipCount = 4
            offset = 15
        }
        for (var i = 0; i < 20; i++) {
            var g = this.grounds[i]
            g.x += offset
        }
        var ps = this.pipe.pipes
        for (var i = 0; i < ps.length; i++) {
            var o = this.b
            var a = ps[i]
            if (aInb(a.x, o.x, o.x + o.w) || aInb(o.x, a.x, a.x + a.w)) {
                if (aInb(a.y, o.y, o.y + o.h) || aInb(o.y, a.y, a.y + a.h)) {
                    this.b.y = 427
                }
            }
        }
        //更新分数
        var birdX = this.b.x
        for (var i = 0; i < this.pipe.columsOfPipe; i++) {
            var index = i * 2
            var p1 = this.pipe.pipes[index]
            var p2 = this.pipe.pipes[index+1]

            if (birdX > p1.x && birdX < p1.x + p1.w) {
                this.currentPipeX = true
                this.currentPipe = p1
            }
        }

        if (this.currentPipeX && birdX >= this.currentPipe.x + this.currentPipe.w) {
            this.currentPipeX = false
            this.scores.scores += 1
            log('scores', this.scores.scores)
        }

    //判断死亡
        if (this.b.y === 427) {
            this.addElement(this.over)
            // this.addElement(this.restart)
            window.paused = true
            // log('结束!')
        }
    }
    setupInputs() {
        //这里的回调不能用 this
        var that = this
        //bird
        var b = this.bird
        that.game.registerAction('a',function() {
            that.b.move(-that.birdSpeed)
        })
        that.game.registerAction('d',function() {
            that.b.move(that.birdSpeed)
        })
        that.game.registerAction('j',function() {
            that.b.jump()
        })
        //
        var game = this.game
        window.paused = false
        this.skipCount = 10
        // this.end = false

        var firstPipe = this.pipe.pipes[0]
        this.currentPipeX = firstPipe.x + firstPipe.ws
        //restart

    }
}
