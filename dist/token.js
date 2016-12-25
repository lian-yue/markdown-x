(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MarkdownXTest"] = factory();
	else
		root["MarkdownXTest"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _defineProperty2 = __webpack_require__(1);
	
	var _defineProperty3 = _interopRequireDefault(_defineProperty2);
	
	var _typeof2 = __webpack_require__(20);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _assign = __webpack_require__(73);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(77);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(78);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Token$rules;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var NESTING = 16;
	
	var SPACE = " ";
	
	var TAB = "\t";
	
	var NEWLINE = "\n";
	
	var NEWLINE_SPLIT = /(?:\r\n|[\r\n\u2424])/;
	
	var TAG_NAME = /[ \t\r\n\0\x0B\u00a0\/>]/;
	
	var TAG_END = /[ \t\r\n\0\x0B\u00a0>]/;
	
	var DIFF_ADD = 1;
	var DIFF_DELETE = 2;
	var DIFF_REPLACE = 3;
	
	var Token = function () {
	  (0, _createClass3.default)(Token, null, [{
	    key: "getRule",
	    value: function getRule(name) {
	      return this.rules[name];
	    }
	  }, {
	    key: "addRule",
	    value: function addRule(name, option) {
	      this.rules[name] = option;
	      return true;
	    }
	  }, {
	    key: "getAttribute",
	    value: function getAttribute(name) {
	      return this.attributes[name];
	    }
	  }, {
	    key: "addAttribute",
	    value: function addAttribute(name, call) {
	      this.attributes[name] = call;
	      return true;
	    }
	  }, {
	    key: "addVariable",
	    value: function addVariable(name, option) {
	      this.variables[name] = option;
	      return true;
	    }
	  }, {
	    key: "getVariable",
	    value: function getVariable(name) {
	      return this.variables[name];
	    }
	
	    // 全部规则
	
	
	    // 缓存正则
	
	
	    // 全部变量
	
	
	    // 父节点
	
	
	    // 父节点名
	
	
	    // 快
	
	
	    // 黑名单
	
	
	    // 白名单
	
	
	    // 基础父级
	
	
	    // 基础快
	
	
	    // 基础黑名单
	
	  }]);
	
	  function Token(data, options) {
	    (0, _classCallCheck3.default)(this, Token);
	    this.rules = {};
	    this._regexp = {};
	    this.variables = {};
	    this.dataStack = [];
	    this.document = {
	      nodeName: '#document',
	      children: []
	    };
	    this.parentNodeStack = [];
	    this.parentNameStack = [];
	    this.parentNode = this.document;
	    this.blockStack = [];
	    this.block = true;
	    this.blackListStack = [];
	    this.blackList = {};
	    this.whiteListStack = [];
	    this.whiteList = null;
	    this.baseParentNodeStack = [];
	    this.baseBlockStack = [];
	    this.baseBlock = true;
	    this.baseBlackListStack = [];
	    this.baseBlackList = {};
	
	    this.options = (0, _assign2.default)({}, this.constructor.options, options || {});
	    this.parserRules();
	    this.prepare(data);
	    this.parser();
	  }
	
	  (0, _createClass3.default)(Token, [{
	    key: "escapeHtml",
	    value: function escapeHtml(html, encode) {
	      return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	    }
	  }, {
	    key: "unescapeHtml",
	    value: function unescapeHtml(html) {
	      var htmlEscapes = this.constructor.htmlEscapes;
	      return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function (_, n) {
	        n = n.toLowerCase();
	        if (n.charAt(0) === '#') {
	          return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
	        }
	        var id = htmlEscapes[n];
	        if (!id) {
	          return '';
	        }
	        return String.fromCharCode(id);
	        return '';
	      });
	    }
	  }, {
	    key: "escapeId",
	    value: function escapeId(id) {
	      return encodeURI(id.replace(/[#?&.%\s-]+/g, '-').toLowerCase().trim()).replace(/\%/g, '');
	    }
	  }, {
	    key: "parserRules",
	    value: function parserRules() {
	      var name;
	      var rule;
	      var documents = {};
	      var blocks = {};
	      var inlines = {};
	      for (name in this.constructor.rules) {
	        rule = this.constructor.rules[name];
	        if (!rule) {
	          continue;
	        }
	        rule = (0, _assign2.default)({}, rule);
	        rule.name = name;
	        if (rule.html == undefined) {
	          rule.html = name.indexOf('_') == -1 && name.charAt(0) >= 'a' && name.charAt(0) <= 'z';
	        }
	        if (rule.match) {
	          if (typeof rule.match == 'function') {
	            rule.match = rule.match.call(this);
	          }
	          if (!(rule.match instanceof RegExp)) {
	            throw new Error('规则必须是正则');
	          }
	        }
	        this.rules[name] = rule;
	
	        if (!rule.match || rule.black || !rule.prepare) {
	          continue;
	        }
	
	        if (rule.inline) {
	          inlines[name] = rule;
	        }
	
	        if (rule.block) {
	          blocks[name] = rule;
	          documents[name] = rule;
	        }
	
	        if (rule.document) {
	          documents[name] = rule;
	        }
	      }
	
	      // 处理替换 {{}}
	      for (name in this.rules) {
	        rule = this.rules[name];
	        if (rule.match) {
	          rule.match = this.regexp(rule.match);
	        }
	      }
	
	      // 处理优先级
	      documents = this.parserPriority(documents);
	      blocks = this.parserPriority(blocks);
	      inlines = this.parserPriority(inlines);
	
	      // 处理  regexp
	      documents = this.parserPriority(documents);
	      blocks = this.parserPriority(blocks);
	      inlines = this.parserPriority(inlines);
	
	      // 处理 match
	      var blockMatch = '((?:^|{{$newline}}){{$blank}}*?)(?:%s)(?:(?={{$newline}})|$)';
	      var inlineMatch = '((?:^|(?!{{$backslash}}).)(?:{{$backslash}}{2})*)(?:%s)';
	      this.documentMatch = this.parserMatch(documents, blockMatch);
	      this.blockMatch = this.parserMatch(blocks, blockMatch);
	      this.inlineMatch = this.parserMatch(inlines, inlineMatch);
	    }
	  }, {
	    key: "parserMatch",
	    value: function parserMatch(rules, regexp) {
	      var matchs = [];
	      var maps = {};
	      var mapsLength = {};
	      var mapKey = 1;
	      var rule;
	
	      var exec;
	      var search;
	      for (var name in rules) {
	        rule = rules[name];
	        mapKey++;
	        maps[mapKey] = rule;
	
	        matchs.push('(' + rule.match.source.replace(/([^\\](?:\\\\)*)\\(\d+)/g, function (result, before, id) {
	          return before + '\\' + (mapKey + parseInt(id));
	        }) + ')');
	
	        search = rule.match.source;
	        while (exec = /(?:^|[^\\])(?:\\\\)*(\((?!\?)|\[)/.exec(search)) {
	          search = search.substr(exec.index + exec[0].length);
	          if (exec[1] == '[') {
	            exec = /(?:^|[^\\])(?:\\\\)*\]/.exec(search);
	            search = exec ? search.substr(exec.index + exec[0].length) : '';
	          } else {
	            mapKey++;
	          }
	        }
	      }
	      return { regexp: this.regexp(new RegExp(regexp.replace('%s', matchs.join('|')), 'i')), rules: maps };
	    }
	  }, {
	    key: "parserPriority",
	    value: function parserPriority(rules) {
	      var array = [];
	      var rule;
	      for (var name in rules) {
	        rule = rules[name];
	        array.push({
	          name: name,
	          rule: rule
	        });
	      }
	      array.sort(function (a, b) {
	        return (a.rule.priority || 50) - (b.rule.priority || 50);
	      });
	      var results = {};
	      var i;
	      for (i = 0; i < array.length; i++) {
	        results[array[i].name] = array[i].rule;
	      }
	      return results;
	    }
	  }, {
	    key: "regexp",
	    value: function regexp(_regexp) {
	      var _this = this;
	
	      if (!this._regexp[_regexp]) {
	        this._regexp[_regexp] = new RegExp(_regexp.source.replace(/\{\{(.+?)\}\}/g, function (result, name) {
	          if (!_this.rules[name]) {
	            return result;
	          }
	          return _this.regexp(_this.rules[name].match).source;
	        }), _regexp.flags);
	      }
	      return this._regexp[_regexp];
	    }
	  }, {
	    key: "match",
	    value: function match() {
	      var data = this.data;
	      if (!data.after) {
	        return false;
	      }
	      if (data.matchResult == undefined) {} else if (!data.matchResult) {
	        return data.matchResult;
	      } else if (data.matchResult.matchIndex >= data.index) {
	        data.matchResult.index = data.matchResult.matchIndex - data.index;
	        return data.matchResult;
	      }
	
	      data.matchResult = false;
	      var match = data.match;
	      var exec = match.regexp.exec(data.after);
	      if (!exec) {
	        return false;
	      }
	      for (var key in match.rules) {
	        if (exec[key] != undefined) {
	          var rule = match.rules[key];
	          var matchIndex = data.index + exec.index + exec[1].length;
	          data.matchResult = { name: rule.name, rule: rule, matchIndex: matchIndex, index: matchIndex - data.index, match: [] };
	          do {
	            data.matchResult.match.push(exec[key]);
	            key++;
	          } while (!data.match.rules[key] && key < exec.length);
	          return data.matchResult;
	        }
	      }
	      return data.matchResult;
	    }
	  }, {
	    key: "push",
	    value: function push(node, pop) {
	      var option = node.nodeName.charAt(0) == '#' ? false : this.rules[node.nodeName];
	      if (node.nodeHtml && (!option || !option.html || option.black || this.parentNodeStack.length >= NESTING)) {
	        return false;
	      }
	
	      this.parentNode.children.push(node);
	
	      if (node.varName && node.varName.length) {
	        if (node.varName.length == 1) {
	          this.variables[node.varName[0]] = this.variables[node.varName[0]] || [];
	          this.variables[node.varName[0]].push(node);
	        } else {
	          this.variables[node.varName[0]] = this.variables[node.varName[0]] || {};
	          this.variables[node.varName[0]][node.varName[1]] = node;
	        }
	      }
	
	      if (option) {
	        if (node.attributes) {
	          var attributes = node.attributes;
	          node.attributes = {};
	          this.setAttributes(node, attributes);
	        } else {
	          node.attributes = {};
	        }
	
	        if (!option.single) {
	          var parentNode = this.parentNode;
	          // 父级
	          this.parentNodeStack.push(this.parentNode);
	          this.parentNode = node;
	
	          // 父级名称
	          this.parentNameStack.push(this.parentName);
	          this.parentName = node.nodeName;
	
	          // 块标签
	          this.blockStack.push(this.block);
	          if (this.block && (option.blackBlock || option.inline && !option.block)) {
	            this.block = false;
	          }
	
	          // 黑名单
	          this.blackListStack.push(this.blackList);
	          if (option.blackList) {
	            this.blackList = (0, _assign2.default)({}, this.blackList, option.blackList);
	          }
	
	          // 白名单
	          this.whiteListStack.push(this.whiteList);
	          if (option.whiteList) {
	            if (this.whiteList) {
	              var whiteList = this.whiteList;
	              this.whiteList = (0, _assign2.default)({}, option.whiteList);
	              for (var key in this.whiteList) {
	                if (!whiteList[key]) {
	                  delete this.whiteList[key];
	                }
	              }
	            } else {
	              this.whiteList = option.whiteList;
	            }
	          }
	
	          // 基础
	          if (!node.nodeHtml) {
	            // 父级
	            this.baseParentNodeStack.push(this.baseParentNode);
	            this.baseParentNode = node;
	
	            // 快标签
	            this.baseBlockStack.push(this.baseBlock);
	            this.baseBlock = this.block;
	
	            // 黑名单
	            this.baseBlackListStack.push(this.baseBlackList);
	            this.baseBlackList = this.blackList;
	          }
	
	          // 处理子数据
	          var children = node.children;
	          node.children = [];
	          if (children && children.length) {
	            if ((typeof children === "undefined" ? "undefined" : (0, _typeof3.default)(children)) == 'object' && (0, _typeof3.default)(children[0]) == 'object') {
	              for (var i = 0; i < children.length; i++) {
	                this.push(children[i], pop);
	              }
	            } else {
	              this.prepare(children, node.block);
	            }
	          }
	          if (pop && parentNode != this.parentNode) {
	            this.pop();
	          }
	        }
	      }
	
	      return node;
	    }
	  }, {
	    key: "pop",
	    value: function pop(nodeName) {
	      if (nodeName && (nodeName != this.parentName || this.parentNode == this.baseParentNode || this.parentNode == this.data.parentNode)) {
	        return false;
	      }
	
	      // 不能弹出 #document 文档   和 不能弹出当前解析的根目录
	      if (!this.parentName || this.data && this.parentNode == this.data.parentNode) {
	        return false;
	      }
	
	      //  弹出的节点
	      var parentNode = this.parentNode;
	
	      // 父级
	      this.parentNode = this.parentNodeStack.pop();
	
	      // 父级名
	      this.parentName = this.parentNameStack.pop();
	
	      // 快
	      this.block = this.blockStack.pop();
	
	      // 黑名单
	      this.blackList = this.blackListStack.pop();
	
	      // 白名单
	      this.whiteList = this.whiteListStack.pop();
	
	      // 基础
	      if (parentNode == this.baseParentNode) {
	        // 快标签
	        this.baseParentNode = this.baseParentNodeStack.pop();
	
	        // 快标签
	        this.baseBlock = this.baseBlockStack.pop();
	
	        // 黑名单
	        this.baseBlackList = this.baseBlackListStack.pop();
	      }
	      return parentNode;
	    }
	  }, {
	    key: "filter",
	    value: function filter(nodeName) {
	      if (nodeName.charAt(0) == '#') {
	        return true;
	      }
	      var option = this.rules[nodeName] || {};
	
	      // 基础 黑名单
	      if (this.baseBlackList[nodeName]) {
	        return false;
	      }
	
	      // 基础 块标签
	      if (!this.baseBlock && !option.inline) {
	        return false;
	      }
	
	      // 基础 连续嵌套
	      if (option.blackContinuity && nodeName == this.parentName) {
	        return false;
	      }
	
	      // inline 里面不能嵌套 block
	      while (!this.block && !option.inline && this.pop()) {}
	
	      // 不能连续嵌套的
	      if (option.blackContinuity && this.parentName == nodeName && this.pop()) {}
	
	      // 嵌套黑名单
	      while (this.blackList[nodeName] && this.pop()) {}
	      return true;
	    }
	  }, {
	    key: "setAttributes",
	    value: function setAttributes(node, attributes) {
	      var value;
	      for (var name in attributes) {
	        value = attributes[name];
	        if (value === false || value === null || value === undefined) {
	          continue;
	        }
	        if (this.constructor.attributes[name]) {
	          value = this.constructor.attributes[name].call(this, value, node, name);
	        } else if (node.nodeHtml) {
	          continue;
	        }
	        if (value === false || value === null || value === undefined) {
	          continue;
	        }
	        node.attributes[name] = value;
	      }
	    }
	  }, {
	    key: "toText",
	    value: function toText(separator, node) {
	      if (!node) {
	        node = this.parentNode;
	      }
	      var text = [];
	      var child;
	      var result;
	      for (var i = 0; i < node.children.length; i++) {
	        child = node.children[i];
	        if (child.nodeName == '#text') {
	          text.push(child.nodeValue);
	        } else if (child.nodeName == '#document' || child.nodeName.charAt(0) != '#') {
	          result = this.toText(separator, child);
	          if (result) {
	            text.push(result);
	          }
	        }
	      }
	      return text.join(separator || '');
	    }
	  }, {
	    key: "toNode",
	    value: function toNode(node) {
	      var child;
	      var childNode;
	      var Node = node.constructor.createElement ? node.constructor : document;
	      var name;
	      var value;
	
	      // 解析已存在的 key
	      var diffKeys = {};
	      var nodeChildren = {};
	      var markdownx;
	      var attributes;
	      for (var i = 0; i < node.childNodes.length; i++) {
	        childNode = node.childNodes[i];
	        if (!diffKeys[childNode.nodeName]) {
	          diffKeys[childNode.nodeName] = 1;
	        } else {
	          diffKeys[childNode.nodeName]++;
	        }
	
	        if (!childNode._markdownx) {
	          if (childNode.attributes && typeof childNode.attributes.item == 'function') {
	            attributes = {};
	            for (var _i = 0; _i < childNode.attributes.length; _i++) {
	              attributes[childNode.attributes[_i].name] = childNode.attributes[_i].value;
	            }
	          } else {
	            attributes = childNode.attributes;
	          }
	          childNode._markdownx = {
	            nodeName: childNode.nodeName.toLowerCase(),
	            nodeValue: childNode.nodeValue,
	            attributes: attributes
	          };
	        }
	        nodeChildren[childNode._markdownx.nodeName + ',' + diffKeys[childNode.nodeName]] = childNode;
	      }
	
	      //  diff 算法
	      var diffKeys = {};
	      var diffKey;
	      var nodeValue;
	      for (var i = 0; i < this.parentNode.children.length; i++) {
	        child = this.parentNode.children[i];
	        if (!diffKeys[child.nodeName]) {
	          diffKeys[child.nodeName] = 1;
	        } else {
	          diffKeys[child.nodeName]++;
	        }
	        diffKey = child.nodeName + ',' + diffKeys[child.nodeName];
	
	        if (!nodeChildren[diffKey]) {
	          // 创建
	          if (child.nodeName == '#text') {
	            childNode = Node.createTextNode(this.unescapeHtml(child.nodeValue));
	          } else if (child.nodeName == '#comment') {
	            childNode = Node.createComment(child.nodeValue);
	          } else {
	            childNode = Node.createElement(child.nodeName);
	            for (name in child.attributes) {
	              childNode.setAttribute(name, child.attributes[name]);
	            }
	          }
	        } else {
	          childNode = nodeChildren[diffKey];
	
	          // 已处理的数据要删除
	          delete nodeChildren[diffKey];
	
	          // diff 算法
	          if (childNode.nodeName == '#text') {
	            nodeValue = this.unescapeHtml(child.nodeValue);
	            if (nodeValue != childNode.nodeValue) {
	              childNode.nodeValue = nodeValue;
	            }
	          } else if (childNode.nodeName == '#comment') {
	            if (child.nodeValue != childNode.nodeValue) {
	              childNode.nodeValue = nodeValue;
	            }
	          } else {
	            // 删除
	            for (name in childNode._markdownx.attributes) {
	              if (child.attributes[name] == undefined) {
	                childNode.removeAttribute(name);
	              }
	            }
	            // 修改 或者添加
	            for (name in child.attributes) {
	              // 添加
	              value = child.attributes[name];
	              if (value === true) {
	                value = '';
	              }
	              if (childNode._markdownx.attributes[name] != value) {
	                childNode.setAttribute(name, value);
	              }
	            }
	          }
	        }
	
	        // 不相同
	        if (childNode != node.childNodes[i]) {
	          if (node.childNodes[i]) {
	            node.insertBefore(childNode, node.childNodes[i]);
	          } else {
	            node.appendChild(childNode);
	          }
	        }
	
	        // 解析子数据
	        if (child.children && child.children.length && child.nodeName.charAt(0) != '#') {
	          this.parentNodeStack.push(this.parentNode);
	          this.parentNode = child;
	          this.toNode(childNode);
	          this.parentNode = this.parentNodeStack.pop();
	        }
	
	        // 设置 _markdownx
	        childNode._markdownx = child;
	      }
	
	      // 删除未使用的节点
	      for (var key in nodeChildren) {
	        node.removeChild(nodeChildren[key]);
	      }
	
	      return node;
	    }
	  }, {
	    key: "pushData",
	    value: function pushData(after, block) {
	      var lines;
	      if ((typeof after === "undefined" ? "undefined" : (0, _typeof3.default)(after)) == 'object') {
	        lines = after;
	        after = after.join(NEWLINE);
	      } else {
	        lines = after.split(NEWLINE);
	      }
	      var linesLength = [];
	      for (var i = 0; i < lines.length; i++) {
	        linesLength[i] = lines[i].length;
	      }
	
	      var match;
	      if (block) {
	        match = this.blockMatch;
	      } else if (block != undefined) {
	        match = this.inlineMatch;
	      } else if (this.parentName) {
	        var option = this.rules[this.parentName];
	        if (option && !option.blackBlock && !option.inline) {
	          match = this.blockMatch;
	          block = true;
	        } else {
	          block = false;
	          match = this.inlineMatch;
	        }
	      } else {
	        block = true;
	        match = this.documentMatch;
	      }
	
	      var data = {
	        before: '',
	        skip: '',
	        after: after,
	        lines: lines,
	        linesLength: linesLength,
	        index: 0,
	        ch: 0,
	        line: 0,
	        parentNode: this.parentNode,
	        block: block,
	        match: match,
	        htmlText: ''
	      };
	
	      this.dataStack.push(this.data);
	      this.data = data;
	      return data;
	    }
	  }, {
	    key: "popData",
	    value: function popData() {
	      var data = this.data;
	      this.data = this.dataStack.pop();
	      while (this.parentNode != data.parentNode && this.pop()) {}
	      return data;
	    }
	  }, {
	    key: "prepare",
	    value: function prepare(after, block) {
	      if (this.dataStack.length >= NESTING) {
	        return false;
	      }
	      var data = this.pushData(after, block);
	      var match;
	      var value;
	      while (match = this.match()) {
	        data._index = data.index;
	        if (match.index) {
	          this.pushText(data.after.substr(0, match.index), data.block);
	          this.skip(match.index);
	          data._index = data.index;
	        }
	
	        value = match.rule.prepare.call(this, match.match);
	        if (data.index == data._index) {
	          this.skip(match.match[0].length);
	          if (data.block) {
	            this.nextLine();
	          }
	        }
	        if (!value) {} else if (this.filter(value.nodeName)) {
	          this.push(value, true);
	        } else {
	          this.push({ nodeName: '#text', nodeValue: data.before.substr(data._index) });
	        }
	      }
	
	      if (data.after) {
	        this.pushText(data.after, data.block);
	      }
	      this.popData();
	      return this.parentNode;
	    }
	  }, {
	    key: "parser",
	    value: function parser() {
	      var option;
	      var varName;
	      var variables;
	      for (var name in this.variables) {
	        if (!(option = this.constructor.variables[name])) {
	          continue;
	        }
	        variables = this.variables[name];
	        for (varName in variables) {
	          option.call(this, varName, variables[varName]);
	        }
	      }
	    }
	  }, {
	    key: "nextLine",
	    value: function nextLine() {
	      var data = this.data;
	      if (typeof data.linesLength[data.line + 1] != 'number') {
	        if (data.after) {
	          this.skip(data.after.length);
	        }
	        return false;
	      }
	      this.skip(data.linesLength[data.line] + NEWLINE.length - data.ch);
	      return data.line;
	    }
	  }, {
	    key: "getLine",
	    value: function getLine(line) {
	      if (typeof this.data.lines[line] == 'string') {
	        var value = this.data.lines[line];
	        var trim = value.match(this.rules.$trim.match);
	        this.data.lines[line] = {
	          value: value,
	          trimValue: trim[2],
	          ltrimLength: trim[1].length,
	          rtrimLength: trim[3].length,
	          spacelength: trim[1].replace(/\t/g, '    ').length
	        };
	      }
	      return this.data.lines[line];
	    }
	  }, {
	    key: "currentLine",
	    value: function currentLine() {
	      return this.getLine(this.data.line);
	    }
	  }, {
	    key: "skip",
	    value: function skip(index) {
	      var data = this.data;
	      if (index < 0 || data.after.length < index) {
	        return false;
	      }
	
	      if (!index) {
	        return true;
	      }
	      // 索引偏移
	      data.index += index;
	
	      // 跳过的数据
	      data.skip = data.after.substr(0, index);
	
	      // 之前已处理的
	      data.before += data.skip;
	
	      // 之后需要处理的
	      data.after = data.after.substr(index);
	
	      // ch 偏移
	      data.ch += index;
	
	      // 跳过的行数等
	      while (data.ch >= data.linesLength[data.line] + NEWLINE.length) {
	        data.ch -= data.linesLength[data.line] + NEWLINE.length;
	        data.line++;
	      }
	      return true;
	    }
	  }, {
	    key: "pushText",
	    value: function pushText(text, block) {
	      if (block) {
	        text = text.trim();
	        if (!text) {
	          return false;
	        }
	        text = text.split(this.rules.$blocktext.match);
	        for (var i = 0; i < text.length; i++) {
	          this.push({ nodeName: 'p', children: text[i] }, true);
	        }
	        return true;
	      }
	      if (!text || !(text = text.replace(this.rules.$escape_replace.match, '$1'))) {
	        return false;
	      }
	      this.push({ nodeName: '#text', nodeValue: text });
	      return true;
	    }
	  }, {
	    key: "prepareHtmlAttributes",
	    value: function prepareHtmlAttributes() {
	      var data = this.data;
	      var attributes = {};
	      var attributeName;
	      var attributeValue;
	
	      var char;
	      var index;
	      while (char != '>' && (index = data.after.search(/[=>]/)) != -1) {
	        attributeName = data.after.substr(0, index);
	        char = data.after.charAt(index);
	        this.skip(index + 1);
	        if (char == '>') {
	          // 只有参数没有值的
	          index = attributeName.indexOf('/');
	          if (index != -1) {
	            attributeName = attributeName.substr(0, index);
	          }
	          attributeValue = true;
	        } else {
	          attributeValue = '';
	          index = 0;
	          char = '';
	          while (char = data.after.charAt(index)) {
	            ++index;
	            if (char == '>') {
	              break;
	            } else if (char == '"' || char == "'") {
	              this.skip(index);
	              index = data.after.indexOf(char);
	              attributeValue = index == -1 ? data.after : data.after.substr(0, index);
	              this.skip(index == -1 ? data.after.length : index + 1);
	              break;
	            } else if (char = char.trim()) {
	              this.skip(index);
	              index = data.after.search(TAG_END);
	              attributeValue = index == -1 ? data.after : data.after.substr(0, index);
	              this.skip(index == -1 ? data.after.length : index + 1);
	              break;
	            }
	          }
	        }
	        attributeName = attributeName.trim().toLowerCase();
	        if (attributeName) {
	          attributes[attributeName] = attributeValue;
	        }
	      }
	      return attributes;
	    }
	  }, {
	    key: "pushHtmlText",
	    value: function pushHtmlText(text) {
	      this.data.htmlText += text;
	      return true;
	    }
	  }, {
	    key: "saveHtmlText",
	    value: function saveHtmlText() {
	      if (this.data.htmlText) {
	        if (this.data.htmlText.trim()) {
	          this.push({ nodeName: '#text', nodeValue: this.data.htmlText });
	        }
	        this.data.htmlText = '';
	      }
	      return true;
	    }
	  }]);
	  return Token;
	}();
	
	Token.rules = (_Token$rules = {
	  a: { inline: true, blackList: { a: true, button: true, input: true, form: true, textarea: true } },
	  abbr: { inline: true },
	  acronym: { inline: true },
	  address: {},
	  applet: { inline: true, block: true },
	  area: {},
	  article: {},
	  aside: {},
	  audio: { inline: true },
	
	  b: { inline: true },
	  base: { single: true },
	  basefont: { single: true },
	  bdi: { inline: true },
	  bdo: { inline: true },
	  big: { inline: true },
	  blockquote: {},
	  body: {},
	  br: { inline: true, single: true },
	  button: { inline: true, block: true, blackList: { textarea: true, input: true, button: true, select: true, label: true, form: true, fieldset: true, iframe: true } },
	
	  canvas: {},
	  caption: {},
	  center: {},
	  cite: { inline: true },
	  code: { inline: true },
	  col: { single: true },
	  colgroup: {},
	  command: {},
	
	  datalist: {},
	  dd: { blackBlock: true, blackList: { dd: true } },
	  del: { inline: true },
	  details: {},
	  dfn: { inline: true },
	  dir: {},
	  div: {},
	  dl: {},
	  dt: { blackBlock: true, blackList: { dt: true } },
	  dialog: {},
	
	  em: { inline: true },
	  embed: { single: true, blackList: { embed: true } },
	
	  fieldset: {},
	  figcaption: {},
	  figure: {},
	  font: { inline: true },
	  footer: {},
	  form: { blackList: { form: true } },
	  frame: { inline: true, block: true, single: true },
	  frameset: {},
	
	  h1: { blackBlock: true },
	  h2: { blackBlock: true },
	  h3: { blackBlock: true },
	  h4: { blackBlock: true },
	  h5: { blackBlock: true },
	  h6: { blackBlock: true },
	  head: {},
	  header: {},
	  hgroup: {},
	  hr: { single: true },
	  html: {},
	
	  i: { inline: true },
	  iframe: { inline: true, block: true, blackList: { iframe: true } },
	  img: { inline: true, single: true },
	  input: { inline: true, single: true },
	  ins: { inline: true, block: true },
	
	  keygen: { single: true },
	  kbd: { inline: true },
	
	  label: { inline: true, blackList: { label: true } },
	  legend: {},
	  li: { blackContinuity: true },
	  link: { single: true },
	
	  map: { inline: true, block: true },
	  mark: { inline: true },
	  menu: {},
	  menuitem: {},
	  meta: { single: true },
	  meter: { inline: true },
	
	  nav: {},
	  noframes: {},
	  noscript: {},
	
	  object: { inline: true, block: true, blackList: { object: true } },
	  ol: {},
	  optgroup: { inline: true, whiteList: { option: true } },
	  option: { inline: true, whiteList: {} },
	  output: {},
	
	  p: { blackBlock: true },
	  param: { inline: true, block: true, single: true },
	  pre: { blackList: { img: true, object: true, embed: true, big: true, samll: true, sub: true, sup: true, pre: true } },
	  progress: {},
	  polygon: {},
	
	  q: { inline: true },
	
	  rp: { inline: true },
	  rt: { inline: true },
	  ruby: { inline: true },
	
	  s: { inline: true },
	  samp: { inline: true },
	  script: { inline: true, block: true, text: true },
	  select: { inline: true },
	  small: { inline: true },
	  source: { single: true },
	  span: { inline: true },
	  strike: { inline: true },
	  strong: { inline: true },
	  style: { inline: true, block: true, text: true },
	  sub: { inline: true },
	  summary: {},
	  sup: { inline: true },
	  svg: { inline: true },
	
	  table: { blackContinuity: true, inline: true, block: true },
	  tbody: { blackContinuity: true, inline: true, block: true },
	  td: { blackContinuity: true, inline: true, block: true },
	  textarea: { inline: true, block: true, text: true },
	  tfoot: {},
	  th: { blackContinuity: true, inline: true, block: true },
	  thead: { blackContinuity: true, inline: true, block: true },
	  time: { inline: true },
	  title: {},
	  tr: { blackContinuity: true, inline: true, block: true },
	  track: { single: true },
	  tt: { inline: true },
	
	  u: { inline: true },
	  ul: { blackContinuity: true },
	
	  var: { inline: true },
	  video: { inline: true },
	
	  wbr: { inline: true },
	
	  xmp: {}
	
	}, (0, _defineProperty3.default)(_Token$rules, "base", null), (0, _defineProperty3.default)(_Token$rules, "html", null), (0, _defineProperty3.default)(_Token$rules, "meta", null), (0, _defineProperty3.default)(_Token$rules, "link", null), (0, _defineProperty3.default)(_Token$rules, "style", { inline: true, block: true, text: true, black: true }), (0, _defineProperty3.default)(_Token$rules, "script", { inline: true, block: true, text: true, black: true }), (0, _defineProperty3.default)(_Token$rules, "head", null), (0, _defineProperty3.default)(_Token$rules, "body", null), (0, _defineProperty3.default)(_Token$rules, "title", null), (0, _defineProperty3.default)(_Token$rules, "noframes", null), (0, _defineProperty3.default)(_Token$rules, "noscript", null), (0, _defineProperty3.default)(_Token$rules, "frameset", null), (0, _defineProperty3.default)(_Token$rules, "frame", null), (0, _defineProperty3.default)(_Token$rules, "iframe", null), (0, _defineProperty3.default)(_Token$rules, "applet", null), (0, _defineProperty3.default)(_Token$rules, "polygon", null), (0, _defineProperty3.default)(_Token$rules, "svg", null), (0, _defineProperty3.default)(_Token$rules, "dialog", null), (0, _defineProperty3.default)(_Token$rules, "command", null), _Token$rules);
	Token.attributes = {};
	Token.variables = {};
	Token.htmlEscapes = {
	  quot: 34,
	  apos: 39,
	  amp: 38,
	  colon: 58,
	  lt: 60,
	  gt: 62,
	  nbsp: 160,
	  iexcl: 161,
	  cent: 162,
	  pound: 163,
	  curren: 164,
	  yen: 165,
	  brvbar: 166,
	  sect: 167,
	  uml: 168,
	  copy: 169,
	  ordf: 170,
	  laquo: 171,
	  not: 172,
	  shy: 173,
	  reg: 174,
	  macr: 175,
	  deg: 176,
	  plusmn: 177,
	  sup2: 178,
	  sup3: 179,
	  acute: 180,
	  micro: 181,
	  para: 182,
	  middot: 183,
	  cedil: 184,
	  sup1: 185,
	  ordm: 186,
	  raquo: 187,
	  frac14: 188,
	  frac12: 189,
	  frac34: 190,
	  iquest: 191,
	  times: 215,
	  divide: 247
	};
	Token.options = {
	  prefix: '',
	  protocols: ['http', 'https', 'tel', 'mailto'],
	  styles: { 'text-align': true }
	};
	
	
	Token.addRule('$newline', { match: /\n/ });
	Token.addRule('$space', { match: /[ \u00a0]/ });
	Token.addRule('$tab', { match: /(?:    |\t)/ });
	Token.addRule('$blank', { match: /(?:{{$space}}|\t)/ });
	Token.addRule('$trim', { match: /^((?:{{$blank}}|{{$newline}})*)([\s\S]*?)((?:{{$blank}}|{{$newline}})*)$/ });
	Token.addRule('$escape', { match: /[{}\[\]()<>'+\-\\`*:#!_~@$'.]/ });
	Token.addRule('$escape_replace', { match: /{{$backslash}}({{$escape}}|{{$newline}}|$)/g });
	
	Token.addRule('$grave', { match: /`/ });
	Token.addRule('$tilde', { match: /~/ });
	Token.addRule('$gt', { match: />/ });
	Token.addRule('$lt', { match: /</ });
	Token.addRule('$number', { match: /\#/ });
	Token.addRule('$asterisk', { match: /\*/ });
	Token.addRule('$minus', { match: /\-/ });
	Token.addRule('$plus', { match: /\+/ });
	Token.addRule('$equals', { match: /\=/ });
	Token.addRule('$colon', { match: /\:/ });
	Token.addRule('$lowbar', { match: /_/ });
	Token.addRule('$verbar', { match: /\|/ });
	Token.addRule('$doc', { match: /\./ });
	Token.addRule('$backslash', { match: /\\/ });
	Token.addRule('$commat', { match: /\@/ });
	Token.addRule('$dollar', { match: /\$/ });
	Token.addRule('$apos', { match: /'/ });
	Token.addRule('$quot', { match: /"/ });
	Token.addRule('$quote', { match: /(?:{{$quot}}|{{$apos}})/ });
	Token.addRule('$blocktext', { match: /(?:{{$blank}}*?{{$newline}}){2,}/ });
	
	Token.addRule('$escape_backslash', { match: /[\s\S]*?(?!{{$backslash}}).(?:{{$backslash}}{2})*/ });
	
	Token.addRule('$header_id_replace', { match: /<.+?>|{{$escape}}/g });
	Token.addRule('$link_image', { match: /\[((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*)\](?:{{$blank}}|{{$newline}})?(?:\({{$blank}}*{{$lt}}?(.*?){{$gt}}?(?:{{$blank}}+{{$quote}}(.*?){{$quote}})?{{$blank}}*\)|\[([^\^\[\]]*)\])/ });
	
	Token.addRule('md_blockcode', {
	  match: /{{$tab}}{{$blank}}*(?!{{$blank}}.).*|({{$grave}}{3,}|{{$tilde}}{3,}){{$blank}}*(.*)/,
	  block: true,
	  priority: 10,
	  prepare: function prepare(match) {
	    var nodeValue = [];
	    var current;
	    if (match[1]) {
	      while (this.nextLine()) {
	        current = this.currentLine();
	        if (current.trimValue == match[1] && current.spacelength < 4) {
	          this.nextLine();
	          break;
	        }
	        nodeValue.push(current.trimValue ? current.value : '');
	      }
	    } else {
	      do {
	        current = this.currentLine();
	        if (current.trimValue && current.spacelength < 4) {
	          break;
	        }
	        nodeValue.push(current.trimValue ? current.value.substr(current.value.charAt(0) == '\t' ? 1 : current.ltrimLength > 4 ? 4 : current.ltrimLength) : '');
	      } while (this.nextLine());
	      if (nodeValue.length > 1 && !nodeValue[nodeValue.length - 1]) {
	        nodeValue.pop();
	      }
	    }
	    return {
	      nodeName: 'pre',
	      attributes: {
	        class: 'highlight highlight-source-' + (match[2] ? match[2].toLowerCase().replace(/[^0-9a-z_-]/g, '') : '')
	      },
	      children: [{
	        nodeName: 'code',
	        children: [{
	          nodeName: '#text',
	          nodeValue: nodeValue.join(NEWLINE)
	        }]
	      }]
	    };
	  }
	});
	
	Token.addRule('md_blocktag', {
	  match: function match(data) {
	    var option;
	    var names = [];
	    for (var name in this.rules) {
	      option = this.rules[name];
	      if (!option || !option.html || option.inline && !option.block) {
	        continue;
	      }
	      names.push(name);
	    }
	    return new RegExp('<(' + names.join('|') + ')(?:|\\s[\\s\\S]*?)\\/?\s*>.*');
	  },
	
	  block: true,
	  priority: 15,
	  prepare: function prepare() {
	    var data = this.data;
	    var parentNode = this.parentNode;
	    var char;
	    var index;
	    var text;
	    var nodeName;
	    var nodeValue;
	
	    var attributes;
	
	    while ((index = data.after.indexOf('<')) != -1 && (!nodeName || parentNode != this.parentNode || data.after.search(/^.*(<\!--|<\/?[a-zA-Z].*>)/) != -1)) {
	      if (index) {
	        this.pushHtmlText(data.after.substr(0, index));
	      }
	
	      this.skip(index + 1);
	      char = data.after.charAt(0);
	
	      // 最后了
	      if (!char) {
	        this.pushHtmlText('<');
	        continue;
	      }
	
	      // 注释
	      if (char == '!') {
	        if (data.after.substr(0, 3) == '!--') {
	          this.skip(3);
	          index = data.after.indexOf('-->');
	          nodeValue = index == -1 ? data.after : data.after.substr(0, index);
	          this.skip(index == -1 ? data.after.length : index + 3);
	          this.saveHtmlText();
	          this.push({ nodeName: '#comment', nodeValue: nodeValue });
	        } else {
	          this.pushHtmlText('<');
	        }
	        continue;
	      }
	
	      // 结束标签
	      if (char == '/') {
	        index = data.after.indexOf('>');
	        nodeName = index == -1 ? data.after.substr(1) : data.after.substr(1, index - 1);
	        nodeName = nodeName.trim().toLowerCase();
	        if (nodeName) {
	          this.skip(index == -1 ? data.after.length : index + 1);
	
	          this.saveHtmlText();
	          this.pop(nodeName);
	        } else {
	          this.pushHtmlText('<');
	        }
	        continue;
	      }
	
	      // 不是标签
	      if (char < 'a' && char > 'z' && char < 'A' && char > 'Z') {
	        continue;
	      }
	
	      // 没结束
	      index = data.after.search(TAG_NAME);
	      if (index == -1) {
	        break;
	      }
	
	      nodeName = data.after.substr(0, index);
	
	      this.skip(index);
	
	      attributes = this.prepareHtmlAttributes();
	      nodeName = nodeName.trim().toLowerCase();
	
	      this.saveHtmlText();
	      this.push({ nodeName: nodeName, attributes: attributes, nodeHtml: true });
	    }
	
	    var value = this.currentLine().value;
	    if (value.length > data.ch) {
	      this.pushHtmlText(value.substr(data.ch));
	    }
	    this.saveHtmlText();
	    this.nextLine();
	    while (parentNode != this.parentNode) {
	      this.pop();
	    }
	  }
	});
	
	Token.addRule('md_blockquote', {
	  match: /({{$gt}}).*/,
	  block: true,
	  priority: 20,
	  prepare: function prepare(match) {
	    var children = [];
	    var current;
	    var empty;
	    do {
	      current = this.currentLine();
	      if (!current.trimValue) {
	        if (empty) {
	          break;
	        }
	        empty = true;
	        children.push(current.trimValue);
	      } else {
	        if (empty && (current.spacelength >= 4 || current.trimValue.charAt(0) != match[1])) {
	          break;
	        }
	        if (current.spacelength < 4) {
	          children.push(this.rules.$gt.match.test(current.trimValue[0]) ? current.trimValue.substr(1) : current.trimValue);
	        } else {
	          children.push(current.value);
	        }
	      }
	    } while (this.nextLine());
	    return {
	      nodeName: 'blockquote',
	      children: children
	    };
	  }
	});
	
	Token.addRule('md_header', {
	  match: /({{$number}}{1,6}){{$blank}}*(.*?)\#*|((?!{{$blank}})..*){{$newline}}{{$blank}}*({{$equals}}|{{$minus}}){{$blank}}?(?:\4{{$blank}}?)*/,
	  block: true,
	  priority: 25,
	  prepare: function prepare(match) {
	    if (match[1]) {
	      this.nextLine();
	      return {
	        nodeName: 'h' + match[1].length,
	        attributes: { id: this.escapeId(this.options.prefix + 'header-' + match[2].replace(this.rules.$header_id_replace.match, '')) },
	        children: match[2]
	      };
	    } else {
	      this.nextLine();
	      this.nextLine();
	      return {
	        nodeName: this.rules.$equals.match.test(match[4]) ? 'h1' : 'h2',
	        attributes: { id: this.options.prefix + 'header-' + this.escapeId(match[3].replace(this.rules.$header_id_replace.match, '')) },
	        children: match[3]
	      };
	    }
	  }
	});
	
	Token.addRule('md_list', {
	  match: /(?:({{$asterisk}}|{{$plus}}|{{$minus}})|(\d+{{$doc}})){{$blank}}(?:{{$blank}}?\[({{$space}}|x)\])?(.*)/,
	  block: true,
	  priority: 30,
	  prepare: function prepare(match) {
	    var list = [];
	    var li = [match[4]];
	    var checkboxs = [match[3]];
	
	    var current;
	    var empty;
	    var match2;
	    var tab = true;
	    var blocktexts = [];
	
	    while (this.nextLine()) {
	      current = this.currentLine();
	      if (!current.trimValue) {
	        if (empty && !tab) {
	          break;
	        }
	        // 空行
	        li.push('');
	      } else if (li.length && current.spacelength > 1) {
	        // 行跳格大于 1
	        li.push(current.value.substr(current.value.charAt(0) == '\t' ? 1 : current.value.charAt(1) == '\t' ? 2 : current.ltrimLength > 4 ? 4 : current.ltrimLength));
	      } else {
	        match2 = this.match();
	        if (!match2 || match2.index > current.value.length) {
	          if (empty && !tab) {
	            break;
	          }
	          li.push(current.value);
	        } else if (match2.name == 'md_list' && match2.match[1] == match[1] && Boolean(match2.match[2]) == Boolean(match[2])) {
	          if (li.length > 1 && li.indexOf('') != -1) {
	            blocktexts.push(true);
	          } else {
	            blocktexts.push(false);
	          }
	          if (li.length > 1 && !li[li.length - 1]) {
	            li.pop();
	          }
	          list.push(li);
	          li = [match2.match[4]];
	          checkboxs.push(match2.match[3]);
	        } else {
	          break;
	        }
	      }
	
	      empty = !current.trimValue;
	      tab = li.length != 1 && (current.spacelength > 1 || !current.trimValue && tab);
	    }
	
	    if (li.length > 1 && !li[li.length - 1]) {
	      li.pop();
	    }
	
	    list.push(li);
	    blocktexts.push(blocktexts.length ? blocktexts[blocktexts.length - 1] : false);
	
	    var children = [];
	    for (var i = 0; i < list.length; i++) {
	      children.push({
	        nodeName: 'li',
	        children: list[i]
	      });
	    }
	
	    var node = {
	      nodeName: match[2] ? 'ol' : 'ul',
	      children: children
	    };
	    this.push(node, true);
	
	    var liNode;
	    var pNode;
	    var checkbox;
	    var checkboxNode;
	    for (var i = 0; i < node.children.length; i++) {
	      liNode = node.children[i];
	      if (!blocktexts[i] && (pNode = liNode.children[0]) && pNode.nodeName == 'p') {
	        // 删除第一个
	        liNode.children.splice(0, 1);
	
	        // 合并
	        liNode.children = pNode.children.concat(liNode.children);
	      }
	
	      checkbox = checkboxs[i];
	      if (checkbox) {
	        this.setAttributes(liNode, { class: 'task-list-item' });
	        if (!node.attributes.class) {
	          this.setAttributes(node, { class: 'task-list' });
	        }
	
	        checkboxNode = {
	          nodeName: 'input',
	          attributes: {},
	          children: []
	        };
	        this.setAttributes(checkboxNode, {
	          type: 'checkbox',
	          class: 'task-list-item-checkbox',
	          disabled: true,
	          checked: checkbox.toLowerCase() == 'x'
	        });
	        if (!liNode.children.length || liNode.children[0].nodeName != 'p') {
	          liNode.children.splice(0, 0, checkboxNode);
	        } else {
	          liNode.children[0].children.splice(0, 0, checkboxNode);
	        }
	      }
	    }
	  }
	});
	
	Token.addRule('md_table', {
	  match: /((?:.*?({{$verbar}}))+.*?){{$newline}}({{$blank}}*\2?(?:(?:{{$blank}}*(?:{{$colon}}|{{$minus}}){{$blank}}*)+\2)+(?:{{$blank}}*(?:{{$colon}}|{{$minus}}))+{{$blank}}*\2?){{$blank}}*((?:{{$newline}}(?:.*\2)+.*)+)/,
	  block: true,
	  priority: 35,
	  prepare: function prepare(match) {
	    var _this2 = this;
	
	    var data;
	    var index;
	    var char;
	    var text = '';
	    var regexp = this.regexp(/({{$backslash}}|{{$verbar}})/);
	
	    // 表头
	    var thead = [];
	    data = match[1];
	    while ((index = data.search(regexp)) != -1) {
	      char = data.charAt(index);
	      if (char == '\\') {
	        text += data.substr(0, index + 2);
	        data = data.substr(index + 2);
	        continue;
	      }
	      text += data.substr(0, index);
	      data = data.substr(index + 1);
	      thead.push(text ? text.match(this.rules.$trim.match)[2] : text);
	      text = '';
	    }
	    text += data;
	    thead.push(text ? text.match(this.rules.$trim.match)[2] : text);
	    if (thead.length > 1 && !thead[0]) {
	      thead.shift();
	    }
	    if (thead.length > 1 && !thead[thead.length - 1]) {
	      thead.pop();
	    }
	
	    // 位置
	    var align = match[3].split(match[2]).map(function (value) {
	      return value.match(_this2.rules.$trim.match)[2];
	    });
	    if (align.length > 1 && !align[0]) {
	      align.shift();
	    }
	    if (align.length > 1 && !align[align.length - 1]) {
	      align.pop();
	    }
	    align = align.map(function (value) {
	      if (!value) {
	        return '';
	      }
	      var left = value.charAt(0) == ':';
	      var right = value.charAt(value.length - 1) == ':';
	      if (right && left) {
	        return 'center';
	      }
	      if (left) {
	        return 'left';
	      }
	      if (right) {
	        return 'right';
	      }
	      return '';
	    });
	
	    // 表内容
	    // 表内容
	    var tbody = [];
	    var tr = [];
	    var datas = match[4].split(NEWLINE);
	    for (var i = 0; i < datas.length; i++) {
	      data = datas[i];
	      tr = [];
	      text = '';
	      while ((index = data.search(regexp)) != -1) {
	        char = data.charAt(index);
	        if (char == '\\') {
	          text += data.substr(0, index + 2);
	          data = data.substr(index + 2);
	          continue;
	        }
	        text += data.substr(0, index);
	        data = data.substr(index + 1);
	        tr.push(text ? text.match(this.rules.$trim.match)[2] : text);
	        text = '';
	      }
	      text += data;
	      if (text) {
	        text = text.match(this.rules.$trim.match)[2];
	      }
	      if (!text && !tr.length) {
	        continue;
	      }
	      tr.push(text ? text.match(this.rules.$trim.match)[2] : text);
	      if (tr.length > thead.length && !tr[0]) {
	        tr.shift();
	      }
	      if (tr.length > thead.length && !tr[tr.length - 1]) {
	        tr.pop();
	      }
	      tbody.push(tr);
	    }
	
	    for (var i = 0; i < thead.length; i++) {
	      thead[i] = {
	        nodeName: 'th',
	        block: false,
	        attributes: align[i] ? { style: 'text-align:' + align[i] } : null,
	        children: thead[i]
	      };
	    }
	
	    var tr;
	    var col;
	    for (var row = 0; row < tbody.length; row++) {
	      tr = [];
	      for (col = 0; col < thead.length; col++) {
	        tr[col] = {
	          nodeName: 'td',
	          block: false,
	          attributes: align[col] ? { style: 'text-align:' + align[col] } : null,
	          children: tbody[row][col]
	        };
	      }
	      tbody[row] = { nodeName: 'tr', children: tr };
	    }
	
	    return {
	      nodeName: 'table',
	      children: [{
	        nodeName: 'thead',
	        children: [{
	          nodeName: 'tr',
	          children: thead
	        }]
	      }, {
	        nodeName: 'tbody',
	        children: tbody
	      }]
	    };
	  }
	});
	
	Token.addRule('md_hr', {
	  match: /({{$asterisk}}|{{$minus}}|{{$lowbar}}){{$blank}}?(?:\1{{$blank}}?){2,}/,
	  block: true,
	  priority: 40,
	  prepare: function prepare() {
	    return { nodeName: 'hr' };
	  }
	});
	
	Token.addRule('md_toc', {
	  match: /\[TOC\]/,
	  document: true,
	  priority: 17,
	  prepare: function prepare() {
	    return {
	      nodeName: 'ul',
	      varName: ['toc'],
	      attributes: { class: 'toc' }
	    };
	  }
	});
	
	Token.addRule('md_footnote', {
	  match: /\[\^([^\[\]]+)\]{{$blank}}*{{$colon}}{{$blank}}*(.*)/,
	  document: true,
	  priority: 22,
	  prepare: function prepare(match) {
	    var children = [match[2]];
	    var current;
	    var match2;
	
	    while (this.nextLine()) {
	      current = this.currentLine();
	      if (!current.trimValue) {
	        this.nextLine();
	        break;
	      } else if (current.spacelength > 1) {
	        children.push(current.value.substr(current.value.charAt(0) == '\t' ? 1 : current.value.charAt(1) == '\t' ? 2 : current.ltrimLength > 4 ? 4 : current.ltrimLength));
	      } else if (!(match2 = this.match()) || match2.index > current.value.length) {
	        children.push(current.value);
	      } else {
	        break;
	      }
	    }
	    var id = this.escapeId(match[1]);
	
	    this.refnoteId = this.refnoteId || 0;
	    this.refnoteId++;
	
	    var node = {
	      nodeName: 'li',
	      block: false,
	      refnoteId: this.refnoteId,
	      varName: ['footnote', match[1].toLowerCase()],
	      attributes: {
	        class: 'footnote',
	        id: this.options.prefix + 'footnote-' + id,
	        style: 'display:none'
	      },
	      children: children
	    };
	    this.push(node, true);
	    node.children.push({
	      nodeName: 'a',
	      attributes: {
	        href: '#' + this.options.prefix + 'refnote-' + id,
	        title: this.options.toRefnote || 'Return to article'
	      },
	      children: [{
	        nodeName: '#text',
	        nodeValue: '↩'
	      }]
	    });
	  }
	});
	
	Token.addRule('md_reflink', {
	  match: /\[([^\^\[\]]+)\]{{$blank}}*{{$colon}}{{$blank}}*{{$lt}}?((?!{{$blank}})..*?){{$gt}}?(?:{{$newline}}?{{$blank}}*(?:{{$lt}}|{{$quote}})(.*)(?:{{$gt}}|{{$quote}}))?/,
	  document: true,
	  priority: 27,
	  prepare: function prepare(match) {
	    if (!this.variables.reflink) {
	      this.variables.reflink = {};
	    }
	    this.variables.reflink[match[1].toLowerCase()] = { uri: match[2], title: match[3] };
	  }
	});
	
	Token.addRule('md_tag', {
	  match: function match(data) {
	    var option;
	    var names = [];
	    for (var name in this.rules) {
	      option = this.rules[name];
	      if (!option || !option.html || !option.inline || option.block) {
	        continue;
	      }
	      names.push(name);
	    }
	    return new RegExp('<(\\/?)(' + names.join('|') + ')(?:|\\s[\\s\\S]*?)\\/?\s*>');
	  },
	
	  inline: true,
	  priority: 7,
	  prepare: function prepare(match) {
	    var nodeName = match[2].toLowerCase();
	    if (match[1]) {
	      this.pop(nodeName);
	      this.skip(match[0].length);
	      return;
	    }
	    this.skip(nodeName.length + 1);
	    var attributes = this.prepareHtmlAttributes();
	    this.push({ nodeName: nodeName, attributes: attributes, nodeHtml: true });
	  }
	});
	
	Token.addRule('md_comment', {
	  match: /<\!--([\s\S]*?)-->/,
	  block: true,
	  inline: true,
	  priority: 15,
	  prepare: function prepare(match) {
	    return { nodeName: '#comment', nodeValue: match[1] };
	  }
	});
	
	Token.addRule('md_code', {
	  match: /(({{$grave}})+)([\s\S]*?(?!\2)[\s\S])\1(?!\2)/,
	  inline: true,
	  priority: 20,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'code',
	      children: [{
	        nodeName: '#text',
	        nodeValue: this.escapeHtml(match[3], true)
	      }]
	    };
	  }
	});
	
	Token.addRule('md_strong', {
	  match: /(({{$lowbar}}|{{$asterisk}}){2})({{$escape_backslash}})\1(?!\2)/,
	  inline: true,
	  priority: 25,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'strong',
	      children: match[3]
	    };
	  }
	});
	
	Token.addRule('md_em', {
	  match: /({{$lowbar}}|{{$asterisk}})({{$escape_backslash}})\1(?!\1)/,
	  inline: true,
	  priority: 30,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'em',
	      children: match[2]
	    };
	  }
	});
	
	Token.addRule('md_del', {
	  match: /(({{$tilde}}){2})({{$escape_backslash}})\1(?!\2)/,
	  inline: true,
	  priority: 35,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'del',
	      children: match[3]
	    };
	  }
	});
	
	Token.addRule('md_image', {
	  match: /\!{{$link_image}}/,
	  inline: true,
	  priority: 45,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'img',
	      nodeValue: match[0],
	      varName: typeof match[4] == 'string' ? ['image', match[4].toLowerCase()] : null,
	      attributes: {
	        alt: match[1],
	        src: match[2],
	        title: match[3]
	      }
	    };
	  }
	});
	
	Token.addRule('md_link', {
	  match: /{{$link_image}}/,
	  inline: true,
	  priority: 50,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'a',
	      nodeValue: match[0],
	      varName: typeof match[4] == 'string' ? ['link', match[4].toLowerCase()] : null,
	      attributes: {
	        href: match[2],
	        title: match[3]
	      },
	      children: match[1]
	    };
	  }
	});
	
	Token.addRule('md_autolink', {
	  match: /<([^ >]+?(:|@|\/)[^ >]+)>/,
	  inline: true,
	  priority: 55,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'a',
	      attributes: {
	        href: match[2] == '@' ? 'mailto:' + match[1] : match[1]
	      },
	      children: [{
	        nodeName: '#text',
	        nodeValue: match[1]
	      }]
	    };
	  }
	});
	
	Token.addRule('md_url', {
	  match: /https?:\/\/(?:[0-9a-zA-Z_-]+\.)*[a-zA-Z]+(?:[?\/]([^\s<>,:;"'{}()\[\]])*)?/,
	  inline: true,
	  priority: 60,
	  prepare: function prepare(match) {
	    return {
	      nodeName: 'a',
	      attributes: {
	        href: match[0]
	      },
	      children: [{
	        nodeName: '#text',
	        nodeValue: match[0]
	      }]
	    };
	  }
	});
	
	Token.addRule('md_refnote', {
	  match: /\[\^([^\[\]]*)\]/,
	  inline: true,
	  priority: 65,
	  prepare: function prepare(match) {
	    var id = this.escapeId(match[1]);
	    return {
	      nodeName: 'a',
	      nodeValue: match[0],
	      varName: ['refnote', match[1].toLowerCase()],
	      attributes: {
	        class: 'refnote',
	        id: this.options.prefix + 'refnote-' + id,
	        href: '#' + this.options.prefix + 'footnote-' + id,
	        title: this.options.toFootnote || 'See footnote'
	      },
	      children: [{
	        nodeName: '#text',
	        nodeValue: match[1]
	      }]
	    };
	  }
	});
	
	Token.addRule('md_br', {
	  match: /{{$newline}}/,
	  inline: true,
	  priority: 70,
	  prepare: function prepare() {
	    return {
	      nodeName: 'br'
	    };
	  }
	});
	
	Token.addVariable('image', function (varName, node) {
	  if (!this.variables.reflink || !this.variables.reflink[varName]) {
	    node.nodeName = '#text';
	    return;
	  }
	  var reflink = this.variables.reflink[varName];
	  this.setAttributes(node, {
	    src: reflink.uri,
	    title: reflink.title
	  });
	});
	
	Token.addVariable('link', function (varName, node) {
	  if (!this.variables.reflink || !this.variables.reflink[varName]) {
	    node.nodeName = '#text';
	    return;
	  }
	  var reflink = this.variables.reflink[varName];
	  this.setAttributes(node, {
	    href: reflink.uri,
	    title: reflink.title
	  });
	});
	
	Token.addVariable('refnote', function (varName, node) {
	  if (!this.variables.footnote || !this.variables.footnote[varName]) {
	    node.nodeName = '#text';
	    return;
	  }
	  node.children = [{
	    nodeName: '#text',
	    nodeValue: '[' + this.variables.footnote[varName].refnoteId + ']'
	  }];
	});
	
	Token.addVariable('footnote', function (varName, node) {
	  this.document.children.splice(this.document.children.indexOf(node), 1);
	
	  if (!this.footnoteNode) {
	    this.footnoteNode = {
	      nodeName: 'ol',
	      attributes: {},
	      children: []
	    };
	    this.setAttributes(this.footnoteNode, { class: 'footnotes' });
	    this.document.children.push(this.footnoteNode);
	  }
	
	  this.footnoteNode.children.push(node);
	});
	
	Token.addVariable('toc', function (varName, node) {
	  var ulStack = [];
	  var ul = node;
	  var ul2;
	  var a;
	  var child;
	  var level;
	  var level2;
	  var index;
	  for (var i = 0; i < this.document.children.length; i++) {
	    child = this.document.children[i];
	    if (child.nodeHtml || (level2 = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(child.nodeName)) == -1 || !child.attributes.id) {
	      continue;
	    }
	    level2++;
	    if (level) {
	      if (level2 > level) {
	        ul2 = {
	          nodeName: 'ul',
	          attributes: {},
	          children: []
	        };
	        ulStack.push(ul);
	        ul.children[ul.children.length - 1].children.push(ul2);
	        ul = ul2;
	      } else if (level2 < level && ul != node) {
	        while (level2 < level && ul != node) {
	          level--;
	          ul = ulStack.pop();
	        }
	      }
	    }
	    level = level2;
	    a = {
	      nodeName: 'a',
	      attributes: {},
	      children: [{
	        nodeName: '#text',
	        nodeValue: this.toText('', child)
	      }]
	    };
	    this.setAttributes(a, { href: '#' + child.attributes.id });
	
	    ul.children.push({
	      nodeName: 'li',
	      attributes: {},
	      children: [a]
	    });
	  }
	});
	
	Token.addAttribute('href', function (value) {
	  value = String(value);
	  try {
	    var prot = decodeURIComponent(this.unescapeHtml(value)).replace(/[^\w:]/g, '').toLowerCase();
	  } catch (e) {
	    return false;
	  }
	  var match = prot.match(/^(\w+)\:/);
	  if (match && this.options.protocols.indexOf(match[1]) == -1) {
	    return false;
	  }
	  return value;
	});
	
	Token.addAttribute('src', function (value) {
	  value = String(value);
	  try {
	    var prot = decodeURIComponent(this.unescapeHtml(value)).replace(/[^\w:]/g, '').toLowerCase();
	  } catch (e) {
	    return false;
	  }
	  var match = prot.match(/^(\w+)\:/);
	  if (match && this.options.protocols.indexOf(match[1]) == -1) {
	    return false;
	  }
	  return value;
	});
	
	Token.addAttribute('title', function (value) {
	  return value;
	});
	
	Token.addAttribute('alt', function (value) {
	  return value;
	});
	
	Token.addAttribute('style', function (value, nodeHtml) {
	  if (!nodeHtml) {
	    return value;
	  }
	  var results = [];
	  var styles = String(value).split(';');
	  var style;
	  var name;
	  var value;
	  var index;
	  for (var i = 0; i < styles.length; i++) {
	    style = styles[i];
	    index = style.indexOf(';');
	    if (index == -1) {
	      continue;
	    }
	    name = style.substr(0, index).toLowerCase().trim();
	    if (!this.options.styles[name]) {
	      continue;
	    }
	    value = style.substr(index + 1).toLowerCase().trim();
	    if (value && !/^[^\(\)\[\]'"\:&;\\]$/.test(decodeURIComponent(this.unescapeHtml(value)))) {
	      continue;
	    }
	    results.push(name + ':' + value);
	  }
	  return results.join(';');
	});
	
	module.exports = Token;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(2);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }
	
	  return obj;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(3), __esModule: true };

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	var $Object = __webpack_require__(7).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(5);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(15), 'Object', {defineProperty: __webpack_require__(11).f});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(6)
	  , core      = __webpack_require__(7)
	  , ctx       = __webpack_require__(8)
	  , hide      = __webpack_require__(10)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 6 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(9);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(11)
	  , createDesc = __webpack_require__(19);
	module.exports = __webpack_require__(15) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(12)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , toPrimitive    = __webpack_require__(18)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(15) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(15) && !__webpack_require__(16)(function(){
	  return Object.defineProperty(__webpack_require__(17)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(16)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(13)
	  , document = __webpack_require__(6).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(13);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(21);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(57);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(22), __esModule: true };

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23);
	__webpack_require__(52);
	module.exports = __webpack_require__(56).f('iterator');

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(24)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(27)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25)
	  , defined   = __webpack_require__(26);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(28)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(29)
	  , hide           = __webpack_require__(10)
	  , has            = __webpack_require__(30)
	  , Iterators      = __webpack_require__(31)
	  , $iterCreate    = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(48)
	  , getPrototypeOf = __webpack_require__(50)
	  , ITERATOR       = __webpack_require__(49)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 28 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(10);

/***/ },
/* 30 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(33)
	  , descriptor     = __webpack_require__(19)
	  , setToStringTag = __webpack_require__(48)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(10)(IteratorPrototype, __webpack_require__(49)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(12)
	  , dPs         = __webpack_require__(34)
	  , enumBugKeys = __webpack_require__(46)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(17)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(47).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(11)
	  , anObject = __webpack_require__(12)
	  , getKeys  = __webpack_require__(35);
	
	module.exports = __webpack_require__(15) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(36)
	  , enumBugKeys = __webpack_require__(46);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(30)
	  , toIObject    = __webpack_require__(37)
	  , arrayIndexOf = __webpack_require__(40)(false)
	  , IE_PROTO     = __webpack_require__(43)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(38)
	  , defined = __webpack_require__(26);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(39);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(37)
	  , toLength  = __webpack_require__(41)
	  , toIndex   = __webpack_require__(42);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(25)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(25)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(44)('keys')
	  , uid    = __webpack_require__(45);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(6)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 46 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(6).document && document.documentElement;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(11).f
	  , has = __webpack_require__(30)
	  , TAG = __webpack_require__(49)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(44)('wks')
	  , uid        = __webpack_require__(45)
	  , Symbol     = __webpack_require__(6).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(30)
	  , toObject    = __webpack_require__(51)
	  , IE_PROTO    = __webpack_require__(43)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(26);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(53);
	var global        = __webpack_require__(6)
	  , hide          = __webpack_require__(10)
	  , Iterators     = __webpack_require__(31)
	  , TO_STRING_TAG = __webpack_require__(49)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(54)
	  , step             = __webpack_require__(55)
	  , Iterators        = __webpack_require__(31)
	  , toIObject        = __webpack_require__(37);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(27)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(49);

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(58), __esModule: true };

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(59);
	__webpack_require__(70);
	__webpack_require__(71);
	__webpack_require__(72);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(6)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(15)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(29)
	  , META           = __webpack_require__(60).KEY
	  , $fails         = __webpack_require__(16)
	  , shared         = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(48)
	  , uid            = __webpack_require__(45)
	  , wks            = __webpack_require__(49)
	  , wksExt         = __webpack_require__(56)
	  , wksDefine      = __webpack_require__(61)
	  , keyOf          = __webpack_require__(62)
	  , enumKeys       = __webpack_require__(63)
	  , isArray        = __webpack_require__(66)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(18)
	  , createDesc     = __webpack_require__(19)
	  , _create        = __webpack_require__(33)
	  , gOPNExt        = __webpack_require__(67)
	  , $GOPD          = __webpack_require__(69)
	  , $DP            = __webpack_require__(11)
	  , $keys          = __webpack_require__(35)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(68).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(65).f  = $propertyIsEnumerable;
	  __webpack_require__(64).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(28)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(10)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(45)('meta')
	  , isObject = __webpack_require__(13)
	  , has      = __webpack_require__(30)
	  , setDesc  = __webpack_require__(11).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(16)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(6)
	  , core           = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(28)
	  , wksExt         = __webpack_require__(56)
	  , defineProperty = __webpack_require__(11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(35)
	  , toIObject = __webpack_require__(37);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(35)
	  , gOPS    = __webpack_require__(64)
	  , pIE     = __webpack_require__(65);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 64 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 65 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(37)
	  , gOPN      = __webpack_require__(68).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(36)
	  , hiddenKeys = __webpack_require__(46).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(65)
	  , createDesc     = __webpack_require__(19)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(18)
	  , has            = __webpack_require__(30)
	  , IE8_DOM_DEFINE = __webpack_require__(14)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(15) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 70 */
/***/ function(module, exports) {



/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61)('asyncIterator');

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(61)('observable');

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(76)});

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(35)
	  , gOPS     = __webpack_require__(64)
	  , pIE      = __webpack_require__(65)
	  , toObject = __webpack_require__(51)
	  , IObject  = __webpack_require__(38)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(16)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 77 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(2);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=token.js.map