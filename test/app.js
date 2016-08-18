/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _List = __webpack_require__(1);

	var _List2 = _interopRequireDefault(_List);

	var _Chat = __webpack_require__(2);

	var _Chat2 = _interopRequireDefault(_Chat);

	var _Sidebar = __webpack_require__(5);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	console.log('聊天==============》', _Chat2.default);
	// 一个组件，应该是一个function，在需要他的时候，进行实例化，然后渲染

	// 支持slot，也就是react的props.children
	// import Ent from 'Ent'
	var Header = Ent.createClass({
	    template: '<div><slot></slot></div>'
	});

	var Footer = Ent.createClass({
	    template: '<div>我是底部</div>'
	});

	// 创建一个组件
	var App = Ent.createClass({
	    data: {
	        title: 'Ent组建技术',
	        content: '我是内容',
	        num: 0
	    },
	    // 引入组建
	    components: { Footer: Footer, Sidebar: _Sidebar2.default, List: _List2.default, Chat: _Chat2.default, Header: Header },
	    componentWillMount: function componentWillMount() {
	        console.log('开始构建');
	    },
	    componentDidMount: function componentDidMount() {
	        console.log('组件完成');
	        // 其实store的作用是生命文档格式，data是真正的store
	        var data = this.data;
	    },
	    componentWillUpdate: function componentWillUpdate() {
	        console.log('组件将要更新');
	    },
	    componentDidUpdate: function componentDidUpdate() {
	        console.log('组件更新完毕');
	    },
	    fuck: function fuck(event) {
	        if (event.target == this.refs.comment && event.keyCode != 13) return;
	        this.data.comments.push({
	            content: this.refs.comment.value
	        });
	        this.data.num++;
	    },
	    del: function del(index) {
	        this.data.comments.splice(index, 1);
	    },
	    handleFooterClick: function handleFooterClick(index) {
	        var comment = this.data.comments[index];
	        comment.content += '被电击了';
	        this.data.comments.splice(index, 1, comment);
	    },

	    // 对模板的支持还是太弱了
	    // 三则运算符，if else/forEach,等等，最好的一个状态是{}内包裹的是js语句
	    // react render return前的逻辑操作其实可以前置的，也就是说并不用放在render函数内，并且理论上return的应该是一个比较单纯的字符串？
	    template: '\n        <div>\n            <Header>\n                <div>\n                    <h1>聊天呢</h1>\n                </div>\n            </Header>\n            <div class="main">\n                <Sidebar></Sidebar>\n                <List></List>\n                <Chat></Chat>\n            </div>\n            <Footer xx="xx"></Footer>\n        </div>\n    '
	});

	// 渲染组建
	Ent.render(App, document.querySelector('#app'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	// 联系人组件

	var ListItem = Ent.createClass({
	    data: {
	        num: 0
	    },
	    componentDidMount: function componentDidMount() {
	        console.log('props数据：', this.props);
	    },

	    template: '\n        <div class="list-item">\n            <div class="avatar" style="background-image:url({props.data.avatar})"></div>\n            <div class="info">\n                <p>{props.data.username}</p>\n                <p>{props.data.sum}</p>\n            </div>\n        </div>\n    '
	});

	var List = Ent.createClass({
	    data: {
	        list: [{
	            username: '习近平',
	            id: 1,
	            avatar: 'http://ww2.sinaimg.cn/mw690/006fecvljw1f6u96pi0qsg30by06h4qs.gif',
	            sum: '国家主席习近平'
	        }, {
	            username: '习近平',
	            id: 1,
	            avatar: 'http://ww2.sinaimg.cn/mw690/006fecvljw1f6u96pi0qsg30by06h4qs.gif',
	            sum: '国家主席习近平'
	        }, {
	            username: '习近平',
	            id: 1,
	            avatar: 'http://ww2.sinaimg.cn/mw690/006fecvljw1f6u96pi0qsg30by06h4qs.gif',
	            sum: '国家主席习近平'
	        }]
	    },
	    componentDidMount: function componentDidMount() {
	        console.log('props数据：', this.data.list);
	    },

	    components: { ListItem: ListItem },
	    template: '<div each="user in data.list" id="list">\n        <ListItem index={$index} data={user}></ListItem>\n    </div>'
	});

	exports.default = List;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Dialog = __webpack_require__(3);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _Message = __webpack_require__(4);

	var _Message2 = _interopRequireDefault(_Message);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 聊天组件

	var Chat = Ent.createClass({
	    components: { Dialog: _Dialog2.default, Message: _Message2.default },
	    template: '<div id="chat">\n        <h1 class="center title">胡锦涛</h1>\n        <Dialog></Dialog>\n        <Message></Message>\n    </div>'
	});

	exports.default = Chat;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	// 对话框组件

	var Dialog = Ent.createClass({
	    template: "<div id=\"dialog\">\n        <div>\n            我是聊天历史\n        </div>\n    </div>"
	});

	exports.default = Dialog;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	// 消息发送组件

	var Message = Ent.createClass({
	    template: "<div id=\"message\">\n        <div class=\"tool\">\n            我是工具条/Video/Audio/File/(●'◡'●)\n        </div>\n        <textarea name=\"\" id=\"\" cols=\"30\" rows=\"10\" placeholder=\"写点什么吧。。。\"></textarea>\n        <button>发送</button>\n    </div>"
	});

	exports.default = Message;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	// 对话框组件

	var Sidebar = Ent.createClass({
	    data: {
	        num: 0
	    },
	    add: function add() {
	        this.data.num++;
	    },

	    template: "<div id=\"sidebar\" style=\"color:#fff;\">\n        <p class=\"center\">{this.data.num}</p>\n        <button onClick={this.add.bind(this)}>add</button>\n    </div>"
	});

	exports.default = Sidebar;

/***/ }
/******/ ]);