// 提供一些方法
var Ent = (function(){
    return {
        render(Component, props, ele, REPLACE_PLACEHOLDER_ELEMENT, ENT_ID_PRE){

            if(ele === undefined){
                ele = props
                props = {}
            }
            let component = new Component()

            component.init(ele, props, REPLACE_PLACEHOLDER_ELEMENT, ENT_ID_PRE)

            return component
        }
    }
})();
