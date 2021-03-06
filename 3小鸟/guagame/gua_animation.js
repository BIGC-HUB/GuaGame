class GuaAnimation {
    constructor(game) {

        this.debug()

        this.game = game
        // 为了省事,在这里 hard code 一套动画
        this.frames = []
        for (var i = 0; i < 2; i++) {
            var name = `bird${i}`
            var t = game.textureByName(name)
            this.frames.push(t)
        }
        this.texture = this.frames[0]
        this.w = this.texture.width
        this.h = this.texture.height
        this.frameIndex = 0
        this.frameCount = 3

        // 水平翻转
        this.flipX = false
        this.rotation = 0
        this.alpha = 1
        // 重力加速度
        this.gy = this.birdDown || 5
        this.vy = 0

    }

    debug() {
        this.birdUp = config.bird_up.value
        this.birdDown = config.bird_down.value
    }

    static new(game) {
        return new this(game)
    }
    jump() {
        this.vy = -this.birdUp || -5
        this.rotation = -45
    }
    update() {
        //更新　alpha
        if (this.alpha > 0) {
            this.alpha -= 0.05
        }
        //更新受力
        this.y += this.vy
        this.vy += this.gy * 0.2
        var h = 427
        if (this.y > h) {
            this.y = h
        }
        //更新角度
        if (this.rotation < 45) {
            this.rotation += 5
        }
        //
        this.frameCount--
        if (this.frameCount == 0) {
            this.frameCount = 3
            this.frameIndex = (this.frameIndex + 1) % this.frames.length
            this.texture = this.frames[this.frameIndex]
        }
    }
    draw() {
        var context = this.game.context
        context.save()
        var w2 = this.w / 2
        var h2 = this.h / 2
        context.translate(this.x + w2 ,this.y + h2)
        if (this.flipX) {
            context.scale(-1, 1)
        }
        context.globalAlpha = this.alpha
        context.rotate(this.rotation * Math.PI / 180)
        context.translate(-w2,-h2)
        context.drawImage(this.texture, 0, 0)
        context.restore()

    }
    move(x) {
        this.flipX = (x < 0)
        this.x += x
    }
}
