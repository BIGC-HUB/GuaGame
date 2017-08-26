class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)
        game.registerAction('k', function(){
            let s = Scene(game)
            game.replaceScene(s)
        })
    }
    draw() {
        // draw labels
        this.game.context.fillText('按 空格 发射子弹', 100, 100)
        this.game.context.fillText('按 k 开始游戏', 100, 150)
        this.game.context.fillText('鼠标左键 添加砖块', 100, 200)
    }
}
