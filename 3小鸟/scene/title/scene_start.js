/**
 * Created by tom on 2017/8/16.
 */
// class StartImage extends GuaImage {
//     constructor(game, name) {
//         super(game, name)
//     }
//
// }
class StartFlappy extends GuaAnimation{
    constructor(game) {
        super(game)
        this.setup()
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
}

class Numbers {
    constructor(game){
        this.game = game
        this.array = []
        this.animations = {
            run: [],
        }
        this.x = this.game.context.canvas.clientWidth / 2
        this.y = this.game.context.canvas.clientHeight / 2
        this.numbers = 1
        this.changeTexture = this.changeTexture.bind(this)
        // this.setup()
    }
    generateNumber(len) {
        this.numbers = len
        for(var i = 0; i < len; i++) {
            var name = `start${i}`
            var t = this.game.textureByName(name)
            this.animations[`run`].push(t)
        }
        this.frameIndex = 0
        this.frameCount = len * 60
    }
    static new(game){
        return new this(game)
    }
    changeNumberLifeByTime() {
        this.changeNumber = true
    }
    frames() {
        return this.animations['run']
    }
    changeTexture(n) {
        this.texture = this.frames()[n]
        if(n == 0) {
            var s = SceneTitle.new(this.game)
            this.game.replaceScene(s)
        }
    }
    update(){
        if(this.changeNumber &&　this.frameCount >  -1)　{
            var a = this.changeTexture
            var s = {}
            for(var i = 0; i < this.numbers; i++) {
                var n = (i + 1) * 60
                s[n] = a
            }
            var f = this.frameCount
            if(typeof ( s[f] ) == 'function') {
                s[f]((f / 60 ) - 1)
            }
            this.frameCount--
        }
    }
    draw() {
        if(this.changeNumber) {
            var context = this.game.context
            context.drawImage(this.texture, this.x, this.y - 80)
        }
    }
}

class SceneStart extends GuaScene {
    constructor(game) {
        super(game)
        this.setup()
    }
    setup() {
        var game = this.game
        this.title = GuaImage.new(this.game, 'title')
        var x = this.game.context.canvas.clientWidth / 2 - this.title.w / 2
        var y = this.game.context.canvas.clientHeight / 2 - this.title.h - 100
        this.title.x = x
        this.title.y = y
        this.addElement(this.title)
        // 添加地面
        this.ground = Grounds.new(this.game)
        this.addElement(this.ground)

        this.bird = StartFlappy.new(this.game)
        this.bird.x = this.game.context.canvas.clientWidth / 2 - 20
        this.bird.y = this.game.context.canvas.clientHeight / 2 - 20
        this.addElement(this.bird)
        // 增加数字
        this.number = Numbers.new(game)
        this.number.generateNumber(4)
        this.addElement(this.number)
        var self = this
        game.registerAction('k', function(){
            // 按下了按钮之后显示倒计时之后切换场景
            self.number.changeNumberLifeByTime()

        })
    }
    drawText(font, style, text, x, y) {
        var context = this.game.context
        context.font=font;
        context.fillStyle = style;
        context.fillText(text, x, y)
    }
    draw() {
        // draw labels
        super.draw()
        this.drawText("20px Arial", "black",'按 k 开始游戏 p 为切换暂停键位 J为跳跃键位', this.title.x - 100,  this.title.y + 250)
    }
}
