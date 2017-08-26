
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        var f = Flappy.new(game)
        this.f = f
        // 由于不同的场景都有同样的背景， 因此抽取到scene中
        // var bg = GuaImage.new(game, 'bg')
        // bg.w = 600
        // bg.h = 350
        // this.addElement(bg)
        // 加入水管
        this.pipe = Pipes.new(game)
        this.addElement(this.pipe)
        // 添加地面
        this.ground = Grounds.new(game)
        this.addElement(this.ground)
        this.addElement(f)
        this.beginGame = false
        this.setup()
        // 添加开始按钮
        this.start = StartButton.new(game, 'start')
        this.addElement(this.start)

        // 添加结束按钮
        this.pause = PauseButton.new(game, 'pause')
        this.addElement(this.pause)

        // 添加结束游戏的 modal
        this.modal = Modal.new(game)
        this.addElement(this.modal)
        this.closeModal = false

        // 增加数字
        this.number = Numbers.new(game)
        this.number.generateNumber(10)
        this.addElement(this.number)
    }
    drawText(font, style, text, x, y) {
        var context = this.game.context
        context.font=font;
        context.fillStyle = style;
        context.fillText(text, x, y)
    }
    draw() {
        super.draw()
        this.drawText("20px Arial", "black",`总得分: ${this.f.score}`, 500, 30)
    }
    setup() {
        var self = this
        self.game.registerAction('p', function(keyStatus) {
            if(keyStatus === 'up') {
                self.beginGame = !self.beginGame
            }
        })
        self.game.registerAction('r', function(keyStatus) {
            if(keyStatus === 'up') {
                var s = SceneStart.new(self.game)
                self.game.replaceScene(s)
            }
        })

        self.game.canvas.addEventListener('click', (e) => {
            if(e.offsetX > 438 && e.offsetX < 470) {
                if(e.offsetY > 80 && e.offsetY < 110){
                    this.closeModal = true
                }
            }
        })
    }
    update() {
        this.start.update()
        this.pause.update()
        this.modal.update()
        if(this.beginGame) {
            return
        }
        if(this.f.life == -1) {
            // 小鸟生命值为 0, 设置model, 显示最终分数
            return
        }
        super.update()
    }
}
