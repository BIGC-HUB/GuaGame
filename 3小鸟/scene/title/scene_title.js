
class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)


        //bg
        var background = GuaImage.new(game,'bg')
        this.addElement(background)
        var begin = GuaImage.new(game,'begin')
        begin.x = 50
        begin.y = 140
        this.addElement(begin)
        var beginLogo = GuaImage.new(game,'beginLogo')
        beginLogo.x = 80
        beginLogo.y = 250
        this.addElement(beginLogo)

        // 循环移动的地面
        this.grounds = []
        for (var i = 0; i < 20; i++) {
            var g = GuaImage.new(game,'ground')
            g.x = i * 19
            g.y = 460
            this.addElement(g)
            this.grounds.push(g)
        }
        this.skipCount = 4

        //bird
        this.birdSpeed = 2
        var b = StaticAnimation.new(game)
        b.x = 120
        b.y = 90
        this.b = b
        this.addElement(b)
        game.registerAction('b', function(){
            var s = Scene.new(game)
            game.replaceScene(s)
        })

        //游戏提示
        var label = Gualabel.new(game, '                           print b to start')
        this.addElement(label)
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
    }

}
