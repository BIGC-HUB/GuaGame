let es = sel => document.querySelectorAll(sel)

let bindAll = function(sel, eventName, callback) {
    let l = es(sel)
    for (let i = 0; i < l.length; i++) {
        let input = l[i]
        input.addEventListener(eventName,function(event) {
            callback(event)
        })
    }
}

let templateControl = function(key,item) {
    let t = `<div class="">
        <label>
            <input class="gua-auto-slider" type="range"
                max='300'
                value="${item.value}"
                data-value='config.${key}'>
            ${item._comment}: <span class="gua-label"></span>
        </label>
    </div>`
    return t
}

let insertControls = function() {
    let div = e('.gua-controls')
    let keys = Object.keys(config)
    for (let k of keys) {
        let item = config[k]
        let html = templateControl(k, item)
        div.insertAdjacentHTML('beforeend',html)
    }
}

let bindEvents = function() {
    bindAll('.gua-auto-slider','input',function(event) {
        let target = event.target
        let bindlet = target.dataset.value
        let v = target.value
        eval(bindlet + '.value =' + v)
        //
        let label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}

let __main = function() {
    let images = {
        bullet: 'img/weapon.png',
        cloud: 'img/cloud.png',
        player: 'img/naruto.png',
        start: 'img/start.png',
        sky: 'img/background.png',
        end: 'img/end.png',
        enemy0:'img/target0.png',
        enemy1:'img/enemy1.png',
        enemy2:'img/enemy2.png',
        enemy3:'img/enemy3.png',
        spark:'img/boom.png',
        get:'img/get.png',
        enemy_bullet:'img/enemy_bullet.png',
    }

    //从配置文件生成html控件
    insertControls()
    //绑定事件
    bindEvents()
    let game = GuaGame.instance(30, images, function(g){
        // let s = Scene.new(g)
        let s = SceneTitle.new(g)
        g.runWithScene(s)
    })

}

__main()
