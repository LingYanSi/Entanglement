// 事件订阅

window.PubSub = function(){
    this.cache = {}
}

PubSub.prototype = {
    sub(name, fun){
        let arr = this.cache[name] = this.cache[name] || []
        arr.push(fun)
    },
    pub(name, ...arg){
        (this.cache[name] || []).forEach(item => {
            item(...arg)
        })
    }
}
