
// 联系人组件

var ListItem = Ent.createClass({
    data: {
        num: 0
    },
    componentDidMount(){
            console.log('props数据：', this.props)
    },
    template: `
        <div class="list-item">
            <div class="avatar" style="background-image:url({props.data.avatar})"></div>
            <div class="info">
                <p>{props.data.username}</p>
                <p>{props.data.sum}</p>
            </div>
        </div>
    `
})


var List = Ent.createClass({
    data: {
        list: [{
            username: '习近平',
            id: 1,
            avatar: 'http://ww2.sinaimg.cn/mw690/006fecvljw1f6u96pi0qsg30by06h4qs.gif',
            sum: '国家主席习近平'
        },
        {
            username: '习近平',
            id: 1,
            avatar: 'http://ww2.sinaimg.cn/mw690/006fecvljw1f6u96pi0qsg30by06h4qs.gif',
            sum: '国家主席习近平'
        },
        {
            username: '习近平',
            id: 1,
            avatar: 'http://ww2.sinaimg.cn/mw690/006fecvljw1f6u96pi0qsg30by06h4qs.gif',
            sum: '国家主席习近平'
        }]
    },
    componentDidMount(){
        console.log('props数据：', this.data.list)
    },
    components: {ListItem},
    template: `<div each="user in data.list" id="list">
        <ListItem index={$index} data={user}></ListItem>
    </div>`
})

export default List
