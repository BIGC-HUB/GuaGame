/**
 * Created by wafer on 2017/7/31.
 */
class GuaScene {
    constructor(game) {
       this.game = game
       this.elements = []
       this.enableDebugMode = true
       this.setups()
    }
    setups() {
        // 添加背景
        this.bg = GuaImage.new(this.game, 'bg')
        this.bg.w = 600
        this.bg.h = 350
        this.addElement(this.bg)
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    draw(){
      for (var e of this.elements) {
        // var e = this.elements[i]
          e.draw()
          // this.game.drawImage(e)
      }
    }
    removeElement(guaImage) {
        guaImage.scene = this
        var index = this.elements.findIndex(guaImage)
        this.elements.splice(index, 1)
    }
    addElement(guaImage) {
      guaImage.scene = this
      this.elements.push(guaImage)
    }
    update(){
        if(this.enableDebugMode) {
            for (var i = 0; i < this.elements.length; i++) {
              var e = this.elements[i]
              e.debuger && e.debuger()
            }
        }
      for (var i = 0; i < this.elements.length; i++) {
        var e = this.elements[i]
        e.update()
      }
    }
}
