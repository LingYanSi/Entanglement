function LocalUpdate(dom, node, ctx){
    // state更细
    ctx.sub('stateUpdate', function(keyArr, state){
        keyArr.forEach(item => {
            console.log('哪些字段更新了', item);
        })
    })

    // props更新
    ctx.sub('propsUpdate', function(keyArr, props){

    })
}
