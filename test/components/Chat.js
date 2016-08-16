
// 聊天组件

import Dialog from './Dialog'
import Message from './Message'

let Chat = Ent.createClass({
    components: {Dialog, Message},
    template: `<div id="chat">
        <h1 class="center title">胡锦涛</h1>
        <Dialog></Dialog>
        <Message></Message>
    </div>`
})

export default Chat
