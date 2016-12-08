(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["MarkdownX"] = factory();
	else
		root["MarkdownX"] = factory();
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
	
	var _toConsumableArray2 = __webpack_require__(20);
	
	var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
	
	var _typeof2 = __webpack_require__(59);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	var _assign = __webpack_require__(83);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(87);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(88);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _Node$tags;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Node = function () {
	  (0, _createClass3.default)(Node, null, [{
	    key: "escapeHtml",
	    value: function escapeHtml(html, encode) {
	      return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	    }
	  }, {
	    key: "unescapeHtml",
	    value: function unescapeHtml(html) {
	      return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function (_, n) {
	        n = n.toLowerCase();
	        if (n === 'colon') return ':';
	        if (n.charAt(0) === '#') {
	          return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
	        }
	        return '';
	      });
	    }
	  }, {
	    key: "escapeMarkdown",
	    value: function escapeMarkdown(text) {
	      return text.replace(this._rules.escapeCharAll.match, '\\$1');
	    }
	  }, {
	    key: "unescapeMarkdown",
	    value: function unescapeMarkdown(html) {
	      return text.replace(this._rules.escapeCharAll.match, '$1');
	    }
	  }, {
	    key: "escapeId",
	    value: function escapeId(id) {
	      return encodeURI(id.replace(/([#?&.]|\s)+/g, '-').toLowerCase().trim()).replace(/\%/g, '');
	    }
	  }, {
	    key: "getRule",
	    value: function getRule(name) {
	      return this.rules[name];
	    }
	  }, {
	    key: "addRule",
	    value: function addRule(name, option) {
	      delete this._rules;
	      this.rules[name] = option;
	      return true;
	    }
	  }, {
	    key: "getTag",
	    value: function getTag(name) {
	      return this.tags[name];
	    }
	  }, {
	    key: "addTag",
	    value: function addTag(name, options) {
	      this.tags[name] = options;
	      return true;
	    }
	  }, {
	    key: "getTagAttribute",
	    value: function getTagAttribute(name) {
	      return this.tagAttributes[name];
	    }
	  }, {
	    key: "addTagAttribute",
	    value: function addTagAttribute(name, call) {
	      this.tagAttributes[name] = call;
	      return true;
	    }
	  }, {
	    key: "nestingLevel",
	    value: function nestingLevel(level) {
	      if (!level || level <= 0) {
	        return '';
	      }
	      return this.TAB.repeat(level);
	    }
	  }, {
	    key: "parserRules",
	    value: function parserRules() {
	      var _this = this;
	
	      var rules = {};
	      var blockRules = {};
	      var inlineRules = {};
	
	      var name = void 0;
	
	      var rule = void 0;
	
	      var _loop = function _loop() {
	        rule = (0, _assign2.default)(_this.rules[name]);
	        var match = rule.match;
	        if (!match) {} else if (typeof match == 'function') {
	          rule.match = { exec: match };
	        } else if (match instanceof Array) {
	          rule.match = {
	            exec: function exec(data) {
	              var i;
	              for (i = 0; i < match.length; i++) {
	                if (data.substr(0, match[i].length) == match[i]) {
	                  return match[i];
	                }
	              }
	              return false;
	            }
	          };
	        } else if (!(match instanceof RegExp)) {
	          rule.match = {
	            exec: function exec(data) {
	              return data.substr(0, match.length) == match;
	            }
	          };
	        }
	
	        rules[name] = rule;
	        if (!match || rule.black) {} else if (rule.block) {
	          blockRules[name] = rule;
	        } else if (rule.block === false) {
	          inlineRules[name] = rule;
	        }
	      };
	
	      for (name in this.rules) {
	        _loop();
	      }
	
	      var priority = function priority(rules) {
	        var array = [];
	        var rule;
	        for (var _name in rules) {
	          rule = rules[_name];
	          array.push({
	            name: _name,
	            rule: rule
	          });
	        }
	        array.sort(function (a, b) {
	          return (a.rule.priority || 10) - (b.rule.priority || 10);
	        });
	        var results = {};
	        var i;
	        for (i = 0; i < array.length; i++) {
	          results[array[i].name] = array[i].rule;
	        }
	        return results;
	      };
	
	      this._rules = rules;
	      this._blockRules = priority(blockRules);
	      this._inlineRules = priority(inlineRules);
	
	      var replace = function replace(regexp) {
	        return new RegExp(regexp.source.replace(/\{\{(\w+)\}\}/g, function (result, name) {
	          if (!rules[name] || !(rules[name].match instanceof RegExp)) {
	            return result;
	          }
	          return rules[name].match.source;
	        }, regexp.flags));
	      };
	      for (name in rules) {
	        rule = rules[name];
	        if (!(rule.match instanceof RegExp)) {
	          rule.regexp = false;
	          continue;
	        }
	        rule.regexp = true;
	        rule.match = replace(rule.match);
	      }
	    }
	  }, {
	    key: "createElement",
	    value: function createElement(tag, nodeMarkdown) {
	      return new this(null, Node.ELEMENT_NODE, tag, nodeMarkdown);
	    }
	  }, {
	    key: "createComment",
	    value: function createComment(data, nodeMarkdown) {
	      return new this(data, Node.COMMENT_NODE, null, nodeMarkdown);
	    }
	  }, {
	    key: "createTextNode",
	    value: function createTextNode(data, nodeMarkdown) {
	      return new this(data, Node.TEXT_NODE, null, nodeMarkdown);
	    }
	  }]);
	
	  function Node(nodeValue, nodeType, nodeName, nodeMarkdown) {
	    (0, _classCallCheck3.default)(this, Node);
	    this.children = [];
	    this.attributes = {};
	    this.nodeType = 0;
	    this.nodeName = '';
	    this.nodeMarkdown = false;
	
	    this.nodeType = nodeType || Node.DOCUMENT_NODE;
	    if (typeof nodeValue == 'string') {
	      this.nodeValue = nodeValue;
	    }
	    if (nodeName) {
	      this.nodeName = nodeName;
	    }
	    if (nodeMarkdown) {
	      this.nodeMarkdown = nodeMarkdown;
	    }
	    if (this.nodeType == Node.DOCUMENT_NODE) {
	      this.nodeMarkdown = true;
	      this.parser(String(this.nodeValue).split(this.constructor.NEWLINE_SPLIT));
	    }
	  }
	
	  (0, _createClass3.default)(Node, [{
	    key: "appendChild",
	    value: function appendChild(node) {
	      if (node.parentNode) {
	        node.parentNode.removeChild(node);
	      }
	      node.parentNode = this;
	      this.children.push(node);
	      return node;
	    }
	  }, {
	    key: "insertBefore",
	    value: function insertBefore(node, reference) {
	      if (!reference) {
	        return this.appendChild(node);
	      }
	      var index = this.children.indexOf(reference);
	      if (index == -1) {
	        return node;
	      }
	      if (node.parentNode) {
	        if (node.parentNode == this) {
	          index = this.children.indexOf(reference);
	        }
	        node.parentNode.removeChild(node);
	      }
	      node.parentNode = this;
	      this.children.splice(index, 0, node);
	      return node;
	    }
	  }, {
	    key: "replaceChild",
	    value: function replaceChild(newNode, oldNode) {
	      var index = this.children.indexOf(oldNode);
	      if (index == -1) {
	        return false;
	      }
	      if (newNode.parentNode) {
	        if (node.parentNode == this) {
	          index = this.children.indexOf(newNode);
	        }
	        newNode.parentNode.removeChild(newNode);
	      }
	      newNode.parentNode = this;
	      this.children.splice(index, 0, newNode);
	      if (oldNode.parentNode) {
	        oldNode.parentNode.removeChild(oldNode);
	      }
	      return oldNode;
	    }
	  }, {
	    key: "removeChild",
	    value: function removeChild(node) {
	      var index = this.children.indexOf(node);
	      if (index == -1) {
	        return false;
	      }
	      delete node.parentNode;
	      this.children.splice(index, 1);
	      return node;
	    }
	  }, {
	    key: "setAttributes",
	    value: function setAttributes(attributes) {
	      for (var name in attributes) {
	        this.attributes[name] = attributes[name];
	      }
	      return this;
	    }
	  }, {
	    key: "setAttribute",
	    value: function setAttribute(name, value) {
	      this.attributes[name] = value;
	      return this;
	    }
	  }, {
	    key: "removeAttribute",
	    value: function removeAttribute(name) {
	      var result = typeof this.attributes[name] != 'undefined';
	      delete this.attributes[name];
	      return result;
	    }
	  }, {
	    key: "getAttribute",
	    value: function getAttribute(name) {
	      return typeof this.attributes[name] == 'undefined' ? null : this.attributes[name];
	    }
	  }, {
	    key: "firstChild",
	    value: function firstChild() {
	      return this.children.length ? this.children[0] : null;
	    }
	  }, {
	    key: "lastChild",
	    value: function lastChild() {
	      return this.children.length ? this.children[this.children.length - 1] : null;
	    }
	  }, {
	    key: "toHtmlAttribute",
	    value: function toHtmlAttribute() {
	      var attributes = [];
	      var value;
	      for (var name in this.attributes) {
	        if (this.constructor.tagAttributes[name]) {
	          value = this.constructor.tagAttributes[name].call(this, this.attributes[name], name);
	        } else {
	          if (!this.nodeMarkdown) {
	            continue;
	          }
	          value = this.attributes[name];
	        }
	        if (value === false || value === null || value === undefined) {
	          continue;
	        }
	        attributes.push(value === true ? name : name + '="' + this.constructor.escapeHtml(value) + '"');
	      }
	      return attributes.join(' ');
	    }
	  }, {
	    key: "toHtml",
	    value: function toHtml(option) {
	      option = option || {};
	      var result;
	      switch (this.nodeType) {
	        case Node.DOCUMENT_NODE:
	          {
	            result = [];
	            for (var i = 0; i < this.children.length; i++) {
	              result.push(this.children[i].toHtml(option));
	            }
	            return result.join(option.format ? this.constructor.NEWLINE : '');
	          }
	        case Node.ELEMENT_NODE:
	          {
	            var tagOption = this.constructor.tags[this.nodeName];
	            if (!tagOption && !this.nodeMarkdown) {
	              return '';
	            }
	            if (!option.level) {
	              option.level = 1;
	            } else {
	              option.level++;
	            }
	            tagOption = tagOption || {};
	            if (tagOption.toHtml) {
	              result = tagOption.toHtml.call(this, option);
	            } else {
	              var attribute = this.toHtmlAttribute();
	              if (attribute) {
	                attribute = ' ' + attribute;
	              }
	              var tab = option.format && !tagOption.inline ? this.constructor.NEWLINE + this.constructor.nestingLevel(option.level - 1) : '';
	              if (tagOption.single) {
	                result = tab + '<' + this.nodeName + attribute + ' />';
	              } else {
	                var children = '';
	                for (var i = 0; i < this.children.length; i++) {
	                  children += this.children[i].toHtml(option);
	                }
	                result = tab + '<' + this.nodeName + attribute + '>' + (children && tab && children.substr(0, tab.length) == tab ? children + tab : children) + '</' + this.nodeName + '>';
	              }
	            }
	            option.level--;
	            return result;
	          }
	        case Node.COMMENT_NODE:
	          {
	            return '<!--' + this.constructor.escapeHtml(this.nodeValue).replace(/[\[\]]/g, ' ') + '-->';
	          }
	        case Node.TEXT_NODE:
	          {
	            return this.constructor.escapeHtml(this.nodeValue);
	          }
	        default:
	          {
	            return '';
	          }
	      }
	    }
	  }, {
	    key: "toText",
	    value: function toText(option) {
	      option = option || {};
	      option.separator = option.separator || this.constructor.NEWLINE;
	
	      var result;
	      var text;
	      switch (this.nodeType) {
	        case Node.DOCUMENT_NODE:
	          {
	            result = [];
	            for (var i = 0; i < this.children.length; i++) {
	              text = this.children[i].toText(option);
	              if (text) {
	                result.push(text);
	              }
	            }
	            return result.join(option.separator);
	          }
	        case Node.ELEMENT_NODE:
	          {
	            var tagOption = this.constructor.tags[this.nodeName] || {};
	            result = [];
	
	            var lastChild = this.parentNode ? this.parentNode.lastChild() : null;
	            for (var i = 0; i < this.children.length; i++) {
	              text = this.children[i].toText(option);
	              if (text) {
	                result.push(text);
	              }
	            }
	            result = result.join('');
	            if (result && !tagOption.inline && !tagOption.blackBlock && lastChild && lastChild != this) {
	              result += option.separator;
	            }
	            return result;
	          }
	        case Node.TEXT_NODE:
	          {
	            return this.constructor.escapeHtml(this.nodeValue);
	          }
	        default:
	          {
	            return '';
	          }
	      }
	    }
	  }, {
	    key: "parser",
	    value: function parser(data, token) {
	      if (!token) {
	        token = new this.constructor.Token(this.constructor);
	      }
	      if (token.stacks.length >= this.constructor.NESTING) {
	        return false;
	      }
	      token.push(data);
	      var stack = token.stack;
	      var match;
	      var node;
	
	      stack.block = true;
	      if (this.nodeType != Node.DOCUMENT_NODE) {
	        var option = this.constructor.tags[this.nodeName];
	        stack.block = option && !option.blackBlock && !option.inline;
	      }
	      var line;
	      if (stack.block) {
	        do {
	          stack._index = stack.index;
	          match = this.blockMatch(token);
	          if (match) {
	            line = token.stack.line;
	            node = match.rule.parser.call(this, token, match.match);
	            if (node) {
	              this.appendChild(node);
	            }
	          }
	        } while (stack.after && (stack.index != stack._index || token.next()));
	      } else if (stack.after) {
	        do {
	          stack._index = stack.index;
	          match = this.matchInline(token);
	          if (match) {
	            node = match.rule.parser.call(this, token, match.match);
	            if (node) {
	              this.appendChild(node);
	            }
	          }
	        } while (stack.after && (stack.index != stack._index || token.skip(1)));
	      }
	      token.pop();
	      return true;
	    }
	  }, {
	    key: "blockMatch",
	    value: function blockMatch(token) {
	      if (token.stack.ch != 0) {
	        return false;
	      }
	      var current = token.current();
	      if (!current || !current.trimData) {
	        return false;
	      }
	      if (typeof current.blockMatch != 'undefined') {
	        return current.blockMatch;
	      }
	      current.blockMatch = false;
	      var rules = this.constructor._blockRules;
	      var name;
	      var rule;
	      var match;
	      var data;
	      var line;
	      var i;
	      for (name in rules) {
	        rule = rules[name];
	        if (token.blackList[name]) {
	          continue;
	        }
	        if (this.nodeType != Node.DOCUMENT_NODE && rule.blackNesting) {
	          continue;
	        }
	        data = rule.trim == false ? current.data : current.trimData;
	        if (rule.line && rule.line > 1) {
	          for (i = 1; i < rule.line; i++) {
	            if (!(line = token.getLine(token.stack.line + i)) || !line.trimData) {
	              break;
	            }
	            data += this.constructor.NEWLINE + (rule.trim ? line.data : line.trimData);
	          }
	          if (!line) {
	            continue;
	          }
	        }
	        if (rule.regexp) {
	          match = rule.match.exec(data);
	        } else {
	          match = rule.match.exec.call(this, data);
	        }
	        if (match) {
	          current.blockMatch = {
	            name: name,
	            rule: rule,
	            match: match
	          };
	          return current.blockMatch;
	        }
	      }
	      return current.blockMatch;
	    }
	  }, {
	    key: "matchInline",
	    value: function matchInline(token) {
	      var rules = this.constructor._inlineRules;
	      var name;
	      var rule;
	      var match;
	      var data;
	      var line;
	      var i;
	      var after = token.stack.after;
	      for (name in rules) {
	        rule = rules[name];
	        if (token.blackList[name]) {
	          continue;
	        }
	        if (rule.regexp) {
	          match = rule.match.exec(after);
	        } else {
	          match = rule.match.exec.call(this, after);
	        }
	        if (match) {
	          return {
	            name: name,
	            rule: rule,
	            match: match
	          };
	        }
	      }
	    }
	  }]);
	  return Node;
	}();
	
	Node.DOCUMENT_NODE = 0;
	Node.ELEMENT_NODE = 1;
	Node.COMMENT_NODE = 2;
	Node.TEXT_NODE = 3;
	Node.NESTING = 16;
	Node.SPACE = " ";
	Node.NEWLINE = "\n";
	Node.TAB = "\t";
	Node.NEWLINE_SPLIT = /(?:\r\n|[\r\n\u2424])/;
	Node.rules = {};
	Node.tags = (_Node$tags = {
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
	  blockcode: {},
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
	  style: { text: true },
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
	
	}, (0, _defineProperty3.default)(_Node$tags, "base", null), (0, _defineProperty3.default)(_Node$tags, "html", null), (0, _defineProperty3.default)(_Node$tags, "meta", null), (0, _defineProperty3.default)(_Node$tags, "link", null), (0, _defineProperty3.default)(_Node$tags, "style", { inline: true, block: true, text: true, black: true }), (0, _defineProperty3.default)(_Node$tags, "script", { inline: true, block: true, text: true, black: true }), (0, _defineProperty3.default)(_Node$tags, "head", null), (0, _defineProperty3.default)(_Node$tags, "body", null), (0, _defineProperty3.default)(_Node$tags, "title", null), (0, _defineProperty3.default)(_Node$tags, "noframes", null), (0, _defineProperty3.default)(_Node$tags, "noscript", null), (0, _defineProperty3.default)(_Node$tags, "frameset", null), (0, _defineProperty3.default)(_Node$tags, "frame", null), (0, _defineProperty3.default)(_Node$tags, "iframe", null), (0, _defineProperty3.default)(_Node$tags, "applet", null), (0, _defineProperty3.default)(_Node$tags, "polygon", null), (0, _defineProperty3.default)(_Node$tags, "svg", null), (0, _defineProperty3.default)(_Node$tags, "dialog", null), (0, _defineProperty3.default)(_Node$tags, "command", null), _Node$tags);
	Node.tagAttributes = {};
	
	var Token = function () {
	  function Token(node) {
	    (0, _classCallCheck3.default)(this, Token);
	    this.stacks = [];
	    this.node = Node;
	    this.blackList = {};
	
	    if (node) {
	      this.node = node;
	    }
	    if (!node._rules) {
	      node.parserRules();
	    }
	  }
	
	  (0, _createClass3.default)(Token, [{
	    key: "push",
	    value: function push(after) {
	      var lines;
	      if ((typeof after === "undefined" ? "undefined" : (0, _typeof3.default)(after)) == 'object') {
	        lines = after;
	        after = after.join(this.node.NEWLINE);
	      } else {
	        lines = after.split(this.node.NEWLINE);
	      }
	      var linesLength = [];
	      for (var i = 0; i < lines.length; i++) {
	        linesLength[i] = lines[i].length;
	      }
	      var key = this.stacks.push({
	        before: '',
	        skip: '',
	        after: after,
	        lines: lines,
	        linesLength: linesLength,
	        index: 0,
	        ch: 0,
	        line: 0,
	        block: true
	      });
	      this.stack = this.stacks[key - 1];
	    }
	  }, {
	    key: "pop",
	    value: function pop() {
	      var pop = this.stacks.pop();
	      this.stack = this.stacks.length ? this.stacks[this.stacks.length - 1] : null;
	      return pop;
	    }
	  }, {
	    key: "getLine",
	    value: function getLine(line) {
	      if (typeof this.stack.lines[line] == 'string') {
	        var data = this.stack.lines[line];
	        var trim = data.match(this.node._rules.trim.match);
	        this.stack.lines[line] = { data: data, trimData: trim[2], ltrimLength: trim[1].length, rtrimLength: trim[3].length, spacelength: trim[1].replace(/\t/g, '    ').length };
	      }
	      return this.stack.lines[line];
	    }
	  }, {
	    key: "current",
	    value: function current() {
	      return this.getLine(this.stack.line);
	    }
	  }, {
	    key: "next",
	    value: function next() {
	      var index = this.indexOf(this.node.NEWLINE);
	      if (index == -1) {
	        if (this.stack.after) {
	          this.skip(this.stack.after.length);
	        }
	        return false;
	      }
	      if (this.stack.after[index] == '\r' && this.stack.after[index + 1] == '\n') {
	        index++;
	      }
	      index++;
	      this.skip(index);
	      return this.stack.line;
	    }
	  }, {
	    key: "skip",
	    value: function skip(index) {
	      if (index < 0 || this.stack.after.length < index) {
	        return false;
	      }
	
	      if (!index) {
	        return true;
	      }
	      // 索引偏移
	      this.stack.index += index;
	
	      // 跳过的数据
	      this.stack.skip = this.stack.after.substr(0, index);
	
	      // 之前已处理的
	      this.stack.before += this.stack.skip;
	
	      // 之后需要处理的
	      this.stack.after = this.stack.after.substr(index);
	
	      // ch 偏移
	      this.stack.ch += index;
	
	      // 跳过的行数等
	      while (this.stack.ch >= this.stack.linesLength[this.stack.line] + this.node.NEWLINE.length) {
	        this.stack.ch -= this.stack.linesLength[this.stack.line] + this.node.NEWLINE.length;
	        this.stack.line++;
	      }
	      return true;
	    }
	  }, {
	    key: "search",
	    value: function search(regexp) {
	      return this.stack.after.search(regexp);
	    }
	  }, {
	    key: "indexOf",
	    value: function indexOf(searchvalue, fromindex) {
	      return this.stack.after.indexOf(searchvalue, fromindex);
	    }
	  }, {
	    key: "exec",
	    value: function exec(regexp) {
	      return regexp.exec(this.stack.after);
	    }
	  }, {
	    key: "test",
	    value: function test(regexp) {
	      return regexp.test(this.stack.after);
	    }
	  }, {
	    key: "match",
	    value: function match(regexp) {
	      return this.stack.after.match(regexp);
	    }
	  }]);
	  return Token;
	}();
	
	var Html = {
	  TAG_NAME: /[ \t\r\n\0\x0B\u00a0\/>]/,
	
	  TAG_END: /[ \t\r\n\0\x0B\u00a0>]/,
	
	  text: function text(tokenHtml, token) {
	    if (!tokenHtml.text) {
	      return;
	    }
	    if (!tokenHtml.text.trim()) {
	      tokenHtml.text = '';
	      return;
	    }
	    if (tokenHtml.markdown) {
	      tokenHtml.parentNode.parser(tokenHtml.text.replace(/</g, '&lt;').replace(/>/g, '&gt;'), token);
	    } else {
	      tokenHtml.parentNode.appendChild(new tokenHtml.node(tokenHtml.text, Node.TEXT_NODE));
	    }
	    tokenHtml.text = '';
	  },
	  push: function push(tokenHtml, node, option) {
	
	    // 父级的 节点
	    tokenHtml.parentsNode.push(tokenHtml.parentNode);
	    tokenHtml.parentNode = node;
	
	    // 父级的标签名
	    tokenHtml.parentName && tokenHtml.parentsName.push(tokenHtml.parentName);
	    tokenHtml.parentName = node.nodeName;
	
	    // 父级是否允许块标签
	    tokenHtml.parentsBlock.push(tokenHtml.parentBlock);
	    if (tokenHtml.parentBlock && (option.blackBlock || option.inline && !option.block)) {
	      tokenHtml.parentBlock = false;
	    }
	
	    // 白名单
	    tokenHtml.parentsWhiteList.push(tokenHtml.whiteList);
	    if (option.whiteList) {
	      if (tokenHtml.whiteList) {
	        var whiteList = tokenHtml.whiteList;
	        tokenHtml.whiteList = (0, _assign2.default)({}, option.whiteList);
	        for (var key in tokenHtml.whiteList) {
	          if (!whiteList[key]) {
	            delete tokenHtml.whiteList[key];
	          }
	        }
	      } else {
	        tokenHtml.whiteList = option.whiteList;
	      }
	    }
	
	    // 黑名单
	    tokenHtml.parentBlackList.push(option.blackList || {});
	    tokenHtml.blackList = _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(tokenHtml.parentBlackList)));
	  },
	  pop: function pop(tokenHtml, token, tagName) {
	    if (!tokenHtml.parentsNode.length || tokenHtml.parentNode.nodeType != Node.ELEMENT_NODE) {
	      return false;
	    }
	    if (tagName && tagName != tokenHtml.parentNode.nodeName) {
	      return false;
	    }
	
	    this.text(tokenHtml, token);
	
	    tokenHtml.parentNode = tokenHtml.parentsNode.pop();
	    tokenHtml.parentName = tokenHtml.parentsName.pop();
	    tokenHtml.parentBlock = tokenHtml.parentsBlock.pop();
	    tokenHtml.whiteList = tokenHtml.parentsWhiteList.pop();
	    tokenHtml.parentBlackList.pop();
	    tokenHtml.blackList = _assign2.default.apply(Object, [{}].concat((0, _toConsumableArray3.default)(tokenHtml.parentBlackList)));
	    return true;
	  },
	  parser: function parser(node, token, markdown) {
	    var tokenHtml = {
	      node: node.constructor,
	
	      parentsNode: [],
	      parentNode: node,
	
	      parentsName: [],
	      parentName: null,
	
	      parentsBlock: [],
	      parentBlock: true,
	
	      parentBlackList: [],
	
	      blackList: {},
	
	      parentsWhiteList: [],
	      whiteList: null,
	
	      baseName: node.nodeName,
	      baseBlock: true,
	      baseNesting: [],
	      baseBlackList: {},
	      baseWhiteList: null,
	
	      text: '',
	
	      markdown: markdown
	    };
	
	    token.endTagRegExp = token.endTagRegExp || {};
	
	    var tagName;
	
	    var attributes = {};
	    var attributeName;
	    var attributeValue;
	    var key;
	    var node;
	    var index;
	    var char;
	    var stack = token.stack;
	    var option;
	
	    var parentNode = node;
	    do {
	      if (parentNode.nodeName) {
	        tokenHtml.baseNesting.push(parentNode);
	      }
	      parentNode = parentNode.parentNode;
	    } while (parentNode && parentNode.nodeName);
	    tokenHtml.baseNesting.reverse();
	
	    for (var i = 0; i < tokenHtml.baseNesting.length; i++) {
	      node = tokenHtml.baseNesting[i];
	      option = tokenHtml.node.tags[node.nodeName];
	      if (!option) {
	        continue;
	      }
	      if (tokenHtml.baseBlock && (option.blackBlock || option.inline && !option.block)) {
	        tokenHtml.baseBlock = false;
	      }
	
	      // 白名单
	      if (option.whiteList) {
	        if (tokenHtml.baseBlackList) {
	          for (key in tokenHtml.baseBlackList) {
	            if (!option.whiteList[key]) {
	              delete tokenHtml.baseBlackList[key];
	            }
	          }
	        } else {
	          tokenHtml.baseBlackList = (0, _assign2.default)({}, option.whiteList);
	        }
	      }
	
	      // 黑名单
	      (0, _assign2.default)(tokenHtml.baseBlackList, option.blackList);
	    }
	
	    while ((index = token.indexOf('<')) != -1 && (tokenHtml.parentsNode.length || !tagName || tokenHtml.baseBlock && token.search(/^.*(<\!--|<\/?[a-zA-Z].*>)/) != -1)) {
	      if (index) {
	        tokenHtml.text += stack.after.substr(0, index);
	      }
	      token.skip(index + 1);
	      char = stack.after.charAt(0);
	
	      // 最后了
	      if (!char) {
	        tokenHtml.text += '<';
	        continue;
	      }
	
	      // 注释
	      if (char == '!') {
	        if (stack.after.substr(0, 3) == '!--') {
	          token.skip(3);
	          index = token.indexOf('-->');
	          token.skip(index == -1 ? stack.after.length : index + 3);
	          this.text(tokenHtml, token);
	          tokenHtml.parentNode.appendChild(new tokenHtml.node(stack.skip.substr(0, stack.skip.length - 3), Node.COMMENT_NODE));
	        } else {
	          tokenHtml.text += '<';
	        }
	        continue;
	      }
	
	      // 结束标签
	      if (char == '/') {
	        index = token.indexOf('>');
	        tagName = index == -1 ? stack.after.substr(1) : stack.after.substr(1, index - 1);
	        tagName = tagName.trim().toLowerCase();
	        if (tagName) {
	          token.skip(index == -1 ? stack.after.length : index + 1);
	          this.pop(tokenHtml, token, tagName);
	        } else {
	          tokenHtml.text = '<';
	        }
	        continue;
	      }
	
	      // 不是标签
	      if (char < 'a' && char > 'z' && char < 'A' && char > 'Z') {
	        continue;
	      }
	
	      // 没结束
	      index = token.search(this.TAG_NAME);
	      if (index == -1) {
	        break;
	      }
	
	      tagName = stack.after.substr(0, index).trim().toLowerCase();
	
	      char = stack.after.charAt(index);
	      token.skip(index + 1);
	
	      attributes = {};
	      while (index != -1 && char != '>' && (index = token.search(/[=>]/)) != -1) {
	        attributeName = stack.after.substr(0, index);
	        char = stack.after.charAt(index);
	        token.skip(index + 1);
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
	          while (char = stack.after.charAt(index)) {
	            ++index;
	            if (char == '>') {
	              break;
	            } else if (char == '"' || char == "'") {
	              token.skip(index);
	              index = token.indexOf(char);
	              attributeValue = index == -1 ? stack.after : stack.after.substr(0, index);
	              token.skip(index == -1 ? stack.after.length : index + 1);
	              break;
	            } else if (char = char.trim()) {
	              token.skip(index);
	              index = token.search(tokenHtml.TAG_END);
	              attributeValue = index == -1 ? stack.after : stack.after.substr(0, index);
	              token.skip(index == -1 ? stack.after.length : index + 1);
	              break;
	            }
	          }
	        }
	        attributeName = attributeName.trim().toLowerCase();
	        if (tokenHtml.node.tagAttributes[attributeName]) {
	          attributes[attributeName] = attributeValue;
	        }
	      }
	
	      if (tokenHtml.parentsNode.length + tokenHtml.baseNesting.length >= tokenHtml.node.NESTING) {
	        continue;
	      }
	
	      option = tokenHtml.node.tags[tagName];
	      if (!option) {
	        continue;
	      }
	
	      if (option.black) {
	        if (option.text) {
	          if (!token.endTagRegExp[tagName]) {
	            token.endTagRegExp[tagName] = new RegExp('<\/' + tagName + '(>|\s)');
	          }
	          index = token.search(token.endTagRegExp[tagName], '');
	          // 插入文本
	          if (index != -1) {
	            index = token.indexOf('>', index);
	          }
	          token.skip(index == -1 ? stack.after.length : index + 1);
	        }
	        continue;
	      }
	
	      // 不能重复 a 标签
	      if (token.blackList.link && tagName == 'a') {
	        continue;
	      }
	
	      // 基础块
	      if (!tokenHtml.baseBlock && !option.inline) {
	        continue;
	      }
	
	      // 基础白名单
	      if (tokenHtml.baseWhiteList && !tokenHtml.baseWhiteList[tagName]) {
	        continue;
	      }
	
	      // 基础黑名单
	      if (tokenHtml.baseBlackList[tagName]) {
	        continue;
	      }
	
	      // 嵌套白名单
	      if (tokenHtml.whiteList && !tokenHtml.whiteList[tagName]) {
	        continue;
	      }
	
	      // 基础连续嵌套
	      if (option.blackContinuity && tokenHtml.baseName == tagName && tokenHtml.parentsNode.length == 0) {
	        continue;
	      }
	
	      node = tokenHtml.node.createElement(tagName);
	      node.setAttributes(attributes);
	
	      this.text(tokenHtml, token);
	
	      // inline 里面不能嵌套 block
	      while (!tokenHtml.parentBlock && !option.inline && this.pop(tokenHtml, token)) {}
	
	      // 不能连续嵌套的
	      if (option.blackContinuity && tokenHtml.parentName == tagName && this.pop(tokenHtml, token)) {}
	
	      // 嵌套黑名单
	      while (tokenHtml.blackList[tagName] && this.pop(tokenHtml, token)) {}
	
	      tokenHtml.parentNode.appendChild(node);
	
	      // 单标签
	      if (option.single) {
	        continue;
	      }
	
	      // 字符串标签里面不允许嵌套任何标签的
	      if (option.text) {
	        index = token.search(new RegExp('<\/' + tagName), '');
	        // 插入文本
	        node.appendChild(tokenHtml.node.createTextNode(index == -1 ? stack.after : stack.after.substr(0, index)));
	        if (index != -1) {
	          index = token.indexOf('>', index);
	        }
	        token.skip(index == -1 ? stack.after.length : index + 1);
	        continue;
	      }
	
	      this.push(tokenHtml, node, option);
	    }
	    if (tokenHtml.baseBlock) {
	      var data = token.current().data;
	      if (data.length > stack.ch) {
	        tokenHtml.text += data.substr(stack.ch);
	      }
	      this.text(tokenHtml, token);
	      token.next();
	    } else {
	      this.text(tokenHtml, token);
	    }
	  }
	};
	
	Node.Html = Html;
	Node.Token = Token;
	module.exports = Node;
	
	Node.addRule('newline', { match: /\n/ });
	Node.addRule('space', { match: /[ \u00a0]/ });
	Node.addRule('tab', { match: /(?:    |\t)/ });
	Node.addRule('blank', { match: /(?:{{newline}}|{{space}}|\t)/ });
	Node.addRule('trim', { match: /^((?:{{space}}|{{tab}})*)(.*?)((?:{{space}}|{{tab}})*)$/ });
	Node.addRule('escapeChar', { match: /[{}\[\]()<>'+\-\\`*:#!_~@$'.]/ });
	
	Node.addRule('grave', { match: /`/ });
	Node.addRule('tilde', { match: /~/ });
	Node.addRule('gt', { match: />/ });
	Node.addRule('lt', { match: /</ });
	Node.addRule('number', { match: /\#/ });
	Node.addRule('asterisk', { match: /\*/ });
	Node.addRule('minus', { match: /\-/ });
	Node.addRule('plus', { match: /\+/ });
	Node.addRule('equals', { match: /\=/ });
	Node.addRule('colon', { match: /\:/ });
	Node.addRule('lowbar', { match: /_/ });
	Node.addRule('verbar', { match: /\|/ });
	Node.addRule('doc', { match: /\./ });
	Node.addRule('backslash', { match: /\\/ });
	Node.addRule('commat', { match: /\@/ });
	Node.addRule('dollar', { match: /\$/ });
	
	Node.addRule('apos', { match: /'/ });
	Node.addRule('quot', { match: /"/ });
	Node.addRule('quote', { match: /(?:{{quot}}|{{apos}})/ });
	Node.addRule('escapeCharAll', { match: /{{escapeChar}}/g });
	Node.addRule('escapeBackslash', { match: /[\s\S]*?[^\\](?:\\\\)*/ });
	
	Node.addRule('blockCode', {
	  match: /^{{tab}}{{space}}*(?!{{space}}.)|^({{grave}}{3,}|{tilde}}{3,}){{space}}*(.*)/,
	  block: true,
	  priority: 0,
	  trim: false,
	  parser: function parser(token, match) {
	    var value = [];
	    var current;
	
	    if (match[1]) {
	      while (token.next()) {
	        current = token.current();
	        if (current.trimData == match[1] && current.spacelength < 4) {
	          token.next();
	          break;
	        }
	        value.push(current.trimData ? current.data : '');
	      }
	    } else {
	      do {
	        current = token.current();
	        if (current.trimData && current.spacelength < 4) {
	          break;
	        }
	        value.push(current.trimData ? current.data.substr(current.data.charAt(0) == '\t' ? 1 : current.ltrimLength > 4 ? 4 : current.ltrimLength) : '');
	      } while (token.next());
	    }
	
	    var pre = this.constructor.createElement('pre', true);
	    var code = this.constructor.createElement('code', true);
	    var text = this.constructor.createTextNode(this.constructor.escapeHtml(value.join(this.constructor.NEWLINE), true), true);
	    pre.appendChild(code);
	    code.appendChild(text);
	    if (match[1]) {
	      pre.attributes.class = 'highlight highlight-source-' + match[2].toLowerCase().replace(/[^0-9a-z_-]/g, '');
	    }
	    return pre;
	  }
	});
	
	Node.addRule('blockTag', {
	  match: function match(data) {
	    if (!this.constructor._rules.blockTag.matchRegexp) {
	      var names = [];
	      var tag;
	      for (var name in this.constructor.tags) {
	        tag = this.constructor.tags[name];
	        if (tag && (!tag.inline || tag.block)) {
	          names.push(name);
	        }
	      }
	      this.constructor._rules.blockTag.matchRegexp = new RegExp('^<(?:' + names.join('|') + ')(?:|\\s.*?)>', 'i');
	    }
	    return this.constructor._rules.blockTag.matchRegexp.test(data);
	  },
	
	  block: true,
	  priority: 5,
	  parser: function parser(token, match) {
	    return this.constructor.Html.parser(this, token);
	  }
	});
	
	Node.addRule('blockquote', {
	  match: /^{{space}}*({{gt}})/,
	  block: true,
	  priority: 10,
	  parser: function parser(token, match) {
	    var value = [];
	    var current;
	    var empty;
	    do {
	      current = token.current();
	      if (!current.trimData) {
	        if (empty) {
	          break;
	        }
	        empty = true;
	        value.push(current.trimData);
	      } else {
	        if (empty && (current.spacelength >= 4 || current.trimData.charAt(0) != match[1])) {
	          break;
	        }
	        if (current.spacelength < 4) {
	          value.push(current.trimData[0] == match[1] ? current.trimData.substr(1) : current.trimData);
	        } else {
	          value.push(current.data);
	        }
	      }
	    } while (token.next());
	    var blockquote = this.constructor.createElement('blockquote', true);
	    blockquote.parser(value, token);
	    return blockquote;
	  }
	});
	
	Node.addRule('header', {
	  match: /^({{number}}{1,6}){{space}}(.*?)\#*$/,
	  block: true,
	  priority: 15,
	  parser: function parser(token, match) {
	    var node = this.constructor.createElement('h' + match[1].length, true);
	    token.next();
	    node.parser(match[2], token);
	    var id = this.constructor.escapeId(node.toText());
	    if (id) {
	      node.attributes.id = 'content-' + id;
	    }
	    return node;
	  }
	});
	
	Node.addRule('headerAtx', {
	  match: /^(.+){{newline}}{{space}}?({{equals}}|{{minus}}){{space}}?(?:\2{{space}}?)+$/,
	  line: 2,
	  block: true,
	  priority: 16,
	  parser: function parser(token, match) {
	    var node = this.constructor.createElement('h' + (this.constructor._rules.equals.match.test(match[2]) ? '1' : '2'), true);
	    token.next();
	    token.next();
	
	    node.parser(match[1], token);
	    var id = this.constructor.escapeId(node.toText());
	    if (id) {
	      node.attributes.id = 'content-' + id;
	    }
	    return node;
	  }
	});
	
	Node.addRule('list', {
	  match: /^(?:({{asterisk}}|{{plus}}|{{minus}})|(\d+{{doc}})){{space}}(.*)$/,
	  block: true,
	  priority: 25,
	  parser: function parser(token, match) {
	    var node = this.constructor.createElement(match[2] ? 'ol' : 'ul', true);
	
	    var list = [];
	    var isP = [];
	    var li = [match[3]];
	    var current;
	    var empty;
	    var blockMatch;
	
	    var li = [match[3]];
	
	    while (token.next()) {
	      current = token.current();
	      if (!current.trimData) {
	        // 空行
	        li.push('');
	      } else if (li.length && current.spacelength > 1) {
	        // 行跳格大于 1
	        li.push(current.data.substr(current.data.charAt(0) == '\t' ? 1 : current.data.charAt(1) == '\t' ? 2 : current.ltrimLength > 4 ? 4 : current.ltrimLength));
	      } else {
	        blockMatch = this.blockMatch(token);
	        if (!blockMatch) {
	          break;
	        } else if (empty && blockMatch.name != 'list') {
	          break;
	        } else if (blockMatch.name == 'blockText') {
	          li.push(current.trimData);
	        } else if (blockMatch.name == 'list' && blockMatch.match[1] == match[1] && Boolean(blockMatch.match[2]) == Boolean(match[2])) {
	          if (li.length > 1 && li.indexOf('') != -1) {
	            isP.push(true);
	            li.pop();
	          } else {
	            isP.push(false);
	          }
	          list.push(li);
	          li = [blockMatch.match[3]];
	        } else {
	          break;
	        }
	      }
	      empty = !current.trimData;
	    }
	
	    if (li.length > 1 && !li[li.length - 1]) {
	      li.pop();
	    }
	
	    list.push(li);
	    isP.push(isP[isP.length - 1]);
	
	    var child;
	    for (var i = 0; i < list.length; i++) {
	      li = this.constructor.createElement('li', true);
	      li.parser(list[i], token);
	      node.appendChild(li);
	      if (!isP[i] && (child = li.children[0]) && child.nodeName == 'p' && child.nodeMarkdown) {
	        while (child.children.length) {
	          li.insertBefore(child.children[0], child);
	        }
	        li.removeChild(child);
	      }
	      node.appendChild(li);
	    }
	    return node;
	  }
	});
	
	Node.addRule('table', {
	  match: /^{{verbar}}?(?:.*?{{verbar}})+.*?{{newline}}{{verbar}}?(?:{{space}}*(?:{{colon}}|{{minus}})+{{space}}*{{verbar}})+(?:{{space}}*(?:{{colon}}|{{minus}})+)?$/,
	  line: 2,
	  block: true,
	  priority: 20,
	  parser: function parser(token, match) {
	    var _this2 = this;
	
	    var data;
	    var index;
	    var char;
	    var text = '';
	
	    // 表头
	    var thead = [];
	    data = token.current().trimData;
	
	    while ((index = data.search(/[\\|]/)) != -1) {
	      char = data.charAt(index);
	      if (char == '\\') {
	        text += data.substr(0, index + 2);
	        data = data.substr(index + 2);
	        continue;
	      }
	      text += data.substr(0, index);
	      data = data.substr(index + 1);
	      thead.push(text ? text.match(this.constructor._rules.trim.match)[2] : text);
	      text = '';
	    }
	    text += data;
	    thead.push(text ? text.match(this.constructor._rules.trim.match)[2] : text);
	    if (thead.length > 1 && !thead[0]) {
	      thead.shift();
	    }
	    if (thead.length > 1 && !thead[thead.length - 1]) {
	      thead.pop();
	    }
	    token.next();
	
	    // 位置
	    var align = token.current().trimData.split('|').map(function (value) {
	      return value.match(_this2.constructor._rules.trim.match)[2];
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
	        return 'text-align:center;';
	      }
	      if (left) {
	        return 'text-align:left;';
	      }
	      if (right) {
	        return 'text-align:right;';
	      }
	      return '';
	    });
	
	    // 表内容
	    var tbody = [];
	    var tr = [];
	
	    var blockMatch;
	    while (token.next()) {
	      blockMatch = this.blockMatch(token);
	      if (!blockMatch || ['table', 'blockCode', 'headerAtx', 'blockText'].indexOf(blockMatch.name) == -1) {
	        break;
	      }
	      tr = [];
	      text = '';
	      data = token.current().trimData;
	      while ((index = data.search(/[\\|]/)) != -1) {
	        char = data.charAt(index);
	        if (char == '\\') {
	          text += data.substr(0, index + 2);
	          data = data.substr(index + 2);
	          continue;
	        }
	        text += data.substr(0, index);
	        data = data.substr(index + 1);
	        tr.push(text ? text.match(this.constructor._rules.trim.match)[2] : text);
	        text = '';
	      }
	      text += data;
	      tr.push(text ? text.match(this.constructor._rules.trim.match)[2] : text);
	      if (tr.length > thead.length && !tr[0]) {
	        tr.shift();
	      }
	      if (tr.length > thead.length && !tr[tr.length - 1]) {
	        tr.pop();
	      }
	      tbody.push(tr);
	    }
	    var tableElement = this.constructor.createElement('table', true);
	    var theadElement = this.constructor.createElement('thead', true);
	    var tbodyElement = this.constructor.createElement('tbody', true);
	    var trElement;
	    var thElement;
	    var tdElement;
	
	    tableElement.appendChild(theadElement);
	    tableElement.appendChild(tbodyElement);
	
	    // 表头
	    trElement = this.constructor.createElement('tr', true);
	    theadElement.appendChild(trElement);
	
	    for (var i = 0; i < thead.length; i++) {
	      thElement = this.constructor.createElement('th', true);
	      if (align[i]) {
	        thElement.attributes.style = align[i];
	      }
	      thElement.parser(thead[i], token);
	      trElement.appendChild(thElement);
	    }
	
	    // 表内容
	    for (var row = 0; row < tbody.length; row++) {
	      trElement = this.constructor.createElement('tr', true);
	      for (var col = 0; col < thead.length; col++) {
	        tdElement = this.constructor.createElement('td', true);
	        if (tbody[row][col]) {
	          tdElement.parser(tbody[row][col], token);
	        }
	        if (align[col]) {
	          tdElement.attributes.style = align[col];
	        }
	        trElement.appendChild(tdElement);
	      }
	      tbodyElement.appendChild(trElement);
	    }
	    return tableElement;
	  }
	});
	
	Node.addRule('toc', {
	  match: /^\[TOC\]$/,
	  block: true,
	  blackNesting: true,
	  priority: 30,
	  parser: function parser(token, match) {
	    var node = this.constructor.createElement('toc', true);
	    node.attributes.class = 'toc';
	    token.next();
	    return node;
	  }
	});
	
	Node.addTag('toc', {
	  black: true,
	  toHtml: function toHtml(options) {
	    this.nodeName = 'ul';
	    var parentNode = this.parentNode;
	    var ul = this;
	    var li;
	    var a;
	    var level;
	    var level2;
	    var node;
	    for (var i = 0; i < parentNode.children.length; i++) {
	      node = parentNode.children[i];
	      if (node.nodeMarkdown && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(node.nodeName) != -1) {
	        level2 = parseInt(node.nodeName.substr(1));
	        if (level) {
	          if (level2 > level) {
	            ul = ul.appendChild(this.constructor.createElement('ul', true));
	          } else if (level2 < level && ul != this) {
	            while (level2 < level && ul != this) {
	              level--;
	              ul = ul.parentNode;
	            }
	          }
	        }
	        level = level2;
	        li = this.constructor.createElement('li', true);
	        a = this.constructor.createElement('a', true);
	        a.attributes.href = '#' + node.attributes.id;
	
	        a.appendChild(this.constructor.createTextNode(node.toText().trim()));
	        li.appendChild(a);
	        ul.appendChild(li);
	      }
	    }
	    return this.toHtml(options);
	  }
	});
	
	Node.addRule('hr', {
	  match: /^({{asterisk}}|{{minus}}|{{lowbar}}){{space}}?(?:\1{{space}}?){2,}$/,
	  block: true,
	  priority: 35,
	  parser: function parser(token, match) {
	    var node = this.constructor.createElement('hr', true);
	    token.next();
	    return node;
	  }
	});
	
	Node.addRule('footnote', {
	  match: /^\[\^([^\[\]]*)\]\:{{space}}*(.*)/,
	  block: true,
	  blackNesting: true,
	  priority: 40,
	  parser: function parser(token, match) {
	    var node = this.constructor.createElement('footnote', true);
	    var value = [match[2]];
	    var blockMatch;
	    while (token.next()) {
	      blockMatch = this.blockMatch(token);
	      if (!blockMatch || ['blockCode', 'headerAtx', 'blockText'].indexOf(blockMatch.name) == -1) {
	        break;
	      }
	      value.push(token.current().data);
	    }
	    node.attributes.name = match[1].toLowerCase();
	    node.attributes.id = this.constructor.escapeId(node.attributes.name);
	    node.parser(value, token);
	    return node;
	  }
	});
	Node.addTag('footnote', {
	  black: true,
	  blackBlock: true,
	  toHtml: function toHtml(options) {
	    if (!this.children.length) {
	      return '';
	    }
	    var node = this.parentNode.lastChild();
	    if (node && !node.footnotes) {
	      node = this.constructor.createElement('ol', true);
	      node.attributes.class = 'footnotes';
	      node.footnotes = true;
	      this.parentNode.appendChild(node);
	    }
	
	    var li = node.appendChild(this.constructor.createElement('li', true));
	    var a = this.constructor.createElement('a');
	
	    li.attributes.id = 'footnote-' + this.attributes.id;
	    while (this.children.length) {
	      li.appendChild(this.children[0]);
	    }
	    li.appendChild(a);
	    a.attributes.class = 'reverse-footnote';
	    a.attributes.href = '#refnote-' + this.attributes.id;
	    return '';
	  }
	});
	
	Node.addRule('reflinktitle', {
	  match: /^(?:{{lt}}|{{quote}})(.*)(?:{{gt}}|{{quote}})$/
	});
	
	Node.addRule('reflink', {
	  match: /^\[([^\^\[\]]*)\]\:{{space}}*(.+?){{space}}*(?:{{space}}+(?:{{lt}}|{{quote}})(.*)({{gt}}|{{quote}}))?$/,
	  block: true,
	  blackNesting: true,
	  priority: 45,
	  parser: function parser(token, match) {
	    var node = this.constructor.createElement('reflink', true);
	    node.attributes.name = match[1].toLowerCase();
	    node.attributes.link = match[2];
	    if (match[3]) {
	      node.attributes.title = match[3];
	      token.next();
	    } else if (token.next()) {
	      var title = token.current().trimData.match(this.constructor._rules.reflinktitle.match);
	      if (title) {
	        node.attributes.title = title[1];
	        token.next();
	      }
	    }
	    return node;
	  }
	});
	
	Node.addTag('reflink', {
	  black: true,
	  blackBlock: true,
	  toHtml: function toHtml() {
	    return '';
	  }
	});
	
	Node.addRule('blockText', {
	  match: function match() {
	    return true;
	  },
	
	  priority: 999,
	  block: true,
	  parser: function parser(token) {
	    var node = this.constructor.createElement('p', true);
	    var value = [token.current().data];
	
	    var blockMatch;
	    var empty = false;
	    while (token.next()) {
	      blockMatch = this.blockMatch(token);
	      if (!blockMatch || ['blockCode', 'headerAtx', 'blockText'].indexOf(blockMatch.name) == -1) {
	        break;
	      }
	      value.push(token.current().data);
	    }
	    node.parser(value, token);
	    return node;
	  }
	});
	
	Node.addRule('escapeText', {
	  match: /^\\({{escapeChar}})/,
	  block: false,
	  priority: 0,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var lastChild = this.lastChild();
	    if (!lastChild || lastChild.nodeType != Node.TEXT_NODE) {
	      var node = this.constructor.createTextNode(match[1], true);
	      return node;
	    }
	    lastChild.nodeValue += match[1];
	  }
	});
	
	Node.addRule('tag', {
	  match: function match(data) {
	    if (!this.constructor._rules.tag.matchRegexp) {
	      var names = [];
	      var tag;
	      for (var name in this.constructor.tags) {
	        tag = this.constructor.tags[name];
	        if (tag && tag.inline && !tag.block) {
	          names.push(name);
	        }
	      }
	      this.constructor._rules.tag.matchRegexp = new RegExp('^<(?:' + names.join('|') + ')(?:|\\s.*?)>', 'i');
	    }
	    return this.constructor._rules.tag.matchRegexp.test(data);
	  },
	
	  block: false,
	  priority: 5,
	  parser: function parser(token) {
	    return this.constructor.Html.parser(this, token, true);
	  }
	});
	
	Node.addRule('comment', {
	  match: /^<\!--([\s\S]*?)-->/,
	  block: false,
	  priority: 15,
	  parser: function parser(token, match) {
	    var node = this.constructor.createComment(match[1], true);
	    token.skip(match[0].length);
	    return node;
	  }
	});
	
	Node.addRule('code', {
	  match: /^(({{grave}})+)([\s\S]*?(?!\1)[\s\S])\2(?!\1)/,
	  block: false,
	  priority: 20,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('code', true);
	    node.appendChild(this.constructor.createTextNode(this.constructor.escapeHtml(match[3], true), true));
	    return node;
	  }
	});
	
	Node.addRule('strong', {
	  match: /^(({{lowbar}}|{{asterisk}}){2})({{escapeBackslash}})\1(?!\2)/,
	  block: false,
	  priority: 25,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('strong', true);
	    token.blackList.strong = true;
	    node.parser(match[3], token);
	    token.blackList.strong = false;
	    return node;
	  }
	});
	
	Node.addRule('em', {
	  match: /^({{lowbar}}|{{asterisk}})({{escapeBackslash}})\1(?!\1)/,
	  block: false,
	  priority: 30,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	
	    var node = this.constructor.createElement('em', true);
	    token.blackList.em = true;
	    node.parser(match[2], token);
	    token.blackList.em = false;
	    return node;
	  }
	});
	
	Node.addRule('del', {
	  match: /^(({{tilde}}){2})({{escapeBackslash}})\1(?!\2)/,
	  block: false,
	  priority: 35,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('del', true);
	    token.blackList.del = true;
	    node.parser(match[3], token);
	    token.blackList.del = false;
	    return node;
	  }
	});
	
	Node.addRule('refnote', {
	  match: /^\[\^([^\[\]]*)\]/,
	  block: false,
	  priority: 40,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('refnote', true);
	    node.attributes.name = match[1].toLowerCase();
	    node.nodeValue = match[0];
	    return node;
	  }
	});
	
	Node.addTag('refnote', {
	  inline: true,
	  black: true,
	  toHtml: function toHtml(options) {
	    var parentNode = this.parentNode;
	    while (parentNode.parentNode && parentNode.nodeType != Node.DOCUMENT_NODE) {
	      parentNode = parentNode.parentNode;
	    }
	    var text = 0;
	    var node;
	    for (var i = 0; i < parentNode.children.length; i++) {
	      node = parentNode.children[i];
	      if (node.nodeName == 'footnote') {
	        text++;
	        if (node.attributes.name == this.attributes.name) {
	          delete this.attributes.name;
	          this.nodeName = 'sup';
	          this.attributes.class = 'refnote';
	          this.attributes.id = 'refnote-' + node.attributes.id;
	
	          var a = this.constructor.createElement('a');
	          a.attributes.href = '#footnote-' + node.attributes.id;
	          a.appendChild(this.constructor.createTextNode('[' + text.toString() + ']'));
	          this.appendChild(a);
	          return this.toHtml(options);
	        }
	      }
	    }
	    this.nodeType = Node.TEXT_NODE;
	    this.nodeName = '';
	    return this.toHtml(options);
	  }
	});
	
	Node.addRule('linkAndImage', {
	  match: /\[((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*)\]{{blank}}?(?:\({{blank}}*{{lt}}?(.*?){{gt}}?(?:{{blank}}+{{quote}}(.*?){{quote}})?{{blank}}*\)|\[([^\^\[\]]*)\])/
	});
	
	Node.addRule('image', {
	  match: /^\!{{linkAndImage}}/,
	  block: false,
	  priority: 45,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var isRef = typeof match[4] == 'string';
	    var node = this.constructor.createElement(isRef ? 'refimg' : 'img', true);
	    if (match[1]) {
	      node.attributes.alt = match[1];
	    }
	
	    if (isRef) {
	      node.attributes.name = match[4].toLowerCase();
	      node.nodeValue = match[0];
	    } else {
	      node.attributes.src = match[2];
	      if (match[3]) {
	        node.attributes.title = match[3];
	      }
	    }
	    return node;
	  }
	});
	
	Node.addTag('refimg', {
	  black: true,
	  inline: true,
	  toHtml: function toHtml(options) {
	    var parentNode = this.parentNode;
	    while (parentNode.parentNode && parentNode.nodeType != Node.DOCUMENT_NODE) {
	      parentNode = parentNode.parentNode;
	    }
	    var node;
	    for (var i = 0; i < parentNode.children.length; i++) {
	      node = parentNode.children[i];
	      if (node.nodeName == 'reflink' && node.attributes.name == this.attributes.name) {
	        this.nodeName = 'img';
	        delete this.attributes.name;
	        this.attributes.src = node.attributes.link;
	        this.attributes.title = node.attributes.title;
	        return this.toHtml(options);
	      }
	    }
	    this.nodeType = Node.TEXT_NODE;
	    this.nodeName = '';
	    return this.toHtml(options);
	  }
	});
	
	Node.addRule('link', {
	  match: /^{{linkAndImage}}/,
	  block: false,
	  priority: 50,
	  parser: function parser(token, match) {
	    var parentNode = this;
	    token.skip(match[0].length);
	    do {
	      if (parentNode.nodeName == 'a') {
	        var lastChild = this.lastChild();
	        if (!lastChild || lastChild.nodeType != Node.TEXT_NODE) {
	          var node = this.constructor.createTextNode(match[0], true);
	          return node;
	        }
	        lastChild.nodeValue += match[0];
	        return;
	      }
	      parentNode = parentNode.parentNode;
	    } while (parentNode && parentNode.parentNode && parentNode.nodeType != Node.DOCUMENT_NODE);
	
	    var isRef = typeof match[4] == 'string';
	    var node = this.constructor.createElement(isRef ? 'refa' : 'a', true);
	    if (isRef) {
	      node.attributes.name = match[4].toLowerCase();
	      node.nodeValue = match[0];
	    } else {
	      node.attributes.href = match[2];
	      if (match[3]) {
	        node.attributes.title = match[3];
	      }
	    }
	
	    token.blackList.link = true;
	    token.blackList.autoLink = true;
	    token.blackList.url = true;
	    token.blackList.refnote = true;
	    node.parser(match[1], token);
	    token.blackList.link = false;
	    token.blackList.autoLink = false;
	    token.blackList.url = false;
	    token.blackList.refnote = false;
	    return node;
	  }
	});
	Node.addTag('refa', {
	  black: true,
	  inline: true,
	  toHtml: function toHtml(options) {
	    var parentNode = this.parentNode;
	    while (parentNode.parentNode && parentNode.nodeType != Node.DOCUMENT_NODE) {
	      parentNode = parentNode.parentNode;
	    }
	    var node;
	    for (var i = 0; i < parentNode.children.length; i++) {
	      node = parentNode.children[i];
	      if (node.nodeName == 'reflink' && node.attributes.name == this.attributes.name) {
	        this.nodeName = 'a';
	        delete this.attributes.name;
	        this.attributes.href = node.attributes.link;
	        this.attributes.title = node.attributes.title;
	        return this.toHtml(options);
	      }
	    }
	    this.nodeType = Node.TEXT_NODE;
	    this.nodeName = '';
	    return this.toHtml(options);
	  }
	});
	
	Node.addRule('autoLink', {
	  match: /^<([^ >]+(@|\/|:\/)[^ >]+)>/,
	  block: false,
	  priority: 55,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('a', true);
	    node.appendChild(this.constructor.createTextNode(match[1], true));
	    node.attributes.href = match[2] == '@' ? 'mailto:' + match[1] : match[1];
	    return node;
	  }
	});
	
	Node.addRule('img', {
	  match: /^\!(https?:\/\/(?:[0-9a-zA-Z_-]+\.)*[a-zA-Z]+(?:[?\/]([^\s<>,:;"'{}()\[\]])*)?)/,
	  block: false,
	  priority: 60,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('img', true);
	    node.attributes.src = match[1];
	    return node;
	  }
	});
	
	Node.addRule('url', {
	  match: /^https?:\/\/(?:[0-9a-zA-Z_-]+\.)*[a-zA-Z]+(?:[?\/]([^\s<>,:;"'{}()\[\]])*)?/,
	  block: false,
	  priority: 65,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('a', true);
	    node.appendChild(this.constructor.createTextNode(match[0], true));
	    node.attributes.href = match[0];
	    return node;
	  }
	});
	
	Node.addRule('br', {
	  match: /^{{newline}}/,
	  block: false,
	  priority: 70,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('br', true);
	    return node;
	  }
	});
	
	Node.addRule('at', {
	  match: /^@([0-9a-zA-Z_-]+)/,
	  block: false,
	  priority: 75,
	  parser: function parser(token, match) {
	    token.skip(match[0].length);
	    var node = this.constructor.createElement('at', true);
	    node.nodeValue = match[0];
	    node.attributes.name = match[1];
	    return node;
	  }
	});
	
	Node.addTag('at', {
	  black: true,
	  inline: true,
	  toHtml: function toHtml(options) {
	    if (!options.at || !options.at[this.attributes.name]) {
	      this.nodeName = '';
	      this.nodeType = Node.TEXT_NODE;
	      return this.toHtml(options);
	    }
	    this.nodeName = 'a';
	    this.attributes.class = 'at';
	    this.attributes.title = options.at[node.attributes.name].nickname;
	    this.attributes.href = options.at[node.attributes.name].uri;
	    return this.toHtml(options);
	  }
	});
	
	Node.addRule('text', {
	  match: /^([\s\S]*?)(?:({{escapeChar}}|{{newline}})|((?:{{space}}|{{tab}})+)|$)/,
	  block: false,
	  priority: 999,
	  parser: function parser(token, match) {
	    var text = match[1];
	    if (!text && match[2]) {
	      text += match[2];
	    }
	    if (match[3]) {
	      text += match[3];
	    }
	    token.skip(text.length);
	    var lastChild = this.lastChild();
	    if (!lastChild || lastChild.nodeType != Node.TEXT_NODE) {
	      var node = this.constructor.createTextNode(text, true);
	      return node;
	    }
	    lastChild.nodeValue += text;
	  }
	});
	
	Node.addTagAttribute('href', function (value) {
	  return value;
	});
	
	Node.addTagAttribute('class', function (value) {
	  return value;
	});
	Node.addTagAttribute('id', function (value) {
	  return value;
	});
	Node.addTagAttribute('src', function (value) {
	  return value;
	});
	Node.addTagAttribute('name', function (value) {
	  return value;
	});
	Node.addTagAttribute('value', function (value) {
	  return value;
	});

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
	
	var _from = __webpack_require__(21);
	
	var _from2 = _interopRequireDefault(_from);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (arr) {
	  if (Array.isArray(arr)) {
	    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
	      arr2[i] = arr[i];
	    }
	
	    return arr2;
	  } else {
	    return (0, _from2.default)(arr);
	  }
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
	module.exports = __webpack_require__(7).Array.from;

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

	'use strict';
	var ctx            = __webpack_require__(8)
	  , $export        = __webpack_require__(5)
	  , toObject       = __webpack_require__(51)
	  , call           = __webpack_require__(53)
	  , isArrayIter    = __webpack_require__(54)
	  , toLength       = __webpack_require__(41)
	  , createProperty = __webpack_require__(55)
	  , getIterFn      = __webpack_require__(56);
	
	$export($export.S + $export.F * !__webpack_require__(58)(function(iter){ Array.from(iter); }), 'Array', {
	  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
	  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
	    var O       = toObject(arrayLike)
	      , C       = typeof this == 'function' ? this : Array
	      , aLen    = arguments.length
	      , mapfn   = aLen > 1 ? arguments[1] : undefined
	      , mapping = mapfn !== undefined
	      , index   = 0
	      , iterFn  = getIterFn(O)
	      , length, result, step, iterator;
	    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
	    // if object isn't iterable or it's array with default iterator - use simple case
	    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
	      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
	        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
	      }
	    } else {
	      length = toLength(O.length);
	      for(result = new C(length); length > index; index++){
	        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
	      }
	    }
	    result.length = index;
	    return result;
	  }
	});


/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	// call something on iterator step with safe closing on error
	var anObject = __webpack_require__(12);
	module.exports = function(iterator, fn, value, entries){
	  try {
	    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch(e){
	    var ret = iterator['return'];
	    if(ret !== undefined)anObject(ret.call(iterator));
	    throw e;
	  }
	};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	// check on default Array iterator
	var Iterators  = __webpack_require__(31)
	  , ITERATOR   = __webpack_require__(49)('iterator')
	  , ArrayProto = Array.prototype;
	
	module.exports = function(it){
	  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $defineProperty = __webpack_require__(11)
	  , createDesc      = __webpack_require__(19);
	
	module.exports = function(object, index, value){
	  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
	  else object[index] = value;
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var classof   = __webpack_require__(57)
	  , ITERATOR  = __webpack_require__(49)('iterator')
	  , Iterators = __webpack_require__(31);
	module.exports = __webpack_require__(7).getIteratorMethod = function(it){
	  if(it != undefined)return it[ITERATOR]
	    || it['@@iterator']
	    || Iterators[classof(it)];
	};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// getting tag from 19.1.3.6 Object.prototype.toString()
	var cof = __webpack_require__(39)
	  , TAG = __webpack_require__(49)('toStringTag')
	  // ES3 wrong here
	  , ARG = cof(function(){ return arguments; }()) == 'Arguments';
	
	// fallback for IE11 Script Access Denied error
	var tryGet = function(it, key){
	  try {
	    return it[key];
	  } catch(e){ /* empty */ }
	};
	
	module.exports = function(it){
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
	    // builtinTag case
	    : ARG ? cof(O)
	    // ES3 arguments fallback
	    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	var ITERATOR     = __webpack_require__(49)('iterator')
	  , SAFE_CLOSING = false;
	
	try {
	  var riter = [7][ITERATOR]();
	  riter['return'] = function(){ SAFE_CLOSING = true; };
	  Array.from(riter, function(){ throw 2; });
	} catch(e){ /* empty */ }
	
	module.exports = function(exec, skipClosing){
	  if(!skipClosing && !SAFE_CLOSING)return false;
	  var safe = false;
	  try {
	    var arr  = [7]
	      , iter = arr[ITERATOR]();
	    iter.next = function(){ return {done: safe = true}; };
	    arr[ITERATOR] = function(){ return iter; };
	    exec(arr);
	  } catch(e){ /* empty */ }
	  return safe;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(60);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(67);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(23);
	__webpack_require__(62);
	module.exports = __webpack_require__(66).f('iterator');

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(63);
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
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(64)
	  , step             = __webpack_require__(65)
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
/* 64 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(49);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(68), __esModule: true };

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(69);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	module.exports = __webpack_require__(7).Symbol;

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(6)
	  , has            = __webpack_require__(30)
	  , DESCRIPTORS    = __webpack_require__(15)
	  , $export        = __webpack_require__(5)
	  , redefine       = __webpack_require__(29)
	  , META           = __webpack_require__(70).KEY
	  , $fails         = __webpack_require__(16)
	  , shared         = __webpack_require__(44)
	  , setToStringTag = __webpack_require__(48)
	  , uid            = __webpack_require__(45)
	  , wks            = __webpack_require__(49)
	  , wksExt         = __webpack_require__(66)
	  , wksDefine      = __webpack_require__(71)
	  , keyOf          = __webpack_require__(72)
	  , enumKeys       = __webpack_require__(73)
	  , isArray        = __webpack_require__(76)
	  , anObject       = __webpack_require__(12)
	  , toIObject      = __webpack_require__(37)
	  , toPrimitive    = __webpack_require__(18)
	  , createDesc     = __webpack_require__(19)
	  , _create        = __webpack_require__(33)
	  , gOPNExt        = __webpack_require__(77)
	  , $GOPD          = __webpack_require__(79)
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
	  __webpack_require__(78).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(75).f  = $propertyIsEnumerable;
	  __webpack_require__(74).f = $getOwnPropertySymbols;
	
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
/* 70 */
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
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(6)
	  , core           = __webpack_require__(7)
	  , LIBRARY        = __webpack_require__(28)
	  , wksExt         = __webpack_require__(66)
	  , defineProperty = __webpack_require__(11).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 72 */
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
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(35)
	  , gOPS    = __webpack_require__(74)
	  , pIE     = __webpack_require__(75);
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
/* 74 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 75 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(39);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(37)
	  , gOPN      = __webpack_require__(78).f
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
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(36)
	  , hiddenKeys = __webpack_require__(46).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(75)
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
/* 80 */
/***/ function(module, exports) {



/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71)('asyncIterator');

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(71)('observable');

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(84), __esModule: true };

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(85);
	module.exports = __webpack_require__(7).Object.assign;

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(5);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(86)});

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(35)
	  , gOPS     = __webpack_require__(74)
	  , pIE      = __webpack_require__(75)
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
/* 87 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 88 */
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
//# sourceMappingURL=node.js.map