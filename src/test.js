const Node = require('./node');



(async function() {
  var data = await fetch('/test.md')
  data = await data.text()

  var now = Date.now()
  var node = new Node(data)
  var html = node.toHtml({format: true})
  window.html = html
  console.log('')
  console.log('timems: ' + (Date.now() - now))
  document.querySelector('#test').innerHTML  = html


  // var data = await fetch('/test2.md')
  // data = await data.text()


  // var now = Date.now()
  // var node = new Node('www\n\nwww'+data)
  // var html = node.toHtml({format: true})
  // window.html = html
  // console.log('')
  // console.log('timems: ' + (Date.now() - now))
  // document.querySelector('#test').innerHTML  = html






})()
