class SceneEnd extends GuaScene {
    constructor(game) {
        super(game)
        this.game = game
        game.registerAction('r', function(){
            var s = SceneTitle.new(game)
            game.replaceScene(s)
        })
        let gameOver = GuaImage.new(this.game,'gameOver')
        gameOver.x = 250 - gameOver.w / 2
        gameOver.y = 250
        this.addElement(gameOver)
        //游戏提示
        this.addElement(Gualabel.new(game, '按 r 重新开始吧', 210, 200))
        let fen = game.scores || 0
        this.addElement(Gualabel.new(game, `你一共飞过 ${fen} 个烟囱`, 200, 150))
    }
}
