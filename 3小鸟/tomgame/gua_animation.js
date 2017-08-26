class GuaAnimation {
  constructor(game) {
      this.game = game
      this.animations = {

      }
      this.animationName = ''
      this.frameIndex = 0
      this.frameCount = 3
      this.flipX = false
  }
  addAnimationType(name) {
      this.animations[name] = []
  }
  changeAnimationItem(name, item) {
      this.animations[name].push(item)
  }
  removeAnimation(name) {
      this.animations[name] = null
  }
  frames() {
      return this.animations[this.animationName] || []
  }
  static new(game) {
      return new this(game)
  }
  setTexture() {
      this.texture = this.frames()[0]
  }
  draw() {
      this.w = this.texture.width
      this.h = this.texture.height
      var context = this.game.context
          context.save()
          var w2 = this.w / 2
          var h2 = this.h / 2
          context.translate(this.x + w2, this.y + h2)
          if(this.flipX) {
              context.scale(-1, 1)
          }
          context.rotate(this.rotation * Math.PI / 180)
          context.translate(-w2, -h2)
          context.drawImage(this.texture, 0, 0)


          context.restore()
  }
  update() {
      this.frameCount--
      if(this.frameCount === 0) {
          this.frameCount = 3
          this.frameIndex = (this.frameIndex + 1) % this.frames().length
          this.texture = this.frames()[this.frameIndex]
      }
  }
  changeAnimationName(name) {
      this.animationName = name
  }
  move(x, keyStatus) {
      this.flipX = x < 0
      this.x += x
      var animationNames = {
          down: 'run',
          up: 'normal',
      }
      var name = animationNames[keyStatus]
      this.changeAnimationName(name)
      if(keyStatus === 'down') {
          this.changeAnimationName('run')
      }else if (keyStatus === 'up') {
          this.changeAnimationName('normal')
      }
  }
}
