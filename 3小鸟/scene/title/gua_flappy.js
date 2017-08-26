class Flappy extends GuaAnimation {
    constructor(game) {
        super(game)
        this.game = game
        // 重力和加速度
        this.gy = 10
        this.vy = 0
        this.x = this.game.context.canvas.clientWidth / 2
        this.y = this.game.context.canvas.clientHeight / 2 - 80
        this.score = 0
        this.rotation = 0
        this.flippySpeed = 2
        this.life = 100
        this.setup()
        this.setupInputs()
    }
    setup() {
        this.addAnimationType('bird')
        for (var i = 1; i < 4; i++) {
            var name = `bird${i}`
            var t = this.game.textureByName(name)
            this.changeAnimationItem('bird', t)
        }
        this.changeAnimationName('bird')
        this.setTexture()
    }
    draw() {
        if(this.life < 0) {
            return
        }
        super.draw()
    }
    aInb(x, x1, x2) {
        return x >= x1 && x <= x2
    }

    collide(o, ball) {
        // log('ball',ball)
        // if (ball.y + ball.image.height > o.y) {
        //     if (ball.x > o.x && ball.x < o.x + o.image.width) {
        //         return true
        //     }
        // }
        // return false
        var a = o
        var b = ball
        var aInb = this.aInb
        if(aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if(aInb(a.y, b.y, b.y + b.h - 10) || aInb(b.y, a.y, a.y + a.h - 10)) {
                return true
            }
        }
        return false
    }
    checkCollide() {
        // 检测碰撞(1.检测和管子的碰撞 2.检测碰撞地面)
        var grounds = this.game.scene.ground.grounds
        var pipes = this.game.scene.pipe.pipes
        grounds && grounds.forEach((item) => {
            if(this.collide(this, item)) {
                this.life = -1
            }
        })
        pipes && pipes.forEach((item) => {
            if(this.collide(this, item)) {
                this.life = -1
            }
        })
    }
    addScore() {
        var pipes = this.game.scene.pipe.pipes
        for (var p of pipes) {
            if(p.x + p.w == this.x){
                this.score += 1
            }
        }
    }
    update() {
        this.checkCollide()
        this.addScore()
        super.update()
        // 更新受力
        this.y += this.vy
        this.vy += this.gy * 0.07
        var h = 312
        if(this.y > h) {
            this.y = h
        }
        // 更新角度
        if(this.rotation < 45) {
            this.rotation += 5
        }

    }

    debuger() {
        this.flippySpeed = config.flippySpeed.value
        // this.flippyX = config.flippyX.value
        // this.flippyY = config.flippyY.value
    }
    setupInputs() {
        var self = this
        self.game.registerAction('a', function(keyStatus) {
            self.move(-self.flippySpeed, keyStatus)
        })
        self.game.registerAction('d', function(keyStatus) {
            self.move(self.flippySpeed, keyStatus)
        })
        self.game.registerAction('j', function(keyStatus) {
            self.jump()
        })
    }
    jump() {
        if(this.life > 0) {
            this.vy = -10 * 0.5
            this.rotation = -45
        }
    }
    move(x, keyStatus) {
        if(this.life > 0) {
            this.flipX = x < 0
            this.x += x
        }
    }
}
