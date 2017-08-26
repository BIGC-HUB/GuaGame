class Scores {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(...args) {
        this.i = new this(...args)
        return this.i
    }

    setup() {
        var game = this.game
        this.scores = 0

        this.scoresImge = {
            '0': GuaImage.new(game, 'score0'),
            '1': GuaImage.new(game, 'score1'),
            '2': GuaImage.new(game, 'score2'),
            '3': GuaImage.new(game, 'score3'),
            '4': GuaImage.new(game, 'score4'),
            '5': GuaImage.new(game, 'score5'),
            '6': GuaImage.new(game, 'score6'),
            '7': GuaImage.new(game, 'score7'),
            '8': GuaImage.new(game, 'score8'),
            '9': GuaImage.new(game, 'score9'),
        }

        var s = this.scores.toString()
        this.images = []
        this.x = 130
        this.y = 80

    }

    getScoreImge(s) {
        return this.scoresImge[s]
    }

    update() {
        this.images = []
        var s = this.scores.toString()
        for( var i = 0; i < s.length; i++) {
            var num = s[i]
            var img = this.getScoreImge(num)
            this.images.push(img)
        }
    }

    draw() {
        var context = this.game.context
        let arr = this.images
        for (var i = 0; i < arr.length; i++) {
            var image = arr[i]
            var x = 250 - image.w / 2  + 24 * i
            var y  = 488
            context.drawImage(image.texture, x, y)
        }

    }
}
