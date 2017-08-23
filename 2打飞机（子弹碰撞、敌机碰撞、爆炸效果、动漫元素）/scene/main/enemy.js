class Enemy extends GuaImage {
    constructor(game) {
        let type = randomBetween(0, 3)
        let name = 'enemy' + type
        super(game,name)
        this.setup()
    }
    setup(){
        let c = this.game.canvas
        this.alive = true
        this.speed = randomBetween(2, 5)
        this.x = c.width
        this.y = randomBetween(0, c.height - this.h)
        this.cooldown = 0
    }
    update() {
        this.x -= this.speed
        if (this.x < 0) {
            this.setup()
        }
        let game = this.game
        if (this.cooldown > 0) {
            this.cooldown--
        }
        if (this.alive && this.cooldown == 0) {
            this.cooldown = config.fire_cooldown.value
            let b = EnemyBullet.new(game)
            b.x = this.x + this.w / 2
            b.y = this.y
            this.addEnemiesBullets(b)
        }

    }
    addEnemiesBullets(b) {
        this.scene.enemiesBullets.push(b)
        this.scene.addElement(b)
    }
    kill() {
        //显示粒子动画然后消失
        this.x = -1000
        this.alive = false
        // config.score += 1
        // log(config.score)

    }
    explode(x, y) {
        let game = this.game
        let ps = GuaParticleSystem.new(game)
        ps.x = x
        ps.y = y
        // log('psps', ps.x, ps.y)
        // log('this',this,this.scene)
        this.scene.addElement(ps)
    }
}
