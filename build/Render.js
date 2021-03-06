function Render(HTMLTree, $ele, props, ctx, REPLACE_PLACEHOLDER_ELEMENT, ENT_ID_PRE = '') {
    var docfrag = document.createDocumentFragment();
    let refs = ctx.refs = {}
        // docfrag = document.createElement('div')
        // 转成一个 document fragment
    function toDOM(HTMLTree) {
        HTMLTree.forEach(item => {
            this.run(item, docfrag)
        })
    }

    toDOM.prototype = {
        run(node, parent) {
            let element
            if (node.tag) {
                // 创建元素
                node.IS_COMPONENT = /[A-Z][a-z]+/.test(node.tag)
                element = document.createElement(node.tag)

            } else {
                // 文本节点
                element = document.createTextNode(node.text || '')
            }

            // 如果父节点是一个组建，就把他push到propsChildren中去
            if (node.parent && node.parent.IS_COMPONENT) {
                node.parent.propsChildren = node.parent.propsChildren || []
                node.parent.propsChildren.push(element)
            } else {
                parent.appendChild(element)
            }

            // 为元素添加上路标
            Render.setEntId(element, node, ENT_ID_PRE, !node.tag)

            // console.log(element);
            ;(node.children || []).forEach(child => {
                this.run(child, element)
            })


            if (node.tag) {

                if (/[A-Z][a-z]+/.test(node.tag)) {
                    // 自定义组件
                    // node.IS_COMPONENT = true
                    let props = Object.assign({}, node.attrs, {
                            children: node.propsChildren || []
                        })
                    // 从上下文中获取子组件
                    var compoennt = Ent.render(ctx.components[node.tag], props, element, true, element.dataset['entid']+'-' )
                } else if (node.tag == 'slot') {
                    // 替换占位元素
                    Render.replaceChild(element, props.children, ctx)
                } else {
                    // 属性渲染
                    // class
                    Render.attrsBind(element, node.attrs, node, refs)
                        // 事件绑定
                    Render.eventBind(element, node.attrs)
                }
            }
        }
    }
    new toDOM(HTMLTree)

    $ele.innerHTML = ''
    if(REPLACE_PLACEHOLDER_ELEMENT) {
        // 替换占位元素
        Render.replaceChild($ele, docfrag.childNodes, ctx)
   }   else {
       Array.from(docfrag.childNodes).forEach(node => {
           $ele.appendChild(node)
       })
   }
}

// 替换占位元素
Render.replaceChild = function($ele, childNodes, ctx){
    let $parent = $ele.parentElement
    $current = childNodes[0]
    $parent.replaceChild($current ,$ele)
    Array.from(childNodes).forEach((node, index) => {
        if(index !=0){
            Render.inserAfter($parent, $current, node)
            $current = node
        }
        // $ele.appendChild(node)
   })

   ctx.$ele = $current
}

Render.inserAfter = function($parent, $ele, element){
    let next = $ele.nextElementSibling
    next ? $parent.insertBefore(next, element) : $parent.appendChild(element)
}

Render.setEntId = function(ele, node, ENT_ID_PRE, IS_TEXT_NODE){
    if(!IS_TEXT_NODE){
        ele.setAttribute('data-entid',  node.entId)
    }else{
        console.log(ele, ele.parentNode);
        let $parent = ele.parentNode
        $parent.insertBefore(document.createComment( node.entId + '-start'), ele)

        let end = document.createComment( node.entId + '-end')
        ele.nextSibling ? $parent.insertBefore(end, ele.nextSibling) : $parent.appendChild(end)
    }

}

Render.attrsBind = function(ele, attrs, node, refs) {

    for (let key in attrs) {
        let value = attrs[key]
        switch (key) {
            case 'style':
                ele[key] = value
                break
            case 'class':
                ele.className = value
                break
            case 'id':
                ele[key] = value
                break
            case 'ref':
                refs[value] = ele
                break
            case 'type':
                node.tag == 'input' && (ele.type = value)
                break
            case 'title':
                ele[key] = value
                break
            case 'src':
                node.tag == 'img' && (ele[key] = value)
                break
            case 'checked':
                node.tag == 'input' && (ele[key] = value)
                break
            case 'href':
                node.tag == 'a' && (ele[key] = value)
                break
            default:
                if (key.startsWith('data-')) {

                }
        }
    }
}

Render.eventBind = function(ele, attrs) {
    for (let key in attrs) {
        if (key.startsWith('on')) {
            let eventType = key.slice(2).toLowerCase()
            Render.eventTypesArr.includes(eventType) && ele.addEventListener(eventType, attrs[key])
        }
    }
}

Render.eventTypesArr = ['click', 'dblclick', 'mouseover', 'mouseout', 'mousemove', 'mouseenter', 'mouseleave', 'keydown', 'keyup', 'input', 'change', 'drop']
