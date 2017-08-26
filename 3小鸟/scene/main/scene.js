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
        this.setupInputs()
    }
    debug() {
        this.birdSpeed = config.bird_speed.value
    }

    addOver() {
        var game = this.game
        this.over = GuaImage.new(game,'gameOver')
        this.over.x = 250 - this.over / 2
        this.over.y = 200
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
    // 地面移动
    aroundMove() {
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
        // 水管碰撞
        var ps = this.pipe.pipes
        for (var i = 0; i < ps.length; i++) {
            var o = this.b
            var a = ps[i]
            if (aInb(a.x, o.x, o.x + o.w) || aInb(o.x, a.x, a.x + a.w)) {
                if (aInb(a.y, o.y, o.y + o.h) || aInb(o.y, a.y, a.y + a.h)) {
                    this.end = true
                }
            }
        }
    }

    //更新分数
    updateScores() {
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
            log('分数', this.scores.scores)
        }
    }

    update() {
        super.update()

        if (!this.end) {
            this.aroundMove()
            this.updateScores()
        }



    //判断死亡
        if (this.b.y === 427 || this.end) {
            this.addElement(this.over)
            window.paused = true
            this.end = true
        }
    }
    setupInputs() {
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

        var game = this.game
        window.paused = false
        this.skipCount = 10
        this.end = false

        var firstPipe = this.pipe.pipes[0]
        this.currentPipeX = firstPipe.x + firstPipe.ws
    }
}
