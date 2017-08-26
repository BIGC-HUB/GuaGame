class StartButton extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.life = 0
    }
    draw() {
        if(this.life == 0) {
            return
        }
        super.draw()
    }
    update() {
        if(this.game.scene.beginGame) {
            this.life = 100
        }else {
            this.life = 0
        }
    }
}

class PauseButton extends GuaImage {
    constructor(game, name) {
        super(game, name)
        this.life = 0
    }
    draw() {
        if(this.life == 0) {
            return
        }
        super.draw()
    }
    update() {
        if(!this.game.scene.beginGame) {
            this.life = 100
        }else {
            this.life = 0
        }
    }
}
