const Token = require('./token');
const Node = require('./node');
const hljs = require('highlight.js');


;(function(){
  var blockcode = Token.getRule('md_blockcode')
  if (!blockcode.oldPrepare) {
    blockcode.oldPrepare = blockcode.prepare
  }
  blockcode.prepare = function(...args) {
    var node = blockcode.oldPrepare.apply(this, args)
    if (!node) {
      return node
    }
    var lang = ''
    var matches = node.attributes.class.match(/highlight-source\-(\w+)$/)
    if (matches) {
      lang = matches[1]
    }
    var nodeValue = node.children[0].children[0].nodeValue
    if (lang && hljs.getLanguage(lang)) {
      nodeValue = hljs.highlight(lang, nodeValue).value
    } else {
      nodeValue = hljs.highlightAuto(nodeValue).value
    }
    node.attributes.class = 'hljs'
    node.children[0].children[0] = {
      nodeName: '#html',
      nodeValue: nodeValue,
    }
    return node
  }
})();

(async function() {

  var data = await fetch('./README.md')
  data = await data.text()

  var now = Date.now()
  var node = new Node
  var token = new Token(data)
  token.toNode(document.querySelector('#rename'))
  console.log('timems: ' + (Date.now() - now))



  var data = await fetch('./test.md')
  data = await data.text()

  var textarea = document.querySelector('#textarea')
  var timems = document.querySelector('#timems')
  var test = document.querySelector('#test')
  textarea.value = data
  textarea.onchange = function() {
    var now = Date.now()
    var token = new Token(this.value)
    token.toNode(test)
    timems.innerHTML = (Date.now() - now)
  }
  textarea.onchange()
})()
