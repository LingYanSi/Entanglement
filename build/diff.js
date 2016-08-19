
// diff数据，那些数据发生了变化，然后和对应的节点做一个渲染，那这里面还有逻辑判断呢
// 如果节点元素没有发生变化，就更新节点上的相关属性【class/id/textContent等等 当然】

function Diff(oldTree = [], newTree = [], $ele, that){
    if(oldTree.length < 1) return

    newTree.forEach((item, index) => {
        let oItem = oldTree[index]

        // entId不同，则需要重新渲染这部分
        if( item.entId != oItem.entId || item.tag != oItem.tag ){
            // 重新渲染
            $ele = $ele.querySelector(`[data-entid="${item.id}"]`)
            that.Render([oItem], $ele, true)
            return
        }

        // attrs变化，更新属性
        if(item.IS_COMPONENT){
            // 通知子元素props更新
        }else{
            let changeAttr = {}
            for(let key in item.attrs){
                if(item.attrs[key] != oItem.attrs[key]){
                    changeAttr[key] = item.attrs[key]
                }
            }
        }


        Object.keys(changeAttr).length && Render.attrsBind($ele.querySelector(`[data-entid="${item.id}"]`), changeAttr, item, that.refs)

        // 如果是文本节点，直接上文本
        if(item.tag == oItem.tag && item.tag === null ){ 
            let id = item.entId.split('-').slice(0, -2).join('-')
            let item_comment_start = item.entId + '-start'
            Array.from($ele.querySelector(`[data-entid="${id}"]`).childNodes).some(childNode => {
                if(childNode.nodeType == 8 && childNode.textContent == item_comment_start){
                    childNode.nextSibling.textContent = item.text
                }
            })
        }

        Diff(oItem.children, item.children , $ele, that)

    })

    return ''
}
