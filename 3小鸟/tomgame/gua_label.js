class GuaLabel {
  constructor(game, text) {
    this.game = game
    this.text = text
  }
  static new(game, text) {
    return new this(game, text)
  }
  draw() {
    var g = this.game.context
    g.fillText(this.text, 120, 570)
  }
  update() {
  }
}
