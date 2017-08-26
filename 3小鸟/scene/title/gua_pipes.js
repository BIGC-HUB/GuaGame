/**
 * Created by tom on 2017/8/14.
 */
class Pipes {
    constructor(game) {
        this.game = game
        this.pipes = []
        this.pipeSpace = 130
        this.管子横向间距 = 200
        this.pipeIntialX = 400
        this.columsOfpipe = 7
        for (var i = 1; i < this.columsOfpipe; i++) {
            var p1 = GuaImage.new(game, 'tube2')
            p1.h = 100
            p1.flipY = true
            p1.x = this.pipeIntialX + i * this.管子横向间距
            var p2 = GuaImage.new(game, 'tube2')
            p2.x = p1.x
            p2.h = 100
            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }
    static new(game) {
        return new this(game)
    }
    debuger() {
        this.管子横向间距 = config.管子横向间距.value
        this.pipeSpace = config.pipeSpace.value
        for (var p of this.pipes) {
            p.h = config.pipeh.value
        }
    }
    resetPipesPosition(p1, p2) {
        p1.y = randomBetween(-60, 10)
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    update() {
        var pipes = this.pipes
        for (var i = 0; i < pipes.length / 2; i += 2) {
            var p1 = pipes[i]
            var p2 = pipes[i+1]
            p1.x -= 1
            p2.x -= 1
            if(p1.x < -60) {
                p1.x += this.管子横向间距 * this.columsOfpipe / 2
            }
            if(p2.x < -60) {
                p2.x += this.管子横向间距 * this.columsOfpipe / 2
                this.resetPipesPosition(p1, p2)
            }
        }
    }
    draw() {
        var context = this.game.context
        for (var p of this.pipes) {
            context.save()
            var w2 = p.w / 2
            var h2 = p.h / 2
            context.translate(p.x + w2, p.y + h2)
            var scaleX = p.flipX ? -1 : 1
            var scaleY = p.flipY ? -1 : 1
            context.scale(scaleX, scaleY)
            context.rotate(p.rotation * Math.PI / 180)
            context.translate(-w2, -h2)
            context.drawImage(p.texture, 0, 0)


            context.restore()
        }
    }
}
