class Node {

  static escapeHtml(html, encode) {
    return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  static singles = {
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
    track: true,
  }

  static ELEMENT_NODE = 1

  static TEXT_NODE = 3

  static COMMENT_NODE = 8

  static DOCUMENT_NODE = 9

  static HTML_NODE = 99


  static createElement(tag) {
    return new this(null, Node.ELEMENT_NODE, tag)
  }

  static createComment(data) {
    return new this(data, Node.COMMENT_NODE)
  }

  static createTextNode(data) {
    return new this(data, Node.TEXT_NODE)
  }

  static createHtmlNode(data) {
    return new this(data, Node.HTML_NODE)
  }


  childNodes = []

  attributes = {}

  parentNode

  nodeType = 8

  nodeName = ''

  nodeValue

  constructor(nodeValue, nodeType, nodeName) {
    this.nodeType = nodeType || Node.DOCUMENT_NODE
    switch (this.nodeType) {
      case Node.DOCUMENT_NODE: {
        this.nodeName = '#document'
        this.nodeValue = String(nodeValue)
        return
      }
      case Node.ELEMENT_NODE: {
        this.nodeName = nodeName
        this.nodeValue = nodeValue
        return
      }
      case Node.TEXT_NODE: {
        this.nodeName = '#text'
        this.nodeValue = nodeValue
        return
      }
      case Node.COMMENT_NODE: {
        this.nodeName = '#comment'
        this.nodeValue = nodeValue
        return
      }
      case Node.HTML_NODE: {
        this.nodeName = '#html'
        this.nodeValue = nodeValue
        return
      }
    }
  }


  appendChild(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node)
    }
    node.parentNode = this;
    this.childNodes.push(node)
    return node
  }

  insertBefore(node, reference) {
    if (!reference) {
      return this.appendChild(node);
    }
    var index = this.childNodes.indexOf(reference)
    if (index == -1) {
      return node
    }
    if (node.parentNode) {
      if (node.parentNode == this) {
        index = this.childNodes.indexOf(reference)
      }
      node.parentNode.removeChild(node)
    }
    node.parentNode = this
    this.childNodes.splice(index, 0, node)
    return node
  }

  replaceChild(newNode, oldNode) {
    var index = this.childNodes.indexOf(oldNode)
    if (index == -1) {
      return false
    }
    if (newNode.parentNode) {
      if (node.parentNode == this) {
        index = this.childNodes.indexOf(newNode)
      }
      newNode.parentNode.removeChild(newNode)
    }
    newNode.parentNode = this
    this.childNodes.splice(index, 0, newNode)
    if (oldNode.parentNode) {
      oldNode.parentNode.removeChild(oldNode)
    }
    return oldNode
  }

  removeChild(node) {
    var index = this.childNodes.indexOf(node)
    if (index == -1) {
      return false
    }
    delete node.parentNode
    this.childNodes.splice(index, 1)
    return node
  }

  setAttributes(attributes) {
    for (var name in attributes) {
      this.attributes[name] = attributes[name]
    }
    return this
  }

  setAttribute(name, value) {
    this.attributes[name] = value
    return this
  }

  removeAttribute(name) {
    var result = typeof this.attributes[name] != 'undefined'
    delete this.attributes[name]
    return result
  }

  getAttribute(name) {
    return typeof this.attributes[name] == 'undefined' ? null : this.attributes[name]
  }

  firstChild() {
    return this.childNodes.length ? this.childNodes[0] : null
  }

  lastChild() {
    return this.childNodes.length ? this.childNodes[this.childNodes.length -1] : null
  }


  toHtmlAttribute() {
    var attributes = []
    var value
    for (var name in this.attributes) {
      value = this.attributes[name]
      if (value === false || value === null || value === undefined) {
        continue
      }
      attributes.push(value === true ? name : name + '="'+ this.constructor.escapeHtml(value) +'"')
    }
    return attributes.join(' ')
  }



  toHtml() {
    var result
    switch (this.nodeType) {
      case Node.DOCUMENT_NODE: {
        result = []
        for (var i = 0; i < this.childNodes.length; i++) {
          result.push(this.childNodes[i].toHtml())
        }
        return result.join('')
      }
      case Node.ELEMENT_NODE: {
        var single = this.constructor.singles[this.nodeName]
        var attribute = this.toHtmlAttribute()
        if (attribute) {
          attribute = ' ' + attribute
        }
        if (single) {
          return '<'+ this.nodeName + attribute +' />'
        } else {
          var childNodes = ''
          for (var i = 0; i < this.childNodes.length; i++) {
            childNodes += this.childNodes[i].toHtml()
          }
          return '<'+ this.nodeName + attribute +'>' + childNodes + '</'+ this.nodeName +'>'
        }
      }
      case Node.COMMENT_NODE: {
        return '<!--'+ this.constructor.escapeHtml(this.nodeValue).replace(/[\[\]]/g, ' ') +'-->'
      }
      case Node.TEXT_NODE: {
        return this.constructor.escapeHtml(this.nodeValue)
      }
      case Node.HTML_NODE: {
        return this.nodeValue
      }
      default: {
        return ''
      }
    }
  }
}


module.exports = Node
