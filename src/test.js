const Token = require('./token');



(async function() {
  var data = await fetch('/test.md')
  data = await data.text()

  var now = Date.now()
  var token = new Token(document.querySelector('#test'), document, data)

  console.log('timems: ' + (Date.now() - now))

  console.log(token)

})()
