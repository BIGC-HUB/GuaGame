var es = sel => document.querySelectorAll(sel)

var bindAll = function(sel, eventName, callback) {
    var l = es(sel)
    for (var i = 0; i < l.length; i++) {
        var input = l[i]
        input.addEventListener(eventName,function(event) {
            callback(event)
        })
    }
}

var templateControl = function(key,item) {
    var t = `<div class="">
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

var insertControls = function() {
    var div = e('.gua-controls')
    var keys = Object.keys(config)
    for (var k of keys) {
        var item = config[k]
        var html = templateControl(k, item)
        div.insertAdjacentHTML('beforeend',html)
    }
}

var bindEvents = function() {
    bindAll('.gua-auto-slider','input',function(event) {
        var target = event.target
        var bindVar = target.dataset.value
        var v = target.value
        eval(bindVar + '.value =' + v)
        //
        var label = target.closest('label').querySelector('.gua-label')
        label.innerText = v
    })
}

var __main = function() {
    var images = {
        bird0: 'img/bird0_0.png',
        bird1: 'img/bird1_1.png',
        bird2: 'img/bird2_2.png',
        bg: 'img/bg_day.png',
        ground:'img/land.png',
        pipe_up:'img/pipe_up.png',
        pipe_down:'img/pipe_down.png',
        begin:'img/text_ready.png',
        beginLogo:'img/button_play.png',
        score0:'img/score_0.png',
        score1:'img/score_1.png',
        score2:'img/score_2.png',
        score3:'img/score_3.png',
        score4:'img/score_4.png',
        score5:'img/score_5.png',
        score6:'img/score_6.png',
        score7:'img/score_7.png',
        score8:'img/score_8.png',
        score9:'img/score_9.png',
        gameOver:'img/text_game_over.png',
    }
    //从配置文件生成html控件
    insertControls()
    //绑定事件
    bindEvents()

    var game = GuaGame.instance(30, images, function(g){
        // var s = Scene.new(g)
        var s = SceneTitle.new(g)
        g.runWithScene(s)
    })
}

__main()
