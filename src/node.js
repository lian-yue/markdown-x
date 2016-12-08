class Node {
  static DOCUMENT_NODE = 0

  static ELEMENT_NODE = 1

  static COMMENT_NODE = 2

  static TEXT_NODE = 3

  static NESTING = 16

  static SPACE = " "

  static NEWLINE = "\n"

  static TAB = "\t"

  static NEWLINE_SPLIT = /(?:\r\n|[\r\n\u2424])/

  static rules = {}

  static tags = {
    a: {inline: true, blackList: {a: true, button: true, input: true, form: true, textarea: true}},
    abbr: {inline: true},
    acronym: {inline: true},
    address: {},
    applet: {inline: true, block: true},
    area: {},
    article: {},
    aside: {},
    audio: {inline: true},


    b: {inline: true},
    base: {single: true},
    basefont: {single: true},
    bdi: {inline: true},
    bdo: {inline: true},
    big: {inline: true},
    blockquote: {},
    blockcode: {},
    body: {},
    br: {inline: true, single: true},
    button: {inline: true, block: true, blackList: {textarea: true, input: true, button: true, select: true, label: true, form: true, fieldset: true, iframe: true}},


    canvas: {},
    caption: {},
    center: {},
    cite: {inline: true},
    code: {inline: true},
    col: {single: true},
    colgroup: {},
    command: {},

    datalist: {},
    dd: {blackBlock: true, blackList:{dd: true}},
    del: {inline: true},
    details: {},
    dfn: {inline: true},
    dir: {},
    div: {},
    dl: {},
    dt: {blackBlock: true, blackList: {dt: true}},
    dialog: {},

    em: {inline: true},
    embed: {single: true, blackList: {embed: true}},

    fieldset: {},
    figcaption: {},
    figure: {},
    font: {inline: true},
    footer: {},
    form: {blackList: {form: true}},
    frame: {inline: true, block: true, single: true},
    frameset: {},

    h1: {blackBlock: true},
    h2: {blackBlock: true},
    h3: {blackBlock: true},
    h4: {blackBlock: true},
    h5: {blackBlock: true},
    h6: {blackBlock: true},
    head: {},
    header: {},
    hgroup: {},
    hr: {single: true},
    html: {},


    i: {inline: true},
    iframe: {inline: true, block: true, blackList: {iframe: true}},
    img: {inline: true, single: true},
    input: {inline: true, single: true},
    ins: {inline: true, block: true},

    keygen: {single: true},
    kbd: {inline: true},

    label: {inline: true, blackList: {label: true}},
    legend: {},
    li: {blackContinuity: true},
    link: {single: true},

    map: {inline: true, block: true},
    mark: {inline: true},
    menu: {},
    menuitem: {},
    meta: {single: true},
    meter: {inline: true},

    nav: {},
    noframes: {},
    noscript: {},

    object: {inline: true, block: true, blackList: {object: true}},
    ol: {},
    optgroup: {inline: true, whiteList: {option: true}},
    option: {inline: true, whiteList: {}},
    output: {},

    p: {blackBlock: true},
    param: {inline: true, block: true, single: true},
    pre: {blackList: {img: true, object: true, embed: true, big: true, samll: true, sub: true, sup: true, pre: true}},
    progress: {},
    polygon: {},

    q: {inline: true},

    rp: {inline: true},
    rt: {inline: true},
    ruby: {inline: true},




    s: {inline: true},
    samp: {inline: true},
    script: {inline: true, block: true, text: true},
    select: {inline: true},
    small: {inline: true},
    source: {single: true},
    span: {inline: true},
    strike: {inline: true},
    strong: {inline: true},
    style: {text: true},
    sub: {inline: true},
    summary: {},
    sup: {inline: true},
    svg: {inline: true},


    table: {blackContinuity: true, inline: true, block: true},
    tbody: {blackContinuity: true, inline: true, block: true},
    td: {blackContinuity: true, inline: true, block: true},
    textarea: {inline: true, block: true, text: true},
    tfoot: {},
    th: {blackContinuity: true, inline: true, block: true},
    thead: {blackContinuity: true, inline: true, block: true},
    time: {inline: true},
    title: {},
    tr: {blackContinuity: true, inline: true, block: true},
    track: {single: true},
    tt: {inline: true},

    u: {inline: true},
    ul: {blackContinuity: true},

    var: {inline: true},
    video: {inline: true},

    wbr: {inline: true},

    xmp: {},


    base: null,
    html: null,
    meta: null,
    link: null,
    style: {inline: true, block: true, text: true, black: true},
    script: {inline: true, block: true, text: true, black: true},
    head: null,
    body: null,
    title: null,
    noframes: null,
    noscript: null,
    frameset: null,
    frame: null,
    iframe: null,
    applet: null,
    polygon: null,
    svg: null,
    dialog: null,
    command: null,
  }

  static tagAttributes = {}

  static escapeHtml(html, encode) {
    return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  static unescapeHtml(html) {
    return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
      n = n.toLowerCase();
      if (n === 'colon') return ':';
      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x'
          ? String.fromCharCode(parseInt(n.substring(2), 16))
          : String.fromCharCode(+n.substring(1));
      }
      return '';
    });
  }


  static escapeMarkdown(text) {
    return text.replace(this._rules.escapeCharAll.match, '\\$1')
  }
  static unescapeMarkdown(html) {
    return text.replace(this._rules.escapeCharAll.match, '$1')
  }

  static escapeId(id) {
    return encodeURI(id.replace(/([#?&.]|\s)+/g, '-').toLowerCase().trim()).replace(/\%/g, '')
  }
  static getRule(name) {
    return this.rules[name]
  }

  static addRule(name, option) {
    delete this._rules
    this.rules[name] = option
    return true
  }

  static getTag(name) {
    return this.tags[name]
  }

  static addTag(name, options) {
    this.tags[name] = options
    return true
  }

  static getTagAttribute(name) {
    return this.tagAttributes[name]
  }

  static addTagAttribute(name, call) {
    this.tagAttributes[name] = call
    return true
  }

  static nestingLevel(level) {
    if (!level || level <= 0) {
      return ''
    }
    return this.TAB.repeat(level)
  }

  static parserRules() {
    let rules = {}
    let blockRules = {}
    let inlineRules = {}

    let name

    let rule

    for (name in this.rules) {
      rule = Object.assign(this.rules[name])
      let match = rule.match
      if (!match) {

      } else if (typeof match == 'function') {
        rule.match = {exec: match}
      } else if (match instanceof Array) {
        rule.match = {
          exec(data) {
            var i
            for (i = 0; i < match.length; i++) {
              if (data.substr(0, match[i].length) == match[i]) {
                return match[i]
              }
            }
            return false
          }
        }
      } else if (!(match instanceof RegExp)) {
        rule.match = {
          exec(data) {
            return data.substr(0, match.length) == match
          }
        }
      }

      rules[name] = rule
      if (!match || rule.black) {

      } else if (rule.block) {
        blockRules[name] = rule
      } else if (rule.block === false) {
        inlineRules[name] = rule
      }
    }


    let priority = function(rules) {
      var array = []
      var rule
      for (let name in rules) {
        rule = rules[name]
        array.push({
          name,
          rule,
        })
      }
      array.sort(function(a, b) {
        return (a.rule.priority || 10) - (b.rule.priority || 10)
      })
      var results = {}
      var i
      for (i = 0; i < array.length; i++) {
        results[array[i].name] = array[i].rule
      }
      return results
    }

    this._rules = rules
    this._blockRules = priority(blockRules)
    this._inlineRules = priority(inlineRules)

    let replace = function(regexp) {
      return new RegExp(
        regexp.source
        .replace(/\{\{(\w+)\}\}/g, function(result, name) {
          if (!rules[name] || !(rules[name].match instanceof RegExp)) {
            return result
          }
          return rules[name].match.source
        }, regexp.flags)
      )
    }
    for (name in rules) {
      rule = rules[name]
      if (!(rule.match instanceof RegExp)) {
        rule.regexp = false
        continue
      }
      rule.regexp = true
      rule.match = replace(rule.match)
    }
  }

  static createElement(tag, nodeMarkdown) {
    return new this(null, Node.ELEMENT_NODE, tag, nodeMarkdown)
  }

  static createComment(data, nodeMarkdown) {
    return new this(data, Node.COMMENT_NODE, null, nodeMarkdown)
  }

  static createTextNode(data, nodeMarkdown) {
    return new this(data, Node.TEXT_NODE, null, nodeMarkdown)
  }

  children = []

  attributes = {}

  parentNode

  nodeType = 0

  nodeName = ''

  nodeValue

  nodeMarkdown = false

  constructor(nodeValue, nodeType, nodeName, nodeMarkdown) {
    this.nodeType = nodeType || Node.DOCUMENT_NODE
    if (typeof nodeValue == 'string') {
      this.nodeValue = nodeValue
    }
    if (nodeName) {
      this.nodeName = nodeName
    }
    if (nodeMarkdown) {
      this.nodeMarkdown = nodeMarkdown
    }
    if (this.nodeType == Node.DOCUMENT_NODE) {
      this.nodeMarkdown = true
      this.parser(String(this.nodeValue).split(this.constructor.NEWLINE_SPLIT))
    }
  }



  appendChild(node) {
    if (node.parentNode) {
      node.parentNode.removeChild(node)
    }
    node.parentNode = this;
    this.children.push(node)
    return node
  }

  insertBefore(node, reference) {
    if (!reference) {
      return this.appendChild(node);
    }
    var index = this.children.indexOf(reference)
    if (index == -1) {
      return node
    }
    if (node.parentNode) {
      if (node.parentNode == this) {
        index = this.children.indexOf(reference)
      }
      node.parentNode.removeChild(node)
    }
    node.parentNode = this
    this.children.splice(index, 0, node)
    return node
  }

  replaceChild(newNode, oldNode) {
    var index = this.children.indexOf(oldNode)
    if (index == -1) {
      return false
    }
    if (newNode.parentNode) {
      if (node.parentNode == this) {
        index = this.children.indexOf(newNode)
      }
      newNode.parentNode.removeChild(newNode)
    }
    newNode.parentNode = this
    this.children.splice(index, 0, newNode)
    if (oldNode.parentNode) {
      oldNode.parentNode.removeChild(oldNode)
    }
    return oldNode
  }

  removeChild(node) {
    var index = this.children.indexOf(node)
    if (index == -1) {
      return false
    }
    delete node.parentNode
    this.children.splice(index, 1)
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
    return this.children.length ? this.children[0] : null
  }

  lastChild() {
    return this.children.length ? this.children[this.children.length -1] : null
  }

  toHtmlAttribute() {
    var attributes = []
    var value
    for (var name in this.attributes) {
      if (this.constructor.tagAttributes[name]) {
        value = this.constructor.tagAttributes[name].call(this, this.attributes[name], name)
      } else {
        if (!this.nodeMarkdown) {
          continue
        }
        value = this.attributes[name]
      }
      if (value === false || value === null || value === undefined) {
        continue
      }
      attributes.push(value === true ? name : name + '="'+ this.constructor.escapeHtml(value) +'"')
    }
    return attributes.join(' ')
  }

  toHtml(option) {
    option = option || {}
    var result
    switch (this.nodeType) {
      case Node.DOCUMENT_NODE: {
        result = []
        for (var i = 0; i < this.children.length; i++) {
          result.push(this.children[i].toHtml(option))
        }
        return result.join(option.format ? this.constructor.NEWLINE : '')
      }
      case Node.ELEMENT_NODE: {
        var tagOption = this.constructor.tags[this.nodeName]
        if (!tagOption && !this.nodeMarkdown) {
          return ''
        }
        if (!option.level) {
          option.level = 1
        } else {
          option.level++
        }
        tagOption = tagOption || {}
        if (tagOption.toHtml) {
          result = tagOption.toHtml.call(this, option)
        } else {
          var attribute = this.toHtmlAttribute()
          if (attribute) {
            attribute = ' ' + attribute
          }
          var tab = option.format && !tagOption.inline ? this.constructor.NEWLINE + this.constructor.nestingLevel(option.level - 1) : ''
          if (tagOption.single) {
            result = tab + '<'+ this.nodeName + attribute +' />'
          } else {
            var children = ''
            for (var i = 0; i < this.children.length; i++) {
              children += this.children[i].toHtml(option)
            }
            result = tab + '<'+ this.nodeName + attribute +'>' + (children && tab && children.substr(0, tab.length) == tab ? children + tab : children) + '</'+ this.nodeName +'>'
          }
        }
        option.level--
        return result
      }
      case Node.COMMENT_NODE: {
        return '<!--'+ this.constructor.escapeHtml(this.nodeValue).replace(/[\[\]]/g, ' ') +'-->'
      }
      case Node.TEXT_NODE: {
        return this.constructor.escapeHtml(this.nodeValue)
      }
      default: {
        return ''
      }
    }
  }


  toText(option) {
    option = option || {}
    option.separator = option.separator || this.constructor.NEWLINE

    var result
    var text
    switch (this.nodeType) {
      case Node.DOCUMENT_NODE: {
        result = []
        for (var i = 0; i < this.children.length; i++) {
          text = this.children[i].toText(option)
            if (text) {
            result.push(text)
          }
        }
        return result.join(option.separator)
      }
      case Node.ELEMENT_NODE: {
        var tagOption = this.constructor.tags[this.nodeName] || {}
        result = []

        var lastChild = this.parentNode ? this.parentNode.lastChild() : null
        for (var i = 0; i < this.children.length; i++) {
          text = this.children[i].toText(option)
            if (text) {
            result.push(text)
          }
        }
        result = result.join('')
        if (result && !tagOption.inline && !tagOption.blackBlock && lastChild && lastChild != this) {
          result += option.separator
        }
        return result
      }
      case Node.TEXT_NODE: {
        return this.constructor.escapeHtml(this.nodeValue)
      }
      default: {
        return ''
      }
    }
  }

  parser(data, token) {
    if (!token) {
      token = new this.constructor.Token(this.constructor)
    }
    if (token.stacks.length >= this.constructor.NESTING) {
      return false
    }
    token.push(data)
    var stack = token.stack
    var match
    var node

    stack.block = true
    if (this.nodeType != Node.DOCUMENT_NODE) {
      var option = this.constructor.tags[this.nodeName]
      stack.block = option && !option.blackBlock && !option.inline
    }
    var line
    if (stack.block) {
      do {
        stack._index = stack.index
        match = this.blockMatch(token)
        if (match) {
          line = token.stack.line
          node = match.rule.parser.call(this, token, match.match)
          if (node) {
            this.appendChild(node)
          }
        }
      } while (stack.after && (stack.index != stack._index || token.next()))
    } else if(stack.after) {
      do {
        stack._index = stack.index
        match = this.matchInline(token)
        if (match) {
          node = match.rule.parser.call(this, token, match.match)
          if (node) {
            this.appendChild(node)
          }
        }
      } while (stack.after && (stack.index != stack._index || token.skip(1)))
    }
    token.pop()
    return true
  }

  blockMatch(token) {
    if (token.stack.ch != 0) {
      return false
    }
    var current = token.current()
    if (!current || !current.trimData) {
      return false
    }
    if (typeof current.blockMatch != 'undefined') {
      return current.blockMatch
    }
    current.blockMatch = false
    var rules = this.constructor._blockRules
    var name
    var rule
    var match
    var data
    var line
    var i
    for (name in rules) {
      rule = rules[name]
      if (token.blackList[name]) {
        continue
      }
      if (this.nodeType != Node.DOCUMENT_NODE && rule.blackNesting) {
        continue
      }
      data = rule.trim == false ? current.data : current.trimData
      if (rule.line && rule.line > 1) {
        for (i = 1; i < rule.line; i++) {
          if (!(line = token.getLine(token.stack.line + i)) || !line.trimData) {
            break
          }
          data += this.constructor.NEWLINE + (rule.trim ? line.data : line.trimData)
        }
        if (!line) {
          continue
        }
      }
      if (rule.regexp) {
        match = rule.match.exec(data)
      } else {
        match = rule.match.exec.call(this, data)
      }
      if (match) {
        current.blockMatch = {
          name,
          rule,
          match
        }
        return current.blockMatch
      }
    }
    return current.blockMatch
  }
  matchInline(token) {
    var rules = this.constructor._inlineRules
    var name
    var rule
    var match
    var data
    var line
    var i
    var after = token.stack.after
    for (name in rules) {
      rule = rules[name]
      if (token.blackList[name]) {
        continue
      }
      if (rule.regexp) {
        match = rule.match.exec(after)
      } else {
        match = rule.match.exec.call(this, after)
      }
      if (match) {
        return {
          name,
          rule,
          match
        }
      }
    }
  }
}


class Token {

  stacks = [
  ]

  stack

  node = Node

  blackList = {}

  constructor(node) {
    if (node) {
      this.node = node
    }
    if (!node._rules) {
      node.parserRules()
    }
  }

  push(after) {
    var lines
    if (typeof after == 'object') {
      lines = after
      after = after.join(this.node.NEWLINE)
    } else {
      lines = after.split(this.node.NEWLINE)
    }
    var linesLength = []
    for (var i = 0; i < lines.length; i++) {
      linesLength[i] = lines[i].length
    }
    var key = this.stacks.push({
      before : '',
      skip: '',
      after,
      lines,
      linesLength,
      index: 0,
      ch: 0,
      line: 0,
      block: true,
    })
    this.stack = this.stacks[key - 1]
  }


  pop() {
    var pop = this.stacks.pop()
    this.stack = this.stacks.length ? this.stacks[this.stacks.length - 1] : null
    return pop
  }

  getLine(line) {
    if (typeof this.stack.lines[line] == 'string') {
      var data = this.stack.lines[line]
      var trim = data.match(this.node._rules.trim.match)
      this.stack.lines[line] = {data, trimData: trim[2], ltrimLength: trim[1].length, rtrimLength: trim[3].length, spacelength: trim[1].replace(/\t/g, '    ').length}
    }
    return this.stack.lines[line]
  }

  current() {
    return this.getLine(this.stack.line)
  }

  next() {
    var index = this.indexOf(this.node.NEWLINE)
    if (index == -1) {
      if (this.stack.after) {
        this.skip(this.stack.after.length)
      }
      return false
    }
    if (this.stack.after[index] == '\r' && this.stack.after[index + 1] == '\n') {
      index++
    }
    index++
    this.skip(index)
    return this.stack.line
  }


  skip(index) {
    if (index < 0 || this.stack.after.length < index) {
      return false
    }

    if (!index) {
      return true
    }
    // 索引偏移
    this.stack.index += index

    // 跳过的数据
    this.stack.skip = this.stack.after.substr(0, index)

    // 之前已处理的
    this.stack.before += this.stack.skip

    // 之后需要处理的
    this.stack.after = this.stack.after.substr(index)

    // ch 偏移
    this.stack.ch += index

    // 跳过的行数等
    while (this.stack.ch >= (this.stack.linesLength[this.stack.line] + this.node.NEWLINE.length)) {
      this.stack.ch -= this.stack.linesLength[this.stack.line] + this.node.NEWLINE.length
      this.stack.line++
    }
    return true
  }


  search(regexp) {
    return this.stack.after.search(regexp)
  }

  indexOf(searchvalue, fromindex) {
    return this.stack.after.indexOf(searchvalue, fromindex)
  }

  exec(regexp) {
    return regexp.exec(this.stack.after)
  }

  test(regexp) {
    return regexp.test(this.stack.after)
  }

  match(regexp) {
    return this.stack.after.match(regexp)
  }
}


const Html = {
  TAG_NAME: /[ \t\r\n\0\x0B\u00a0\/>]/,

  TAG_END: /[ \t\r\n\0\x0B\u00a0>]/,

  text(tokenHtml, token) {
    if (!tokenHtml.text) {
      return
    }
    if (!tokenHtml.text.trim()) {
      tokenHtml.text = ''
      return
    }
    if (tokenHtml.markdown) {
      tokenHtml.parentNode.parser(tokenHtml.text.replace(/</g, '&lt;').replace(/>/g, '&gt;'), token)
    } else {
      tokenHtml.parentNode.appendChild(new tokenHtml.node(tokenHtml.text, Node.TEXT_NODE))
    }
    tokenHtml.text = ''
  },


  push(tokenHtml, node, option) {

    // 父级的 节点
    tokenHtml.parentsNode.push(tokenHtml.parentNode)
    tokenHtml.parentNode = node

    // 父级的标签名
    tokenHtml.parentName && tokenHtml.parentsName.push(tokenHtml.parentName)
    tokenHtml.parentName = node.nodeName

    // 父级是否允许块标签
    tokenHtml.parentsBlock.push(tokenHtml.parentBlock)
    if (tokenHtml.parentBlock && (option.blackBlock || (option.inline && !option.block))) {
      tokenHtml.parentBlock = false
    }

    // 白名单
    tokenHtml.parentsWhiteList.push(tokenHtml.whiteList)
    if (option.whiteList) {
      if (tokenHtml.whiteList) {
        var whiteList = tokenHtml.whiteList
        tokenHtml.whiteList = Object.assign({}, option.whiteList)
        for (var key in tokenHtml.whiteList) {
          if (!whiteList[key]) {
            delete tokenHtml.whiteList[key]
          }
        }
      } else {
        tokenHtml.whiteList = option.whiteList
      }
    }

    // 黑名单
    tokenHtml.parentBlackList.push(option.blackList || {})
    tokenHtml.blackList = Object.assign({}, ...tokenHtml.parentBlackList)
  },


  pop(tokenHtml, token, tagName) {
    if (!tokenHtml.parentsNode.length || tokenHtml.parentNode.nodeType != Node.ELEMENT_NODE) {
      return false
    }
    if (tagName && tagName != tokenHtml.parentNode.nodeName) {
      return false
    }

    this.text(tokenHtml, token)

    tokenHtml.parentNode = tokenHtml.parentsNode.pop()
    tokenHtml.parentName = tokenHtml.parentsName.pop()
    tokenHtml.parentBlock = tokenHtml.parentsBlock.pop()
    tokenHtml.whiteList = tokenHtml.parentsWhiteList.pop()
    tokenHtml.parentBlackList.pop()
    tokenHtml.blackList = Object.assign({}, ...tokenHtml.parentBlackList)
    return true
  },


  parser(node, token, markdown) {
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

      markdown,
    }

    token.endTagRegExp = token.endTagRegExp || {}

    var tagName

    var attributes = {}
    var attributeName
    var attributeValue
    var key
    var node
    var index
    var char
    var stack = token.stack
    var option

    var parentNode = node
    do {
      if (parentNode.nodeName) {
        tokenHtml.baseNesting.push(parentNode)
      }
      parentNode = parentNode.parentNode
    } while (parentNode && parentNode.nodeName);
    tokenHtml.baseNesting.reverse()


    for (var i = 0; i < tokenHtml.baseNesting.length; i++) {
      node = tokenHtml.baseNesting[i]
      option = tokenHtml.node.tags[node.nodeName]
      if (!option) {
        continue
      }
      if (tokenHtml.baseBlock && (option.blackBlock || (option.inline && !option.block))) {
        tokenHtml.baseBlock = false
      }

      // 白名单
      if (option.whiteList) {
        if (tokenHtml.baseBlackList) {
          for (key in tokenHtml.baseBlackList) {
            if (!option.whiteList[key]) {
              delete tokenHtml.baseBlackList[key]
            }
          }
        } else {
          tokenHtml.baseBlackList = Object.assign({}, option.whiteList)
        }
      }

      // 黑名单
      Object.assign(tokenHtml.baseBlackList, option.blackList)
    }


    while ((index = token.indexOf('<')) != -1 && (tokenHtml.parentsNode.length || !tagName || (tokenHtml.baseBlock && token.search(/^.*(<\!--|<\/?[a-zA-Z].*>)/) != -1))) {
      if (index) {
        tokenHtml.text += stack.after.substr(0, index)
      }
      token.skip(index + 1)
      char = stack.after.charAt(0)

      // 最后了
      if (!char) {
        tokenHtml.text += '<'
        continue
      }

      // 注释
      if (char == '!') {
        if (stack.after.substr(0, 3) == '!--') {
          token.skip(3)
          index = token.indexOf('-->')
          token.skip(index == -1 ? stack.after.length : index + 3)
          this.text(tokenHtml, token)
          tokenHtml.parentNode.appendChild(new tokenHtml.node(stack.skip.substr(0, stack.skip.length - 3), Node.COMMENT_NODE))
        } else {
          tokenHtml.text += '<'
        }
        continue
      }


      // 结束标签
      if (char == '/') {
        index = token.indexOf('>')
        tagName = index == -1 ? stack.after.substr(1) : stack.after.substr(1, index - 1)
        tagName = tagName.trim().toLowerCase()
        if (tagName) {
          token.skip(index == -1 ? stack.after.length : index + 1)
          this.pop(tokenHtml, token, tagName)
        } else {
          tokenHtml.text = '<'
        }
        continue
      }

      // 不是标签
      if (char < 'a' && char > 'z' && char < 'A' && char > 'Z') {
        continue
      }

      // 没结束
      index = token.search(this.TAG_NAME)
      if (index == -1) {
        break;
      }

      tagName = stack.after.substr(0, index).trim().toLowerCase()

      char = stack.after.charAt(index)
      token.skip(index + 1)

      attributes = {}
      while (index != -1 && char != '>' && (index = token.search(/[=>]/)) != -1) {
        attributeName = stack.after.substr(0, index)
        char = stack.after.charAt(index)
        token.skip(index + 1)
        if (char == '>') {
          // 只有参数没有值的
          index = attributeName.indexOf('/')
          if (index != -1) {
            attributeName = attributeName.substr(0, index)
          }
          attributeValue = true
        } else {
          attributeValue = ''
          index = 0
          char = ''
          while (char = stack.after.charAt(index)) {
            ++index
            if (char == '>') {
              break
            } else if (char == '"' || char == "'") {
              token.skip(index)
              index = token.indexOf(char)
              attributeValue = index == -1 ? stack.after : stack.after.substr(0, index)
              token.skip(index == -1 ? stack.after.length : index + 1)
              break
            } else if (char = char.trim()) {
              token.skip(index)
              index = token.search(tokenHtml.TAG_END)
              attributeValue = index == -1 ? stack.after : stack.after.substr(0, index)
              token.skip(index == -1 ? stack.after.length : index + 1)
              break
            }
          }
        }
        attributeName = attributeName.trim().toLowerCase()
        if (tokenHtml.node.tagAttributes[attributeName]) {
          attributes[attributeName] = attributeValue
        }
      }

      if ((tokenHtml.parentsNode.length + tokenHtml.baseNesting.length) >= tokenHtml.node.NESTING) {
        continue
      }

      option = tokenHtml.node.tags[tagName]
      if (!option) {
        continue
      }

      if (option.black) {
        if (option.text) {
          if (!token.endTagRegExp[tagName]) {
            token.endTagRegExp[tagName] = new RegExp('<\/' + tagName + '(>|\s)')
          }
          index = token.search(token.endTagRegExp[tagName], '')
          // 插入文本
          if (index != -1) {
            index = token.indexOf('>', index)
          }
          token.skip(index == -1 ? stack.after.length : index + 1)
        }
        continue
      }

      // 不能重复 a 标签
      if (token.blackList.link && tagName == 'a') {
        continue
      }

      // 基础块
      if (!tokenHtml.baseBlock && !option.inline) {
        continue
      }

      // 基础白名单
      if (tokenHtml.baseWhiteList && !tokenHtml.baseWhiteList[tagName]) {
        continue
      }

      // 基础黑名单
      if (tokenHtml.baseBlackList[tagName]) {
        continue
      }

      // 嵌套白名单
      if (tokenHtml.whiteList && !tokenHtml.whiteList[tagName]) {
        continue
      }

      // 基础连续嵌套
      if (option.blackContinuity && tokenHtml.baseName == tagName && tokenHtml.parentsNode.length == 0) {
        continue
      }


      node = tokenHtml.node.createElement(tagName)
      node.setAttributes(attributes)

      this.text(tokenHtml, token)

      // inline 里面不能嵌套 block
      while (!tokenHtml.parentBlock && !option.inline && this.pop(tokenHtml, token)) {
      }

      // 不能连续嵌套的
      if (option.blackContinuity && tokenHtml.parentName == tagName && this.pop(tokenHtml, token)) {
      }

      // 嵌套黑名单
      while (tokenHtml.blackList[tagName] && this.pop(tokenHtml, token)) {
      }

      tokenHtml.parentNode.appendChild(node)

      // 单标签
      if (option.single) {
        continue
      }

      // 字符串标签里面不允许嵌套任何标签的
      if (option.text) {
        index = token.search(new RegExp('<\/' + tagName), '')
        // 插入文本
        node.appendChild(tokenHtml.node.createTextNode(index == -1 ? stack.after : stack.after.substr(0, index)))
        if (index != -1) {
          index = token.indexOf('>', index)
        }
        token.skip(index == -1 ? stack.after.length : index + 1)
        continue
      }

      this.push(tokenHtml, node, option)
    }
    if (tokenHtml.baseBlock) {
      var data = token.current().data
      if (data.length > stack.ch) {
        tokenHtml.text += data.substr(stack.ch)
      }
      this.text(tokenHtml, token)
      token.next()
    } else {
      this.text(tokenHtml, token)
    }
  }
}






Node.Html = Html
Node.Token = Token
module.exports = Node;






Node.addRule('newline', {match: /\n/})
Node.addRule('space', {match: /[ \u00a0]/})
Node.addRule('tab', {match: /(?:    |\t)/})
Node.addRule('blank', {match:/(?:{{newline}}|{{space}}|\t)/})
Node.addRule('trim', {match:/^((?:{{space}}|{{tab}})*)(.*?)((?:{{space}}|{{tab}})*)$/})
Node.addRule('escapeChar', {match: /[{}\[\]()<>'+\-\\`*:#!_~@$'.]/})

Node.addRule('grave', {match: /`/})
Node.addRule('tilde', {match: /~/})
Node.addRule('gt', {match: />/})
Node.addRule('lt', {match: /</})
Node.addRule('number', {match: /\#/})
Node.addRule('asterisk', {match: /\*/})
Node.addRule('minus', {match: /\-/})
Node.addRule('plus', {match: /\+/})
Node.addRule('equals', {match: /\=/})
Node.addRule('colon', {match: /\:/})
Node.addRule('lowbar', {match: /_/})
Node.addRule('verbar', {match: /\|/})
Node.addRule('doc', {match: /\./})
Node.addRule('backslash', {match: /\\/})
Node.addRule('commat', {match: /\@/})
Node.addRule('dollar', {match: /\$/})

Node.addRule('apos', {match: /'/})
Node.addRule('quot', {match: /"/})
Node.addRule('quote', {match: /(?:{{quot}}|{{apos}})/})
Node.addRule('escapeCharAll', {match: /{{escapeChar}}/g})
Node.addRule('escapeBackslash', {match: /[\s\S]*?[^\\](?:\\\\)*/})





Node.addRule('blockCode', {
  match: /^{{tab}}{{space}}*(?!{{space}}.)|^({{grave}}{3,}|{tilde}}{3,}){{space}}*(.*)/,
  block: true,
  priority: 0,
  trim: false,
  parser(token, match) {
    var value = []
    var current

    if (match[1]) {
      while (token.next()) {
        current = token.current()
        if (current.trimData == match[1] && current.spacelength < 4) {
          token.next()
          break
        }
        value.push(current.trimData ? current.data : '')
      }
    } else {
      do {
        current = token.current()
        if (current.trimData && current.spacelength < 4) {
          break
        }
        value.push(current.trimData ? (current.data.substr(current.data.charAt(0) == '\t' ? 1 : (current.ltrimLength > 4 ? 4 : current.ltrimLength))) : '')
      } while (token.next())
    }

    var pre = this.constructor.createElement('pre', true)
    var code = this.constructor.createElement('code', true)
    var text = this.constructor.createTextNode(this.constructor.escapeHtml(value.join(this.constructor.NEWLINE), true), true)
    pre.appendChild(code)
    code.appendChild(text)
    if (match[1]) {
      pre.attributes.class = 'highlight highlight-source-' + match[2].toLowerCase().replace(/[^0-9a-z_-]/g, '')
    }
    return pre
  },
})




Node.addRule(
  'blockTag',
  {
    match(data) {
      if (!this.constructor._rules.blockTag.matchRegexp) {
        var names = []
        var tag
        for (var name in this.constructor.tags) {
          tag = this.constructor.tags[name]
          if (tag && (!tag.inline || tag.block)) {
            names.push(name)
          }
        }
        this.constructor._rules.blockTag.matchRegexp = new RegExp('^<(?:'+ names.join('|') +')(?:|\\s.*?)>', 'i')
      }
      return this.constructor._rules.blockTag.matchRegexp.test(data)
    },
    block: true,
    priority: 5,
    parser(token, match) {
      return this.constructor.Html.parser(this, token)
    },
  }
)




Node.addRule(
  'blockquote',
  {
    match: /^{{space}}*({{gt}})/,
    block: true,
    priority: 10,
    parser (token, match) {
      var value = []
      var current
      var empty
      do {
        current = token.current()
        if (!current.trimData) {
          if (empty) {
            break
          }
          empty = true
          value.push(current.trimData)
        } else {
          if (empty && (current.spacelength >= 4 || current.trimData.charAt(0) != match[1])) {
            break
          }
          if (current.spacelength < 4) {
            value.push(current.trimData[0] == match[1] ? current.trimData.substr(1) : current.trimData)
          } else {
            value.push(current.data)
          }
        }
      } while (token.next())
      var blockquote = this.constructor.createElement('blockquote', true)
      blockquote.parser(value, token)
      return blockquote
    },
  }
)




Node.addRule(
  'header',
  {
    match: /^({{number}}{1,6}){{space}}(.*?)\#*$/,
    block: true,
    priority: 15,
    parser(token, match) {
      var node = this.constructor.createElement('h' + match[1].length, true)
      token.next()
      node.parser(match[2], token)
      var id = this.constructor.escapeId(node.toText())
      if (id) {
        node.attributes.id = 'content-' + id
      }
      return node
    },
  }
)




Node.addRule(
  'headerAtx',
  {
    match: /^(.+){{newline}}{{space}}?({{equals}}|{{minus}}){{space}}?(?:\2{{space}}?)+$/,
    line: 2,
    block: true,
    priority: 16,
    parser(token, match) {
      var node = this.constructor.createElement('h' + (this.constructor._rules.equals.match.test(match[2]) ? '1' : '2'), true)
      token.next()
      token.next()

      node.parser(match[1], token)
      var id = this.constructor.escapeId(node.toText())
      if (id) {
        node.attributes.id = 'content-' + id
      }
      return node
    },
  }
)


Node.addRule(
  'list',
  {
    match:/^(?:({{asterisk}}|{{plus}}|{{minus}})|(\d+{{doc}})){{space}}(.*)$/,
    block: true,
    priority: 25,
    parser(token, match) {
      var node = this.constructor.createElement(match[2] ? 'ol' : 'ul', true)

      var list = []
      var isP = []
      var li = [match[3]]
      var current
      var empty
      var blockMatch

      var li = [match[3]]

      while (token.next()) {
        current = token.current()
        if (!current.trimData) {
          // 空行
          li.push('')
        } else if (li.length && current.spacelength > 1) {
          // 行跳格大于 1
          li.push(current.data.substr(current.data.charAt(0) == '\t' ? 1 : (current.data.charAt(1) == '\t' ? 2 : (current.ltrimLength > 4 ? 4 : current.ltrimLength))))
        } else {
          blockMatch = this.blockMatch(token)
          if (!blockMatch) {
            break
          } else if (empty && blockMatch.name != 'list') {
            break
          } else if (blockMatch.name == 'blockText') {
            li.push(current.trimData)
          } else if (blockMatch.name == 'list' && blockMatch.match[1] == match[1] && Boolean(blockMatch.match[2]) == Boolean(match[2])) {
            if (li.length > 1 && li.indexOf('') != -1) {
              isP.push(true)
              li.pop()
            } else {
              isP.push(false)
            }
            list.push(li)
            li = [blockMatch.match[3]]
          } else {
            break
          }
        }
        empty = !current.trimData
      }

      if (li.length > 1 && !li[li.length - 1]) {
        li.pop()
      }

      list.push(li)
      isP.push(isP[isP.length -1])

      var child
      for (var i = 0; i < list.length; i++) {
        li = this.constructor.createElement('li', true)
        li.parser(list[i], token)
        node.appendChild(li)
        if (!isP[i] && (child = li.children[0]) && child.nodeName == 'p' && child.nodeMarkdown) {
          while (child.children.length) {
            li.insertBefore(child.children[0], child)
          }
          li.removeChild(child)
        }
        node.appendChild(li)
      }
      return node
    },
  }
)



Node.addRule(
  'table',
  {
    match:/^{{verbar}}?(?:.*?{{verbar}})+.*?{{newline}}{{verbar}}?(?:{{space}}*(?:{{colon}}|{{minus}})+{{space}}*{{verbar}})+(?:{{space}}*(?:{{colon}}|{{minus}})+)?$/,
    line: 2,
    block: true,
    priority: 20,
    parser(token, match) {
      var data
      var index
      var char
      var text = ''

      // 表头
      var thead = []
      data  = token.current().trimData

      while ((index = data.search(/[\\|]/)) != -1) {
        char = data.charAt(index)
        if (char == '\\') {
          text += data.substr(0, index + 2)
          data = data.substr(index + 2)
          continue
        }
        text += data.substr(0, index)
        data = data.substr(index + 1)
        thead.push(text ? text.match(this.constructor._rules.trim.match)[2] : text)
        text = ''
      }
      text += data
      thead.push(text ? text.match(this.constructor._rules.trim.match)[2] : text)
      if (thead.length > 1 && !thead[0]) {
        thead.shift()
      }
      if (thead.length > 1 && !thead[thead.length -1]) {
        thead.pop()
      }
      token.next()


      // 位置
      var align = token.current().trimData.split('|')
        .map(value => value.match(this.constructor._rules.trim.match)[2])
      if (align.length > 1 && !align[0]) {
        align.shift()
      }
      if (align.length > 1 && !align[align.length -1]) {
        align.pop()
      }
      align = align.map(function(value) {
        if (!value) {
          return ''
        }
        var left = value.charAt(0) == ':'
        var right = value.charAt(value.length - 1) == ':'
        if (right && left) {
          return 'text-align:center;'
        }
        if (left) {
          return 'text-align:left;'
        }
        if (right) {
          return 'text-align:right;'
        }
        return ''
      })


      // 表内容
      var tbody = []
      var tr = []

      var blockMatch
      while (token.next()) {
        blockMatch = this.blockMatch(token)
        if (!blockMatch || ['table', 'blockCode', 'headerAtx', 'blockText'].indexOf(blockMatch.name) == -1) {
          break
        }
        tr = []
        text = ''
        data = token.current().trimData
        while ((index = data.search(/[\\|]/)) != -1) {
          char = data.charAt(index)
          if (char == '\\') {
            text += data.substr(0, index + 2)
            data = data.substr(index + 2)
            continue
          }
          text += data.substr(0, index)
          data = data.substr(index + 1)
          tr.push(text ? text.match(this.constructor._rules.trim.match)[2] : text)
          text = ''
        }
        text += data
        tr.push(text ? text.match(this.constructor._rules.trim.match)[2] : text)
        if (tr.length > thead.length && !tr[0]) {
          tr.shift()
        }
        if (tr.length > thead.length && !tr[tr.length -1]) {
          tr.pop()
        }
        tbody.push(tr)
      }
      var tableElement = this.constructor.createElement('table', true)
      var theadElement = this.constructor.createElement('thead', true)
      var tbodyElement = this.constructor.createElement('tbody', true)
      var trElement
      var thElement
      var tdElement

      tableElement.appendChild(theadElement)
      tableElement.appendChild(tbodyElement)



      // 表头
      trElement = this.constructor.createElement('tr', true)
      theadElement.appendChild(trElement)

      for (var i = 0; i < thead.length; i++) {
        thElement = this.constructor.createElement('th', true)
        if (align[i]) {
          thElement.attributes.style = align[i]
        }
        thElement.parser(thead[i], token)
        trElement.appendChild(thElement)
      }


      // 表内容
      for (var row = 0; row < tbody.length; row++) {
        trElement = this.constructor.createElement('tr', true)
        for (var col = 0; col < thead.length; col++) {
          tdElement = this.constructor.createElement('td', true)
          if (tbody[row][col]) {
            tdElement.parser(tbody[row][col], token)
          }
          if (align[col]) {
            tdElement.attributes.style = align[col]
          }
          trElement.appendChild(tdElement)
        }
        tbodyElement.appendChild(trElement)
      }
      return tableElement
    },
  }
)



Node.addRule(
  'toc',
  {
    match:/^\[TOC\]$/,
    block: true,
    blackNesting: true,
    priority: 30,
    parser(token, match) {
      var node = this.constructor.createElement('toc', true)
      node.attributes.class = 'toc'
      token.next()
      return node
    },
  },
)


Node.addTag(
  'toc',
  {
    black: true,
    toHtml(options) {
      this.nodeName = 'ul'
      var parentNode = this.parentNode
      var ul = this
      var li
      var a
      var level
      var level2
      var node
      for (var i = 0; i < parentNode.children.length; i++) {
        node = parentNode.children[i]
        if (node.nodeMarkdown && ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(node.nodeName) != -1) {
          level2 = parseInt(node.nodeName.substr(1))
          if (level) {
            if (level2 > level) {
              ul = ul.appendChild(this.constructor.createElement('ul', true))
            } else if (level2 < level && ul != this) {
              while (level2 < level && ul != this) {
                level--
                ul = ul.parentNode
              }
            }
          }
          level = level2
          li = this.constructor.createElement('li', true)
          a = this.constructor.createElement('a', true)
          a.attributes.href = '#' + node.attributes.id

          a.appendChild(this.constructor.createTextNode(node.toText().trim()))
          li.appendChild(a)
          ul.appendChild(li)
        }
      }
      return this.toHtml(options);
    }
  }
)


Node.addRule(
  'hr',
  {
    match: /^({{asterisk}}|{{minus}}|{{lowbar}}){{space}}?(?:\1{{space}}?){2,}$/,
    block: true,
    priority: 35,
    parser(token, match) {
      var node = this.constructor.createElement('hr', true)
      token.next()
      return node
    },
  }
)


Node.addRule(
  'footnote',
  {
    match: /^\[\^([^\[\]]*)\]\:{{space}}*(.*)/,
    block: true,
    blackNesting: true,
    priority: 40,
    parser(token, match) {
      var node = this.constructor.createElement('footnote', true)
      var value = [match[2]]
      var blockMatch
      while (token.next()) {
        blockMatch = this.blockMatch(token)
        if (!blockMatch || ['blockCode', 'headerAtx', 'blockText'].indexOf(blockMatch.name) == -1) {
          break
        }
        value.push(token.current().data)
      }
      node.attributes.name = match[1].toLowerCase()
      node.attributes.id = this.constructor.escapeId(node.attributes.name)
      node.parser(value, token)
      return node
    },
  }
)
Node.addTag(
  'footnote',
  {
    black: true,
    blackBlock: true,
    toHtml(options) {
      if (!this.children.length) {
        return ''
      }
      var node = this.parentNode.lastChild()
      if (node && !node.footnotes) {
        node = this.constructor.createElement('ol', true)
        node.attributes.class = 'footnotes'
        node.footnotes = true
        this.parentNode.appendChild(node)
      }

      var li = node.appendChild(this.constructor.createElement('li', true))
      var a = this.constructor.createElement('a')

      li.attributes.id = 'footnote-' + this.attributes.id
      while (this.children.length) {
        li.appendChild(this.children[0])
      }
      li.appendChild(a)
      a.attributes.class = 'reverse-footnote'
      a.attributes.href = '#refnote-' + this.attributes.id
      return ''
    }
  }
)


Node.addRule(
  'reflinktitle',
  {
    match: /^(?:{{lt}}|{{quote}})(.*)(?:{{gt}}|{{quote}})$/
  }
)


Node.addRule(
  'reflink',
  {
    match: /^\[([^\^\[\]]*)\]\:{{space}}*(.+?){{space}}*(?:{{space}}+(?:{{lt}}|{{quote}})(.*)({{gt}}|{{quote}}))?$/,
    block: true,
    blackNesting: true,
    priority: 45,
    parser(token, match) {
      var node = this.constructor.createElement('reflink', true)
      node.attributes.name = match[1].toLowerCase()
      node.attributes.link = match[2]
      if (match[3]) {
        node.attributes.title = match[3]
        token.next()
      } else if (token.next()) {
        var title = token.current().trimData.match(this.constructor._rules.reflinktitle.match)
        if (title) {
          node.attributes.title = title[1]
          token.next()
        }
      }
      return node
    },
  }
)

Node.addTag(
  'reflink',
  {
    black: true,
    blackBlock: true,
    toHtml() {
      return ''
    }
  }
)


Node.addRule(
  'blockText',
  {
    match() {
      return true
    },
    priority: 999,
    block: true,
    parser(token) {
      var node = this.constructor.createElement('p', true)
      var value = [token.current().data]

      var blockMatch
      var empty = false
      while (token.next()) {
        blockMatch = this.blockMatch(token)
        if (!blockMatch || ['blockCode', 'headerAtx', 'blockText'].indexOf(blockMatch.name) == -1) {
          break
        }
        value.push(token.current().data)
      }
      node.parser(value, token)
      return node
    }
  }
)


Node.addRule(
  'escapeText',
  {
    match: /^\\({{escapeChar}})/,
    block: false,
    priority: 0,
    parser(token, match) {
      token.skip(match[0].length)
      var lastChild = this.lastChild()
      if (!lastChild || lastChild.nodeType != Node.TEXT_NODE) {
        var node = this.constructor.createTextNode(match[1], true)
        return node
      }
      lastChild.nodeValue += match[1]
    }
  }
)


Node.addRule(
  'tag',
  {
    match(data) {
      if (!this.constructor._rules.tag.matchRegexp) {
        var names = []
        var tag
        for (var name in this.constructor.tags) {
          tag = this.constructor.tags[name]
          if (tag && tag.inline && !tag.block) {
            names.push(name)
          }
        }
        this.constructor._rules.tag.matchRegexp = new RegExp('^<(?:'+ names.join('|') +')(?:|\\s.*?)>', 'i')
      }
      return this.constructor._rules.tag.matchRegexp.test(data)
    },
    block: false,
    priority: 5,
    parser(token) {
      return this.constructor.Html.parser(this, token, true)
    }
  }
)

Node.addRule(
  'comment',
  {
    match: /^<\!--([\s\S]*?)-->/,
    block: false,
    priority: 15,
    parser(token, match) {
      var node = this.constructor.createComment(match[1], true)
      token.skip(match[0].length)
      return node
    }
  }
)




Node.addRule(
  'code',
  {
    match: /^(({{grave}})+)([\s\S]*?(?!\1)[\s\S])\2(?!\1)/,
    block: false,
    priority: 20,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('code', true)
      node.appendChild(this.constructor.createTextNode(this.constructor.escapeHtml(match[3], true), true))
      return node
    }
  }
)




Node.addRule(
  'strong',
  {
    match: /^(({{lowbar}}|{{asterisk}}){2})({{escapeBackslash}})\1(?!\2)/,
    block: false,
    priority: 25,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('strong', true)
      token.blackList.strong = true
      node.parser(match[3], token)
      token.blackList.strong = false
      return node
    }
  }
)


Node.addRule(
  'em',
  {
    match: /^({{lowbar}}|{{asterisk}})({{escapeBackslash}})\1(?!\1)/,
    block: false,
    priority: 30,
    parser(token, match) {
      token.skip(match[0].length)

      var node = this.constructor.createElement('em', true)
      token.blackList.em = true
      node.parser(match[2], token)
      token.blackList.em = false
      return node
    }
  }
)

Node.addRule(
  'del',
  {
    match: /^(({{tilde}}){2})({{escapeBackslash}})\1(?!\2)/,
    block: false,
    priority: 35,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('del', true)
      token.blackList.del = true
      node.parser(match[3], token)
      token.blackList.del = false
      return node
    }
  }
)



Node.addRule(
  'refnote',
  {
    match: /^\[\^([^\[\]]*)\]/,
    block: false,
    priority: 40,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('refnote', true)
      node.attributes.name = match[1].toLowerCase()
      node.nodeValue = match[0]
      return node
    }
  }
)

Node.addTag(
  'refnote',
  {
    inline: true,
    black: true,
    toHtml(options) {
      var parentNode = this.parentNode
      while (parentNode.parentNode && parentNode.nodeType != Node.DOCUMENT_NODE) {
        parentNode = parentNode.parentNode
      }
      var text = 0
      var node
      for (var i = 0; i < parentNode.children.length; i++) {
        node = parentNode.children[i]
        if (node.nodeName == 'footnote') {
          text++
          if (node.attributes.name == this.attributes.name) {
            delete this.attributes.name
            this.nodeName = 'sup'
            this.attributes.class = 'refnote'
            this.attributes.id = 'refnote-' + node.attributes.id

            var a = this.constructor.createElement('a')
            a.attributes.href = '#footnote-' + node.attributes.id
            a.appendChild(this.constructor.createTextNode('[' +text.toString() + ']'))
            this.appendChild(a)
            return this.toHtml(options)
          }
        }
      }
      this.nodeType = Node.TEXT_NODE
      this.nodeName = ''
      return this.toHtml(options)
    }
  }
)



Node.addRule(
  'linkAndImage',
  {
    match: /\[((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*)\]{{blank}}?(?:\({{blank}}*{{lt}}?(.*?){{gt}}?(?:{{blank}}+{{quote}}(.*?){{quote}})?{{blank}}*\)|\[([^\^\[\]]*)\])/,
  }
)

Node.addRule(
  'image',
  {
    match: /^\!{{linkAndImage}}/,
    block: false,
    priority: 45,
    parser(token, match) {
      token.skip(match[0].length)
      var isRef = typeof match[4] == 'string'
      var node = this.constructor.createElement(isRef ? 'refimg' : 'img', true)
      if (match[1]) {
        node.attributes.alt = match[1]
      }


      if (isRef) {
        node.attributes.name = match[4].toLowerCase()
        node.nodeValue = match[0]
      } else {
        node.attributes.src = match[2]
        if (match[3]) {
          node.attributes.title = match[3]
        }
      }
      return node
    }
  }
)

Node.addTag(
  'refimg',
  {
    black: true,
    inline: true,
    toHtml(options) {
      var parentNode = this.parentNode
      while (parentNode.parentNode && parentNode.nodeType != Node.DOCUMENT_NODE) {
        parentNode = parentNode.parentNode
      }
      var node
      for (var i = 0; i < parentNode.children.length; i++) {
        node = parentNode.children[i]
        if (node.nodeName == 'reflink' && node.attributes.name == this.attributes.name) {
          this.nodeName = 'img'
          delete this.attributes.name
          this.attributes.src = node.attributes.link
          this.attributes.title = node.attributes.title
          return this.toHtml(options)
        }
      }
      this.nodeType = Node.TEXT_NODE
      this.nodeName = ''
      return this.toHtml(options)
    }
  }
)


Node.addRule(
  'link',
  {
    match: /^{{linkAndImage}}/,
    block: false,
    priority: 50,
    parser(token, match) {
      var parentNode = this
      token.skip(match[0].length)
      do {
        if (parentNode.nodeName == 'a') {
          var lastChild = this.lastChild()
          if (!lastChild || lastChild.nodeType != Node.TEXT_NODE) {
            var node = this.constructor.createTextNode(match[0], true)
            return node
          }
          lastChild.nodeValue += match[0]
          return
        }
        parentNode = parentNode.parentNode
      } while (parentNode && parentNode.parentNode && parentNode.nodeType != Node.DOCUMENT_NODE);


      var isRef = typeof match[4] == 'string'
      var node = this.constructor.createElement(isRef ? 'refa' : 'a', true)
      if (isRef) {
        node.attributes.name = match[4].toLowerCase()
        node.nodeValue = match[0]
      } else {
        node.attributes.href = match[2]
        if (match[3]) {
          node.attributes.title = match[3]
        }
      }

      token.blackList.link = true
      token.blackList.autoLink = true
      token.blackList.url = true
      token.blackList.refnote = true
      node.parser(match[1], token)
      token.blackList.link = false
      token.blackList.autoLink = false
      token.blackList.url = false
      token.blackList.refnote = false
      return node
    }
  }
)
Node.addTag(
  'refa', {
    black: true,
    inline: true,
    toHtml(options) {
      var parentNode = this.parentNode
      while (parentNode.parentNode && parentNode.nodeType != Node.DOCUMENT_NODE) {
        parentNode = parentNode.parentNode
      }
      var node
      for (var i = 0; i < parentNode.children.length; i++) {
        node = parentNode.children[i]
        if (node.nodeName == 'reflink' && node.attributes.name == this.attributes.name) {
          this.nodeName = 'a'
          delete this.attributes.name
          this.attributes.href = node.attributes.link
          this.attributes.title = node.attributes.title
          return this.toHtml(options)
        }
      }
      this.nodeType = Node.TEXT_NODE
      this.nodeName = ''
      return this.toHtml(options)
    }
  }
)



Node.addRule(
  'autoLink',
  {
    match: /^<([^ >]+(@|\/|:\/)[^ >]+)>/,
    block: false,
    priority: 55,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('a', true)
      node.appendChild(this.constructor.createTextNode(match[1], true))
      node.attributes.href = match[2] == '@' ? 'mailto:' + match[1] : match[1]
      return node
    }
  }
)

Node.addRule(
  'img',
  {
    match: /^\!(https?:\/\/(?:[0-9a-zA-Z_-]+\.)*[a-zA-Z]+(?:[?\/]([^\s<>,:;"'{}()\[\]])*)?)/,
    block: false,
    priority: 60,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('img', true)
      node.attributes.src = match[1]
      return node
    }
  }
)



Node.addRule(
  'url',
  {
    match: /^https?:\/\/(?:[0-9a-zA-Z_-]+\.)*[a-zA-Z]+(?:[?\/]([^\s<>,:;"'{}()\[\]])*)?/,
    block: false,
    priority: 65,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('a', true)
      node.appendChild(this.constructor.createTextNode(match[0], true))
      node.attributes.href = match[0]
      return node
    }
  }
)



Node.addRule(
  'br',
  {
    match: /^{{newline}}/,
    block: false,
    priority: 70,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('br', true)
      return node
    }
  }
)


Node.addRule(
  'at',
  {
    match: /^@([0-9a-zA-Z_-]+)/,
    block: false,
    priority: 75,
    parser(token, match) {
      token.skip(match[0].length)
      var node = this.constructor.createElement('at', true)
      node.nodeValue = match[0]
      node.attributes.name = match[1]
      return node
    }
  }
)

Node.addTag(
  'at', {
    black: true,
    inline: true,
    toHtml(options) {
      if (!options.at || !options.at[this.attributes.name]) {
        this.nodeName = ''
        this.nodeType = Node.TEXT_NODE
        return this.toHtml(options)
      }
      this.nodeName = 'a'
      this.attributes.class = 'at'
      this.attributes.title = options.at[node.attributes.name].nickname
      this.attributes.href = options.at[node.attributes.name].uri
      return this.toHtml(options)
    }
  }
)





Node.addRule(
  'text',
  {
    match: /^([\s\S]*?)(?:({{escapeChar}}|{{newline}})|((?:{{space}}|{{tab}})+)|$)/,
    block: false,
    priority: 999,
    parser(token, match) {
      var text = match[1]
      if (!text && match[2]) {
        text += match[2]
      }
      if (match[3]) {
        text += match[3]
      }
      token.skip(text.length)
      var lastChild = this.lastChild()
      if (!lastChild || lastChild.nodeType != Node.TEXT_NODE) {
        var node = this.constructor.createTextNode(text, true)
        return node
      }
      lastChild.nodeValue += text
    }
  }
)




Node.addTagAttribute('href', function (value) {
  return value
})

Node.addTagAttribute('class', function (value) {
  return value
})
Node.addTagAttribute('id', function (value) {
  return value
})
Node.addTagAttribute('src', function (value) {
  return value
})
Node.addTagAttribute('name', function (value) {
  return value
})
Node.addTagAttribute('value', function (value) {
  return value
})
