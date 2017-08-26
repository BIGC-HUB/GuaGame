// class Gualabel {
//     constructor(game, text) {
//         this.game = game
//         this.text = text
//     }
//     static new(game, text) {
//         return new this(game, text)
//     }
//     draw() {
//         this.game.context.fillText(this.text, 100, 190)
//     }
//     update() {
//
//     }
// }

class SceneTitle extends GuaScene {
    constructor(game) {
        super(game)

        game.registerAction('b', function(){
            let s = Scene.new(game)
            game.replaceScene(s)
            // runWithScene不知为何有bug
            // game.runWithScene(s)
        })

        this.addElement(GuaImage.new(game, 'start'))
        // let label = Gualabel.new(game, 'hello')
        // this.addElement(label)
        // let ps = GuaParticleSystem.new(game)
        // this.addElement(ps)
    }
    draw() {
        super.draw()
    }
}
