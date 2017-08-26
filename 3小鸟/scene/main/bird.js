class Bird extends GuaAnimation {
    constructor(game) {
        super(game)
        this.game = game
        // 缂栫爜
        this.animations = {
            idle: [],
            run: [],
        }

        // this.frames = []
        for (var i = 0; i < 3; i++) {
            var name = `bird${i}`
            var t = game.imageByName(name)
            this.animations['idle'].push(t)
        }

        this.gy = 10
        this.vy = 0

        this.setup()
        this.setupInput()
    }

    move(step, keyStatus) {
        this.flipX = step < 0
        this.x += step
    }


    setup() {
        this.rotation = 0
        this.alive = true
        
        this.x = 100
        this.y = 200


    }

    kill() {
        this.alive = false
    }
    jump() {
        if (this.alive) {
            this.vy = -10
            this.rotation = -45
        }

    }

    setupInput() {
        var self = this
        self.game.registerAction('d', function(status) {
            self.move(2, status)
        })

        self.game.registerAction('a', function(status) {
            self.move(-2, status)
        })

        self.game.registerAction('j', function(status) {
            self.jump()
        })
    }

    collide(pipe) {
        return rectIntersects(this, pipe) && rectIntersects(pipe, this)
    }

}
