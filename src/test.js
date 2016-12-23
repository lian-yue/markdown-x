const Token = require('./token');
const Node = require('./node');



(async function() {

  var data = await fetch('/README.md')
  data = await data.text()

  var now = Date.now()
  var node = new Node
  var token = new Token(node, Node, data)

  document.querySelector('#rename').innerHTML = node.toHtml()

  console.log('timems: ' + (Date.now() - now))




  var data = await fetch('/test.md')
  data = await data.text()

  var textarea = document.querySelector('#textarea')
  var timems = document.querySelector('#timems')
  var test = document.querySelector('#test')
  textarea.value = data
  textarea.onchange = function() {
    test.innerHTML = ''
    var now = Date.now()
    var token = new Token(test, document, this.value)
    timems.innerHTML = (Date.now() - now)
  }
  textarea.onchange()

})()
