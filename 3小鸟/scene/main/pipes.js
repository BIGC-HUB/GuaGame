class Pipes {
    constructor(game) {
        this.game = game
        this.setup()
        this.addPipes()
    }
    static new(...args) {
        this.i = new this(...args)
        return this.i
    }
    setup() {
        this.pipes = []
        this.pipeSpace = 100
        this.pipeCross = 170
        this.columsOfPipe = 3
    }
    reset() {
    for (var i = 0; i < this.columsOfPipe; i++) {
        var index = i * 2
        var p1 = this.pipes[index]
        var p2 = this.pipes[index+1]
        p1.x = 500 + i * this.pipeCross
        p1.y = randonBetween(-200, 0)
        this.resetPipesPostion(p1, p2)
    }

}
    addPipes() {
        var game = this.game
        for (var i = 0; i < this.columsOfPipe; i++) {
            var p1 = GuaImage.new(game, 'pipe_down')

            p1.x = 500 + i * this.pipeCross
            p1.y = randomBetween(-200, 0)

            var p2 = GuaImage.new(game, 'pipe_up')

            this.resetPipesPosition(p1, p2)
            this.pipes.push(p1)
            this.pipes.push(p2)
        }
    }

    resetPipesPosition(p1, p2) {
        p2.x = p1.x
        p2.y = p1.y + p1.h + this.pipeSpace
    }
    debug() {
        this.pipeCross = config.pipeCross.value
        this.pipeSpace = config.pipe_space.value
    }

    update() {
        if (window.paused) {
            return
        }

        for (var i = 0; i < this.columsOfPipe ; i ++) {
            var index = i * 2
            var p1 = this.pipes[index]
            var p2 = this.pipes[index+1]
            p1.x -= 5
            this.resetPipesPosition(p1,p2)
            if (p1.x < -p1.w) {
                   p1.x =  this.pipeCross * this.columsOfPipe
                   this.resetPipesPosition(p1, p2)
             }

        }
    }
    draw() {
        var context = this.game.context
        for(var p of this.pipes) {
            context.drawImage(p.texture, p.x, p.y, p.w, p.h)
        }
    }
}
