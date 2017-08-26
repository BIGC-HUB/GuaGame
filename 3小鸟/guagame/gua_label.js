class Gualabel {
    constructor(game, text, x, y) {
        this.game = game
        this.text = text
        this.x = x || 0
        this.y = y || 200
    }
    static new(game, text, x, y) {
        return new this(game, text, x, y)
    }
    draw() {
        this.game.context.fillText(this.text, this.x, this.y)
    }
    update() {

    }
}
