Ent.createClass = function(arg){
    // 很明显，一个组件应该是一个类Class，然后有不同的实例化
    var Component = function(){
        arg = Component.__arg__
        // 继承所有的方法
        Object.keys(arg).forEach(item=>{
            this[item] = arg[item]
        })

        this.render = function(){
            this._componentWillUpdate()

            // var html = arg.render.call(this)
            // this.$ele.innerHTML = html

            this._componentDidUpdate()
        }

        // 每触发一次，就会有一个异步render被加入到队列中，但最终只会执行一次
        var trigger = new Queue(this.__dataUpdate.bind(this)).push
        this.data = Observe(arg.data , this.__dataUpdate.bind(this));


        // 初始化钩子
        this.init = function(ele, props, REPLACE_PLACEHOLDER_ELEMENT, ENT_ID_PRE){
            // 元素从Ent.render中获取
            // render的时候，会有一个问题，就是如何处理依赖的component
            // 默认规定，component需要以大写字母开头
            this.$ele = ele
            this.props = props
            this.refs = {}


            // 渲染前
            this._componentWillMount()
            this.__REPLACE_PLACEHOLDER_ELEMENT = REPLACE_PLACEHOLDER_ELEMENT
            this.__ENT_ID_PRE = ENT_ID_PRE
            // 默认render一次
            this.render()
            // 渲染后
            this._componentDidMount()
        }

        // 每个组件都有自己的事件订阅/广播
        this.PubSub = new PubSub()
    }

    Component.__arg__ = arg

    Component.prototype = {
        // 数据变化监听
        __dataUpdate(key, type){
            // 这里的广播是异步的
            this.PubSub.pub('dataUpdata', this.data, this.props)
            this._componentWillUpdate()
        },
        // 渲染前
        _componentWillMount: function(){
            this.componentWillMount && this.componentWillMount()
        },
        // 渲染后
        _componentDidMount: function(){
            this.componentDidMount && this.componentDidMount()
        },
        // 卸载
        _componentWillUnmount: function(){
            this.componentWillUnmount && this.componentWillUnmount()
        },
        _componentMount: function(){
            this._componentWillUnmount()
            // 移除各种事件监听
            this.$ele.innerHTML = ''
        },
        // 更新前
        _componentWillUpdate: function(){
            // 不可以在更新前修改data
            this.componentWillUpdate && this.componentWillUpdate()

            // 去parser字符串,获取dom树
            var tree = Parser(this.template, this, this.__ENT_ID_PRE)
            if(this.__oldTree){
                console.log('执行Diff', this, this.refs);
                Diff(this.__oldTree, tree , this.$ele, this)
                return
            }

            this.__oldTree = tree

            // console.log( tree);

            // Render(tree, this.$ele, this.props, this, this.__REPLACE_PLACEHOLDER_ELEMENT, this.__ENT_ID_PRE)
            this.__render(tree, this.$ele, this.__REPLACE_PLACEHOLDER_ELEMENT)

            // 渲染tree
        },
        __render(tree, $ele, REPLACE_PLACEHOLDER_ELEMENT){
            Render(tree, $ele, this.props, this, REPLACE_PLACEHOLDER_ELEMENT, this.__ENT_ID_PRE)
        },
        // 更新前
        _componentDidUpdate: function(){
            this.componentDidUpdate && this.componentDidUpdate()
        }

    }

    return Component
}
