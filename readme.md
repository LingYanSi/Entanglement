# Entanglement 简称 Ent
实现数据双向绑定和html模板解析

目前项目在 **[这里](https://github.com/LingYanSi/LingYanSi.github.io/tree/master/Entanglement)** 开发

## 缘由
造一个轮子，放才能能更深入理解

## 进度

特性 | 进度
------------ | -------------
observe | done
parser | done
render | done
diff | 0%

## 使用

### Hello World
```js
var App = Ent.createClass({
    data: {
        title: '标题',
        content: '内容'
    },
    template: `<div>
        <h1>{data.title}</h1>
        <p>{data.content}</p>
    </div>`
})

Ent.render(App, {}, document.querySelector('#app'))
```

### 与react的区别
- 没有render，我的想法是: render做负责单纯的渲染，而不负责逻辑
- react通过setState来触发state变化，Ent则是用Object.defineProperty来对data做处理，返回一个受监听的state，一旦属性发生变化，就会触发一个tick，在所有同步任务结束后，触发render
