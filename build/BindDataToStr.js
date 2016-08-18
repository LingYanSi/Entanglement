
// 数据绑定转 字符串
function BindDataToStr(Dom, ctx){
    Dom.forEach(child => {
        if(child.tag){
            BindDataToStr.handleEach(child, ctx)

			let attrs = child.attrs
			for(let key in attrs){
				attrs[key] = BindDataToStr.matchTag(key, attrs, child, ctx)
			}

            child.children && BindDataToStr(child.children, ctx)
        }else {
			// 文本节点
            child.text = BindDataToStr.matchTag('xx' ,{xx: child.text}, child, ctx, true)
        }
    })
}

BindDataToStr.matchTag = function(key, attrs, node, ctx, IS_TEXT_NODE){
    // IS_TEXT_NODE 是不是文本节点
    const IS_EVENT =  key.startsWith('on')
	let str = attrs[key]
	let result
	// 默认属性的value是String类型
	let ATTR_IS_STR = true

	// 只有字符串才有替换的必要
    str = ( typeof str === 'string') ? str.replace(/{[^}]+}/g, function(matched, index, str){
		ATTR_IS_STR = matched !== str
        let expression = matched.slice(1, -1)

        // 主要处理 bind方法
        BindDataToStr.bindCTX(function(){
            // 把作用域合并
            ctx = Object.assign({}, ctx, ...BindDataToStr.getAllCTX(node))
            with(ctx){
                result = eval(expression)
            }
        }, ctx)

		// 如果是一个方法，就返回function
		return IS_TEXT_NODE || ATTR_IS_STR ? ''+result : result
    }) : str

	if(!IS_TEXT_NODE && (str.startsWith(`"`) && str.endsWith(`"`) || str.startsWith(`'`) && str.endsWith(`'`)) ){
		str = str.slice(1, -1)
	}
	// 如果是文本节点就返回字符串，反则直接返回result
    return IS_TEXT_NODE || ATTR_IS_STR ? str : result
}

// 把方法的this指向作用域
BindDataToStr.bindCTX = function(fn, ctx){
    fn.call(ctx)
}

// 合并一个节点的ctx与其所有父节点的ctx
BindDataToStr.getAllCTX = function(node){
    let ctx = []
    while (node) {
        node.ctx && ctx.push(node.ctx)
        node = node.parent
    }

    return ctx
}

// 深度clone html Tree 深度【attrs, children】
BindDataToStr.deepClone = function(target, parent){
    let newTarget = Object.assign({}, target)
    newTarget.attrs = Object.assign({}, target.attrs)

    parent && (newTarget.parent = parent)

	newTarget.children = []
    target.children && target.children.forEach(child => {
        newTarget.children.push( BindDataToStr.deepClone(child, newTarget) )
    })

    return newTarget
}

// 把方法的this指向作用域
BindDataToStr.handleEach = function(node, ctx){
    // fn.call(ctx)
	let attrs = node.attrs
	for(let key in node.attrs){
		if(key == 'each'){
            let [name, expression] = attrs[key].split('in').map(item => item.trim())
            // console.log('each:debugger', key, attr.value);
			let __data
			with(ctx){
                __data = eval(expression)
            }

            node.children = new Array(__data.length).fill(node.children[0]).map(function(child, index){
                // clone child 需要深度clone
                child = BindDataToStr.deepClone(child)

                child.ctx = {
                    [name]: __data[index],
                    $index: index
                }

                return child
            })

            // console.log(node);
            break
        }
	}
}
