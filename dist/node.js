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

	'use strict';
	
	var _classCallCheck2 = __webpack_require__(1);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(2);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Node = function () {
	  (0, _createClass3.default)(Node, null, [{
	    key: 'escapeHtml',
	    value: function escapeHtml(html, encode) {
	      return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
	    }
	  }, {
	    key: 'createElement',
	    value: function createElement(tag) {
	      return new this(null, Node.ELEMENT_NODE, tag);
	    }
	  }, {
	    key: 'createComment',
	    value: function createComment(data) {
	      return new this(data, Node.COMMENT_NODE);
	    }
	  }, {
	    key: 'createTextNode',
	    value: function createTextNode(data) {
	      return new this(data, Node.TEXT_NODE);
	    }
	  }]);
	
	  function Node(nodeValue, nodeType, nodeName) {
	    (0, _classCallCheck3.default)(this, Node);
	    this.childNodes = [];
	    this.attributes = {};
	    this.nodeType = 8;
	    this.nodeName = '';
	
	    this.nodeType = nodeType || Node.DOCUMENT_NODE;
	    switch (this.nodeType) {
	      case Node.DOCUMENT_NODE:
	        {
	          this.nodeName = '#document';
	          this.nodeValue = String(nodeValue);
	          return;
	        }
	      case Node.ELEMENT_NODE:
	        {
	          this.nodeName = nodeName;
	          this.nodeValue = nodeValue;
	          return;
	        }
	      case Node.TEXT_NODE:
	        {
	          this.nodeName = '#text';
	          this.nodeValue = nodeValue;
	          return;
	        }
	      case Node.COMMENT_NODE:
	        {
	          this.nodeName = '#comment';
	          this.nodeValue = nodeValue;
	          return;
	        }
	    }
	  }
	
	  (0, _createClass3.default)(Node, [{
	    key: 'appendChild',
	    value: function appendChild(node) {
	      if (node.parentNode) {
	        node.parentNode.removeChild(node);
	      }
	      node.parentNode = this;
	      this.childNodes.push(node);
	      return node;
	    }
	  }, {
	    key: 'insertBefore',
	    value: function insertBefore(node, reference) {
	      if (!reference) {
	        return this.appendChild(node);
	      }
	      var index = this.childNodes.indexOf(reference);
	      if (index == -1) {
	        return node;
	      }
	      if (node.parentNode) {
	        if (node.parentNode == this) {
	          index = this.childNodes.indexOf(reference);
	        }
	        node.parentNode.removeChild(node);
	      }
	      node.parentNode = this;
	      this.childNodes.splice(index, 0, node);
	      return node;
	    }
	  }, {
	    key: 'replaceChild',
	    value: function replaceChild(newNode, oldNode) {
	      var index = this.childNodes.indexOf(oldNode);
	      if (index == -1) {
	        return false;
	      }
	      if (newNode.parentNode) {
	        if (node.parentNode == this) {
	          index = this.childNodes.indexOf(newNode);
	        }
	        newNode.parentNode.removeChild(newNode);
	      }
	      newNode.parentNode = this;
	      this.childNodes.splice(index, 0, newNode);
	      if (oldNode.parentNode) {
	        oldNode.parentNode.removeChild(oldNode);
	      }
	      return oldNode;
	    }
	  }, {
	    key: 'removeChild',
	    value: function removeChild(node) {
	      var index = this.childNodes.indexOf(node);
	      if (index == -1) {
	        return false;
	      }
	      delete node.parentNode;
	      this.childNodes.splice(index, 1);
	      return node;
	    }
	  }, {
	    key: 'setAttributes',
	    value: function setAttributes(attributes) {
	      for (var name in attributes) {
	        this.attributes[name] = attributes[name];
	      }
	      return this;
	    }
	  }, {
	    key: 'setAttribute',
	    value: function setAttribute(name, value) {
	      this.attributes[name] = value;
	      return this;
	    }
	  }, {
	    key: 'removeAttribute',
	    value: function removeAttribute(name) {
	      var result = typeof this.attributes[name] != 'undefined';
	      delete this.attributes[name];
	      return result;
	    }
	  }, {
	    key: 'getAttribute',
	    value: function getAttribute(name) {
	      return typeof this.attributes[name] == 'undefined' ? null : this.attributes[name];
	    }
	  }, {
	    key: 'firstChild',
	    value: function firstChild() {
	      return this.childNodes.length ? this.childNodes[0] : null;
	    }
	  }, {
	    key: 'lastChild',
	    value: function lastChild() {
	      return this.childNodes.length ? this.childNodes[this.childNodes.length - 1] : null;
	    }
	  }, {
	    key: 'toHtmlAttribute',
	    value: function toHtmlAttribute() {
	      var attributes = [];
	      var value;
	      for (var name in this.attributes) {
	        value = this.attributes[name];
	        if (value === false || value === null || value === undefined) {
	          continue;
	        }
	        attributes.push(value === true ? name : name + '="' + this.constructor.escapeHtml(value) + '"');
	      }
	      return attributes.join(' ');
	    }
	  }, {
	    key: 'toHtml',
	    value: function toHtml() {
	      var result;
	      switch (this.nodeType) {
	        case Node.DOCUMENT_NODE:
	          {
	            result = [];
	            for (var i = 0; i < this.childNodes.length; i++) {
	              result.push(this.childNodes[i].toHtml());
	            }
	            return result.join('');
	          }
	        case Node.ELEMENT_NODE:
	          {
	            var single = this.constructor.singles[this.nodeName];
	            var attribute = this.toHtmlAttribute();
	            if (attribute) {
	              attribute = ' ' + attribute;
	            }
	            if (single) {
	              return '<' + this.nodeName + attribute + ' />';
	            } else {
	              var childNodes = '';
	              for (var i = 0; i < this.childNodes.length; i++) {
	                childNodes += this.childNodes[i].toHtml();
	              }
	              return '<' + this.nodeName + attribute + '>' + childNodes + '</' + this.nodeName + '>';
	            }
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
	  }]);
	  return Node;
	}();
	
	Node.singles = {
	  base: true,
	  basefont: true,
	  br: true,
	  col: true,
	  embed: true,
	  frame: true,
	  hr: true,
	  img: true,
	  input: true,
	  keygen: true,
	  link: true,
	  meta: true,
	  param: true,
	  source: true,
	  track: true
	};
	Node.ELEMENT_NODE = 1;
	Node.TEXT_NODE = 3;
	Node.COMMENT_NODE = 8;
	Node.DOCUMENT_NODE = 9;
	
	
	module.exports = Node;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(3);
	
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

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(4), __esModule: true };

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(5);
	var $Object = __webpack_require__(8).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(6);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(16), 'Object', {defineProperty: __webpack_require__(12).f});

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(7)
	  , core      = __webpack_require__(8)
	  , ctx       = __webpack_require__(9)
	  , hide      = __webpack_require__(11)
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
/* 7 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 8 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(10);
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
/* 10 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(12)
	  , createDesc = __webpack_require__(20);
	module.exports = __webpack_require__(16) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(13)
	  , IE8_DOM_DEFINE = __webpack_require__(15)
	  , toPrimitive    = __webpack_require__(19)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(16) ? Object.defineProperty : function defineProperty(O, P, Attributes){
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(16) && !__webpack_require__(17)(function(){
	  return Object.defineProperty(__webpack_require__(18)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(17)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(14)
	  , document = __webpack_require__(7).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(14);
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
/* 20 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ }
/******/ ])
});
;
//# sourceMappingURL=node.js.map