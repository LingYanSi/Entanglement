
// 对话框组件

let Sidebar = Ent.createClass({
    data: {
        num: 0
    },
    add(){
        this.data.num++
    },
    template: `<div id="sidebar" style="color:#fff;">
        <p class="center">{this.data.num}</p>
        <button onClick={this.add.bind(this)}>add</button>
    </div>`
})

export default Sidebar
