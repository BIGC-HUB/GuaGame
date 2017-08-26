/**
 * Created by tom on 2017/8/15.
 */
class Modal {
    constructor(game) {
        this.game = game
        this.setup()
    }
    setup() {
        this.text = ''
        this.score = {
            x: 200,
            y: 180,
            point :0,
        }
        this.life = -1
        this.bg = GuaImage.new(this.game, 'modalbg')
        this.titleX = 232
        this.titleY = 364
        this.bg.x = 75
        this.bg.y = 22
        this.bg.w = 417
        this.bg.h = 390
    }
    drawText(font, style, text, x, y) {
        var context = this.game.context
        context.font=font;
        context.fillStyle = style;
        context.fillText(text, x, y)
    }
    draw() {
        if(this.life < 0) {
            return
        }
        this.bg.draw()
        this.drawText("30px Arial", "red", this.text, this.titleX, this.titleY)
        this.drawText("20px Arial", "green", `总得分: ${this.score.point}`, this.score.x, this.score.y)
        this.drawText("20px Arial", "green",`按R重新开始游戏`, this.score.x, this.score.y + 80)
    }
    static new(game){
        return new this(game)
    }
    debuger() {
        this.bg.x = config.modalX.value
        this.bg.y = config.modalY.value
        this.bg.w = config.modalW.value
        this.bg.h = config.modalH.value
        this.titleX = config.titleX.value
        this.titleY = config.titleY.value
    }
    update(){
        var scene = this.game.scene
        if(scene.closeModal) {
            this.life = -1
        }else if(scene.f.life < 0) {
            this.score.point = scene.f.score
            this.life = 100
            this.text = '游戏结束'
        }
    }
}
