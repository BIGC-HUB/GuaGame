
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)


        //bg
        var background = GuaImage.new(game,'bg')
        this.addElement(background)
        var begin = GuaImage.new(game,'begin')
        begin.x = 250 - begin.w / 2
        begin.y = 140
        this.addElement(begin)
        var beginLogo = GuaImage.new(game, 'beginLogo')
        beginLogo.x = 250 - beginLogo.w / 2
        beginLogo.y = 250
        this.addElement(beginLogo)

        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GuaImage.new(game, 'ground')
            g.x = i * 19
            g.y = 460
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        //bird
        this.birdSpeed = 2
        var b = StaticAnimation.new(game)
        b.x = 250 - b.w
        b.y = 90
        this.b = b
        this.addElement(b)
        game.registerAction('b', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })

        //游戏提示
        var label = Gualabel.new(game, '按 b 开始 按 j 跳', 208, 200)
        this.addElement(label)
    }

    update() {
        super.update()
    }

}
