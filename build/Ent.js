// 提供一些方法
var Ent = (function(){
    return {
        render(Component, props, ele, REPLACE_PLACEHOLDER_ELEMENT){
            // console.log('zujian', component);
            // 去渲染
            // component.init(ele,  props)
            // REPLACE 是否替换指定的占位元素

            if(ele === undefined){
                ele = props
                props = {}
            }
            console.log(props, Component);
            let component = new Component()

            component.init(ele, props, REPLACE_PLACEHOLDER_ELEMENT)

            return component
        }
    }
})();
