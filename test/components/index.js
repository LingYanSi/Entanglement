// import Ent from 'Ent'
import List from './List'
import Chat from './Chat'
import Sidebar from './Sidebar'

console.log('聊天==============》', Chat);
// 一个组件，应该是一个function，在需要他的时候，进行实例化，然后渲染

// 支持slot，也就是react的props.children
let Header = Ent.createClass( {
    template: '<div><slot></slot></div>'
})

let Footer = Ent.createClass( {
    template: '<div>我是底部</div>'
})

// 创建一个组件
let App = Ent.createClass(  {
    data: {
        title: 'Ent组建技术',
        content: '我是内容',
        num: 0,
    },
    // 引入组建
    components: {Footer, Sidebar, List, Chat, Header},
    componentWillMount(){
        console.log('开始构建');
    },
    componentDidMount(){
        console.log('组件完成');
        // 其实store的作用是生命文档格式，data是真正的store
        var data = this.data
    },
    componentWillUpdate(){
        console.log('组件将要更新');
    },
    componentDidUpdate(){
        console.log('组件更新完毕');
    },
    fuck(event){
        if(event.target == this.refs.comment && event.keyCode != 13 ) return
        this.data.comments.push({
            content: this.refs.comment.value
        })
        this.data.num++
    },
    del(index){
        this.data.comments.splice(index, 1)
    },
    handleFooterClick(index){
        let comment = this.data.comments[index]
        comment.content += '被电击了'
        this.data.comments.splice(index, 1, comment)
    },
    // 对模板的支持还是太弱了
    // 三则运算符，if else/forEach,等等，最好的一个状态是{}内包裹的是js语句
    // react render return前的逻辑操作其实可以前置的，也就是说并不用放在render函数内，并且理论上return的应该是一个比较单纯的字符串？
    template: `
        <div>
            <Header>
                <div>
                    <h1>聊天呢</h1>
                </div>
            </Header>
            <div class="main">
                <Sidebar></Sidebar>
                <List></List>
                <Chat></Chat>
            </div>
            <Footer xx="xx"></Footer>
        </div>
    `
})

// 渲染组建
Ent.render(App, document.querySelector('#app'))
