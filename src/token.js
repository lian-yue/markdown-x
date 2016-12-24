const NESTING = 16

const SPACE = " "

const TAB = "\t"

const NEWLINE = "\n"

const NEWLINE_SPLIT = /(?:\r\n|[\r\n\u2424])/


const TAG_NAME = /[ \t\r\n\0\x0B\u00a0\/>]/

const TAG_END = /[ \t\r\n\0\x0B\u00a0>]/



class Token {

  static rules = {
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
    style: {inline: true, block: true, text: true},
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

  static attributes = {}

  static variables = {}

  static htmlEscapes = {
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
    divide: 247,
  }







  static getRule(name) {
    return this.rules[name]
  }

  static addRule(name, option) {
    this.rules[name] = option
    return true
  }

  static getAttribute(name) {
    return this.attributes[name]
  }

  static addAttribute(name, call) {
    this.attributes[name] = call
    return true
  }

  static addVariable(name, option) {
    this.variables[name] = option
    return true
  }

  static getVariable(name) {
    return this.variables[name]
  }

  static options = {
    prefix: '',
    protocols: ['http', 'https', 'tel', 'mailto'],
    styles: {'text-align': true},
  }


  // 全部规则
  rules = {}

  // 缓存正则
  _regexp = {}

  // 全部变量
  variables = {}


  dataStack = []

  data

  document = {
    nodeName: '#document',
    children: [],
  }

  // 父节点
  parentNodeStack = []
  parentNode

  // 父节点名
  parentNameStack = []
  parentName

  parentNode = this.document

  // 快
  blockStack = []
  block = true

  // 黑名单
  blackListStack = []
  blackList = {}

  // 白名单
  whiteListStack = []
  whiteList = null

  // 基础父级
  baseParentNodeStack = []
  baseParentNode

  // 基础快
  baseBlockStack = []
  baseBlock = true

  // 基础黑名单
  baseBlackListStack = []
  baseBlackList = {}


  constructor(data, options) {
    this.options = Object.assign({}, this.constructor.options, options || {})
    this.parserRules()
    this.prepare(data)
    this.parser()
  }

  escapeHtml(html, encode) {
    return html.replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  unescapeHtml(html) {
    var htmlEscapes = this.constructor.htmlEscapes
    return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g, function(_, n) {
      n = n.toLowerCase();
      if (n.charAt(0) === '#') {
        return n.charAt(1) === 'x' ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
      }
      var id = htmlEscapes[n]
      if (!id) {
        return ''
      }
      return String.fromCharCode(id)
      return '';
    });
  }

  escapeId(id) {
    return encodeURI(id.replace(/[#?&.%\s-]+/g, '-').toLowerCase().trim()).replace(/\%/g, '')
  }


  parserRules() {
    var name
    var rule
    var documents = {}
    var blocks = {}
    var inlines = {}
    for (name in this.constructor.rules) {
      rule = this.constructor.rules[name]
      if (!rule) {
        continue
      }
      rule = Object.assign({}, rule)
      rule.name = name
      if (rule.html == undefined) {
        rule.html = name.indexOf('_') == -1 && name.charAt(0) >= 'a' && name.charAt(0) <= 'z'
      }
      if (rule.match) {
        if (typeof rule.match == 'function') {
          rule.match = rule.match.call(this)
        }
        if (!(rule.match instanceof RegExp)) {
          throw new Error('规则必须是正则')
        }
      }
      this.rules[name] = rule

      if (!rule.match || rule.black || !rule.prepare) {
        continue
      }

      if (rule.inline) {
        inlines[name] = rule
      }

      if (rule.block) {
        blocks[name] = rule
        documents[name] = rule
      }

      if (rule.document) {
        documents[name] = rule
      }
    }

    // 处理替换 {{}}
    for (name in this.rules) {
      rule = this.rules[name]
      if (rule.match) {
        rule.match = this.regexp(rule.match)
      }
    }

    // 处理优先级
    documents = this.parserPriority(documents)
    blocks = this.parserPriority(blocks)
    inlines = this.parserPriority(inlines)

    // 处理  regexp
    documents = this.parserPriority(documents)
    blocks = this.parserPriority(blocks)
    inlines = this.parserPriority(inlines)

    // 处理 match
    var blockMatch = '((?:^|{{$newline}}){{$blank}}*?)(?:%s)(?:(?={{$newline}})|$)'
    var inlineMatch = '((?:^|(?!{{$backslash}}).)(?:{{$backslash}}{2})*)(?:%s)'
    this.documentMatch = this.parserMatch(documents, blockMatch)
    this.blockMatch = this.parserMatch(blocks, blockMatch)
    this.inlineMatch = this.parserMatch(inlines, inlineMatch)
  }

  parserMatch(rules, regexp) {
    var matchs = []
    var maps = {}
    var mapsLength = {}
    var mapKey = 1
    var rule

    var exec
    var search
    for (var name in rules) {
      rule = rules[name]
      mapKey++
      maps[mapKey] = rule

      matchs.push('(' + rule.match.source.replace(/([^\\](?:\\\\)*)\\(\d+)/g, function(result, before, id) {
        return before + '\\' + (mapKey + parseInt(id))
      }) + ')')

      search = rule.match.source
      while (exec = /(?:^|[^\\])(?:\\\\)*(\((?!\?)|\[)/.exec(search)) {
        search = search.substr(exec.index + exec[0].length)
        if (exec[1] == '[') {
          exec = /(?:^|[^\\])(?:\\\\)*\]/.exec(search)
          search = exec ? search.substr(exec.index + exec[0].length) : ''
        } else {
          mapKey++
        }
      }
    }
    return {regexp: this.regexp(new RegExp(regexp.replace('%s', matchs.join('|')), 'i')), rules: maps}
  }

  parserPriority(rules) {
    var array = []
    var rule
    for (var name in rules) {
      rule = rules[name]
      array.push({
        name,
        rule,
      })
    }
    array.sort(function(a, b) {
      return (a.rule.priority || 50) - (b.rule.priority || 50)
    })
    var results = {}
    var i
    for (i = 0; i < array.length; i++) {
      results[array[i].name] = array[i].rule
    }
    return results
  }

  regexp(regexp) {
    if (!this._regexp[regexp]) {
      this._regexp[regexp] = new RegExp(
        regexp.source.replace(/\{\{(.+?)\}\}/g, (result, name) => {
          if (!this.rules[name]) {
            return result
          }
          return this.regexp(this.rules[name].match).source
        }),
        regexp.flags
      )
    }
    return this._regexp[regexp]
  }

  match() {
    var data = this.data
    if (!data.after) {
      return false
    }
    if (data.matchResult == undefined) {
    } else if (!data.matchResult) {
      return data.matchResult
    } else if (data.matchResult.matchIndex >= data.index) {
      data.matchResult.index = data.matchResult.matchIndex - data.index
      return data.matchResult
    }

    data.matchResult = false
    var match = data.match
    var exec = match.regexp.exec(data.after)
    if (!exec) {
      return false
    }
    for (var key in match.rules) {
      if (exec[key] != undefined) {
        var rule = match.rules[key]
        var matchIndex = data.index + exec.index + exec[1].length
        data.matchResult = {name:rule.name, rule, matchIndex, index: matchIndex - data.index, match : []}
        do {
          data.matchResult.match.push(exec[key])
          key++
        } while (!data.match.rules[key] && key < exec.length);
        return data.matchResult
      }
    }
    return data.matchResult
  }

  push(node, pop) {
    var option = node.nodeName.charAt(0) == '#' ? false : this.rules[node.nodeName]
    if (node.nodeHtml && (!option || !option.html || option.black || this.parentNodeStack.length >= NESTING)) {
      return false
    }

    this.parentNode.children.push(node)

    if (node.varName && node.varName.length) {
      if (node.varName.length == 1) {
        this.variables[node.varName[0]] = this.variables[node.varName[0]] || []
        this.variables[node.varName[0]].push(node)
      } else {
        this.variables[node.varName[0]] = this.variables[node.varName[0]] || {}
        this.variables[node.varName[0]][node.varName[1]] = node
      }
    }

    if (option) {
      if (node.attributes) {
        var attributes = node.attributes
        this.setAttributes(node, attributes)
      } else {
        node.attributes = {}
      }

      if (!option.single) {
        var parentNode = this.parentNode
        // 父级
        this.parentNodeStack.push(this.parentNode)
        this.parentNode = node

        // 父级名称
        this.parentNameStack.push(this.parentName)
        this.parentName = node.nodeName

        // 块标签
        this.blockStack.push(this.block)
        if (this.block && (option.blackBlock || (option.inline && !option.block))) {
          this.block = false
        }

        // 黑名单
        this.blackListStack.push(this.blackList)
        if (option.blackList) {
          this.blackList = Object.assign({}, this.blackList, option.blackList)
        }

        // 白名单
        this.whiteListStack.push(this.whiteList)
        if (option.whiteList) {
          if (this.whiteList) {
            var whiteList = this.whiteList
            this.whiteList = Object.assign({}, option.whiteList)
            for (var key in this.whiteList) {
              if (!whiteList[key]) {
                delete this.whiteList[key]
              }
            }
          } else {
            this.whiteList = option.whiteList
          }
        }

        // 基础
        if (!node.nodeHtml) {
          // 父级
          this.baseParentNodeStack.push(this.baseParentNode)
          this.baseParentNode = node

          // 快标签
          this.baseBlockStack.push(this.baseBlock)
          this.baseBlock = this.block

          // 黑名单
          this.baseBlackListStack.push(this.baseBlackList)
          this.baseBlackList = this.blackList
        }

        // 处理子数据
        var children = node.children
        node.children = []
        if (children && children.length) {
          if (typeof children == 'object' && typeof children[0] == 'object') {
            for (var i = 0; i < children.length; i++) {
              this.push(children[i], pop)
            }
          } else {
            this.prepare(children, node.block)
          }
        }
        if (pop && parentNode != this.parentNode) {
          this.pop()
        }
      }
    }

    return node
  }

  pop(nodeName) {
    if (nodeName && (nodeName != this.parentName || this.parentNode == this.baseParentNode || this.parentNode == this.data.parentNode)) {
      return false
    }

    // 不能弹出 #document 文档   和 不能弹出当前解析的根目录
    if (!this.parentName || (this.data && this.parentNode == this.data.parentNode)) {
      return false
    }

    //  弹出的节点
    var parentNode = this.parentNode

    // 父级
    this.parentNode = this.parentNodeStack.pop()

    // 父级名
    this.parentName = this.parentNameStack.pop()

    // 快
    this.block = this.blockStack.pop()

    // 黑名单
    this.blackList = this.blackListStack.pop()

    // 白名单
    this.whiteList = this.whiteListStack.pop()

    // 基础
    if (parentNode == this.baseParentNode) {
      // 快标签
      this.baseParentNode = this.baseParentNodeStack.pop()

      // 快标签
      this.baseBlock = this.baseBlockStack.pop()

      // 黑名单
      this.baseBlackList = this.baseBlackListStack.pop()
    }
    return parentNode
  }


  filter(nodeName) {
    if (nodeName.charAt(0) == '#') {
      return true
    }
    var option = this.rules[nodeName] || {}

    // 基础 黑名单
    if (this.baseBlackList[nodeName]) {
      return false
    }

    // 基础 块标签
    if (!this.baseBlock && !option.inline) {
      return false
    }

    // 基础 连续嵌套
    if (option.blackContinuity && nodeName == this.parentName) {
      return false
    }


    // inline 里面不能嵌套 block
    while (!this.block && !option.inline && this.pop()) {

    }

    // 不能连续嵌套的
    if (option.blackContinuity && this.parentName == nodeName && this.pop()) {
    }

    // 嵌套黑名单
    while (this.blackList[nodeName] && this.pop()) {
    }
    return true
  }

  setAttributes(node, attributes) {
    var value
    for (var name in attributes) {
      value = attributes[name]
      if (value === false || value === null || value === undefined) {
        continue
      }
      if (this.constructor.attributes[name]) {
        value = this.constructor.attributes[name].call(this, value, node, name)
      } else if (node.nodeHtml) {
        continue
      }
      if (value === false || value === null || value === undefined) {
        continue
      }
      node.attributes[name] = value
    }
  }

  toText(node, separator) {
    var text = []
    var child
    var result
    for (var i = 0; i < node.children.length; i++) {
      child = node.children[i]
      if (child.nodeName == '#text') {
        text.push(child.nodeValue)
      } else if (child.nodeName == '#document' || child.nodeName.charAt(0) != '#') {
        result = this.toText(child, separator)
        if (result) {
          text.push(result)
        }
      }
    }
    return text.join(separator || '')
  }

  toNode(node) {
    var child
    var node2
    var Node = node.constructor.createElement ? node.constructor : document
    var name
    for (var i = 0; i < this.parentNode.children.length; i++) {
      child = this.parentNode.children[i]
      if (child.nodeName =='#text') {
        node.appendChild(Node.createTextNode(this.unescapeHtml(child.nodeValue)))
      } else if (child.nodeName =='#comment') {
        node.appendChild(Node.createComment(child.nodeValue))
      } else {
        node2 = Node.createElement(child.nodeName)
        node.appendChild(node2)
        for (name in child.attributes) {
          node2.setAttribute(name, child.attributes[name])
        }
        if (child.children && child.children.length) {
          this.parentNodeStack.push(this.parentNode)
          this.parentNode = child
          this.toNode(node2)
          this.parentNode = this.parentNodeStack.pop()
        }
      }
    }
    return node
  }

  pushData(after, block) {
    var lines
    if (typeof after == 'object') {
      lines = after
      after = after.join(NEWLINE)
    } else {
      lines = after.split(NEWLINE)
    }
    var linesLength = []
    for (var i = 0; i < lines.length; i++) {
      linesLength[i] = lines[i].length
    }

    var match
    if (block) {
      match = this.blockMatch
    } else if (block != undefined)  {
      match = this.inlineMatch
    } else if (this.parentName) {
      var option = this.rules[this.parentName]
      if (option && !option.blackBlock && !option.inline) {
        match = this.blockMatch
        block = true
      } else {
        block = false
        match = this.inlineMatch
      }
    } else {
      block = true
      match = this.documentMatch
    }

    var data = {
      before: '',
      skip: '',
      after,
      lines,
      linesLength,
      index: 0,
      ch: 0,
      line: 0,
      parentNode: this.parentNode,
      block,
      match,
      htmlText: '',
    }

    this.dataStack.push(this.data)
    this.data = data
    return data
  }


  popData() {
    var data = this.data
    this.data = this.dataStack.pop()
    while (this.parentNode != data.parentNode && this.pop()) {

    }
    return data
  }

  prepare(after, block) {
    if (this.dataStack.length >= NESTING) {
      return false
    }
    var data = this.pushData(after, block)
    var match
    var value
    while (match = this.match()) {
      data._index = data.index
      if (match.index) {
        this.pushText(data.after.substr(0, match.index), data.block)
        this.skip(match.index)
        data._index = data.index
      }

      value = match.rule.prepare.call(this, match.match)
      if (data.index == data._index) {
        this.skip(match.match[0].length)
        if (data.block) {
          this.nextLine()
        }
      }
      if (!value) {

      } else if (this.filter(value.nodeName)) {
        this.push(value, true)
      } else {
        this.push({nodeName: '#text', nodeValue: data.before.substr(data._index)})
      }
    }

    if (data.after) {
      this.pushText(data.after, data.block)
    }
    this.popData()
    return this.parentNode
  }


  parser() {
    var option
    var varName
    var variables
    for (var name in this.variables) {
      if (!(option = this.constructor.variables[name])) {
        continue
      }
      variables = this.variables[name]
      for (varName in variables) {
        option.call(this, varName, variables[varName])
      }
    }
  }

  nextLine() {
    var data = this.data
    if (typeof data.linesLength[data.line + 1] != 'number') {
      if (data.after) {
        this.skip(data.after.length)
      }
      return false
    }
    this.skip(data.linesLength[data.line] + NEWLINE.length - data.ch)
    return data.line
  }

  getLine(line) {
    if (typeof this.data.lines[line] == 'string') {
      var value = this.data.lines[line]
      var trim = value.match(this.rules.$trim.match)
      this.data.lines[line] = {
        value,
        trimValue: trim[2],
        ltrimLength: trim[1].length,
        rtrimLength: trim[3].length,
        spacelength: trim[1].replace(/\t/g, '    ').length,
      }
    }
    return this.data.lines[line]
  }

  currentLine() {
    return this.getLine(this.data.line)
  }

  skip(index) {
    var data = this.data
    if (index < 0 || data.after.length < index) {
      return false
    }

    if (!index) {
      return true
    }
    // 索引偏移
    data.index += index

    // 跳过的数据
    data.skip = data.after.substr(0, index)

    // 之前已处理的
    data.before += data.skip

    // 之后需要处理的
    data.after = data.after.substr(index)

    // ch 偏移
    data.ch += index

    // 跳过的行数等
    while (data.ch >= (data.linesLength[data.line]+ NEWLINE.length)) {
      data.ch -= data.linesLength[data.line] + NEWLINE.length
      data.line++
    }
    return true
  }


  pushText(text, block) {
    if (block) {
      text = text.trim()
      if (!text) {
        return false
      }
      text = text.split(this.rules.$blocktext.match)
      for (var i = 0; i < text.length; i++) {
        this.push({nodeName: 'p', children: text[i]}, true)
      }
      return true
    }
    if (!text || !(text = text.replace(this.rules.$escape_replace.match, '$1'))) {
      return false
    }
    this.push({nodeName: '#text', nodeValue: text})
    return true
  }






  prepareHtmlAttributes() {
    var data = this.data
    var attributes = {}
    var attributeName
    var attributeValue

    var char
    var index
    while (char != '>' && (index = data.after.search(/[=>]/)) != -1) {
      attributeName = data.after.substr(0, index)
      char = data.after.charAt(index)
      this.skip(index + 1)
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
        while (char = data.after.charAt(index)) {
          ++index
          if (char == '>') {
            break
          } else if (char == '"' || char == "'") {
            this.skip(index)
            index = data.after.indexOf(char)
            attributeValue = index == -1 ? data.after : data.after.substr(0, index)
            this.skip(index == -1 ? data.after.length : index + 1)
            break
          } else if (char = char.trim()) {
            this.skip(index)
            index = data.after.search(TAG_END)
            attributeValue = index == -1 ? data.after : data.after.substr(0, index)
            this.skip(index == -1 ? data.after.length : index + 1)
            break
          }
        }
      }
      attributeName = attributeName.trim().toLowerCase()
      if (attributeName) {
        attributes[attributeName] = attributeValue
      }
    }
    return attributes
  }


  pushHtmlText(text) {
    this.data.htmlText += text
    return true
  }

  saveHtmlText() {
    if (this.data.htmlText) {
      if (this.data.htmlText.trim()) {
        this.push({nodeName:'#text', nodeValue: this.data.htmlText})
      }
      this.data.htmlText = ''
    }
    return true
  }
}

Token.addRule('$newline', {match: /\n/})
Token.addRule('$space', {match: /[ \u00a0]/})
Token.addRule('$tab', {match: /(?:    |\t)/})
Token.addRule('$blank', {match:/(?:{{$space}}|\t)/})
Token.addRule('$trim', {match:/^((?:{{$blank}}|{{$newline}})*)([\s\S]*?)((?:{{$blank}}|{{$newline}})*)$/})
Token.addRule('$escape', {match: /[{}\[\]()<>'+\-\\`*:#!_~@$'.]/})
Token.addRule('$escape_replace', {match: /{{$backslash}}({{$escape}}|{{$newline}}|$)/g})


Token.addRule('$grave', {match: /`/})
Token.addRule('$tilde', {match: /~/})
Token.addRule('$gt', {match: />/})
Token.addRule('$lt', {match: /</})
Token.addRule('$number', {match: /\#/})
Token.addRule('$asterisk', {match: /\*/})
Token.addRule('$minus', {match: /\-/})
Token.addRule('$plus', {match: /\+/})
Token.addRule('$equals', {match: /\=/})
Token.addRule('$colon', {match: /\:/})
Token.addRule('$lowbar', {match: /_/})
Token.addRule('$verbar', {match: /\|/})
Token.addRule('$doc', {match: /\./})
Token.addRule('$backslash', {match: /\\/})
Token.addRule('$commat', {match: /\@/})
Token.addRule('$dollar', {match: /\$/})
Token.addRule('$apos', {match: /'/})
Token.addRule('$quot', {match: /"/})
Token.addRule('$quote', {match: /(?:{{$quot}}|{{$apos}})/})
Token.addRule('$blocktext', {match: /(?:{{$blank}}*?{{$newline}}){2,}/})




Token.addRule('$escape_backslash', {match: /[\s\S]*?(?!{{$backslash}}).(?:{{$backslash}}{2})*/})

Token.addRule('$header_id_replace',{match: /<.+?>|{{$escape}}/g})
Token.addRule('$link_image',{match: /\[((?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*)\](?:{{$blank}}|{{$newline}})?(?:\({{$blank}}*{{$lt}}?(.*?){{$gt}}?(?:{{$blank}}+{{$quote}}(.*?){{$quote}})?{{$blank}}*\)|\[([^\^\[\]]*)\])/})





Token.addRule('md_blockcode', {
  match: /{{$tab}}{{$blank}}*(?!{{$blank}}.).*|({{$grave}}{3,}|{{$tilde}}{3,}){{$blank}}*(.*)/,
  block: true,
  priority: 10,
  prepare(match) {
    var nodeValue = []
    var current
    if (match[1]) {
      while (this.nextLine()) {
        current = this.currentLine()
        if (current.trimValue == match[1] && current.spacelength < 4) {
          this.nextLine()
          break
        }
        nodeValue.push(current.trimValue ? current.value : '')
      }
    } else {
      do {
        current = this.currentLine()
        if (current.trimValue && current.spacelength < 4) {
          break
        }
        nodeValue.push(current.trimValue ? (current.value.substr(current.value.charAt(0) == '\t' ? 1 : (current.ltrimLength > 4 ? 4 : current.ltrimLength))) : '')
      } while (this.nextLine())
      if (nodeValue.length > 1 && !nodeValue[nodeValue.length -1]) {
        nodeValue.pop()
      }
    }
    return {
      nodeName:'pre',
      attributes: {
        class: 'highlight highlight-source-' + (match[2] ? match[2].toLowerCase().replace(/[^0-9a-z_-]/g, '') : ''),
      },
      children: [
        {
          nodeName:'code',
          children: [
            {
              nodeName:'#text',
              nodeValue: nodeValue.join(NEWLINE),
            }
          ]
        }
      ]
    }
  },
})



Token.addRule(
  'md_blocktag',
  {
    match(data) {
      var option
      var names = []
      for (var name in this.rules) {
        option = this.rules[name]
        if (!option || !option.html || (option.inline && !option.block)) {
          continue
        }
        names.push(name)
      }
      return new RegExp('<('+ names.join('|') +')(?:|\\s[\\s\\S]*?)\\/?\s*>.*')
    },
    block: true,
    priority: 15,
    prepare() {
      var data = this.data
      var parentNode = this.parentNode
      var char
      var index
      var text
      var nodeName
      var nodeValue

      var attributes

      while ((index = data.after.indexOf('<')) != -1 && (!nodeName || parentNode != this.parentNode || data.after.search(/^.*(<\!--|<\/?[a-zA-Z].*>)/) != -1)) {
        if (index) {
          this.pushHtmlText(data.after.substr(0, index))
        }

        this.skip(index + 1)
        char = data.after.charAt(0)

        // 最后了
        if (!char) {
          this.pushHtmlText('<')
          continue
        }

        // 注释
        if (char == '!') {
          if (data.after.substr(0, 3) == '!--') {
            this.skip(3)
            index = data.after.indexOf('-->')
            nodeValue = index == -1 ? data.after : data.after.substr(0, index)
            this.skip(index == -1 ? data.after.length : index + 3)
            this.saveHtmlText()
            this.push({nodeName:'#comment', nodeValue})
          } else {
            this.pushHtmlText('<')
          }
          continue
        }

        // 结束标签
        if (char == '/') {
          index = data.after.indexOf('>')
          nodeName = index == -1 ? data.after.substr(1) : data.after.substr(1, index - 1)
          nodeName = nodeName.trim().toLowerCase()
          if (nodeName) {
            this.skip(index == -1 ? data.after.length : index + 1)

            this.saveHtmlText()
            this.pop(nodeName)
          } else {
            this.pushHtmlText('<')
          }
          continue
        }

        // 不是标签
        if (char < 'a' && char > 'z' && char < 'A' && char > 'Z') {
          continue
        }

        // 没结束
        index = data.after.search(TAG_NAME)
        if (index == -1) {
          break;
        }

        nodeName = data.after.substr(0, index)

        this.skip(index)

        attributes = this.prepareHtmlAttributes()
        nodeName = nodeName.trim().toLowerCase()

        this.saveHtmlText()
        this.push({nodeName, attributes, nodeHtml: true})
      }

      var value = this.currentLine().value
      if (value.length > data.ch) {
        this.pushHtmlText(value.substr(data.ch))
      }
      this.saveHtmlText()
      this.nextLine()
      while (parentNode != this.parentNode) {
        this.pop()
      }
    }
  }
)



Token.addRule(
  'md_blockquote',
  {
    match: /({{$gt}}).*/,
    block: true,
    priority: 20,
    prepare(match) {
      var children = []
      var current
      var empty
      do {
        current = this.currentLine()
        if (!current.trimValue) {
          if (empty) {
            break
          }
          empty = true
          children.push(current.trimValue)
        } else {
          if (empty && (current.spacelength >= 4 || current.trimValue.charAt(0) != match[1])) {
            break
          }
          if (current.spacelength < 4) {
            children.push(this.rules.$gt.match.test(current.trimValue[0]) ? current.trimValue.substr(1) : current.trimValue)
          } else {
            children.push(current.value)
          }
        }
      } while (this.nextLine())
      return {
        nodeName: 'blockquote',
        children,
      }
    }
  }
)



Token.addRule(
  'md_header',
  {
    match: /({{$number}}{1,6}){{$blank}}*(.*?)\#*|((?!{{$blank}})..*){{$newline}}{{$blank}}*({{$equals}}|{{$minus}}){{$blank}}?(?:\4{{$blank}}?)*/,
    block: true,
    priority: 25,
    prepare(match) {
      if (match[1]) {
        this.nextLine()
        return {
          nodeName: 'h' + match[1].length,
          attributes: {id: this.escapeId(this.options.prefix + 'header-' + match[2].replace(this.rules.$header_id_replace.match, ''))},
          children: match[2],
        }
      } else {
        this.nextLine()
        this.nextLine()
        return {
          nodeName: this.rules.$equals.match.test(match[4]) ? 'h1' : 'h2',
          attributes: {id: this.options.prefix + 'header-' + this.escapeId(match[3].replace(this.rules.$header_id_replace.match, ''))},
          children: match[3],
        }
      }
    }
  }
)

Token.addRule(
  'md_list',
  {
    match:/(?:({{$asterisk}}|{{$plus}}|{{$minus}})|(\d+{{$doc}})){{$blank}}(?:{{$blank}}?\[({{$space}}|x)\])?(.*)/,
    block: true,
    priority: 30,
    prepare(match) {
      var list = []
      var li = [match[4]]
      var checkboxs = [match[3]]

      var current
      var empty
      var match2
      var tab = true
      var blocktexts = []

      while (this.nextLine()) {
        current = this.currentLine()
        if (!current.trimValue) {
          if (empty && !tab) {
            break
          }
          // 空行
          li.push('')
        } else if (li.length && current.spacelength > 1) {
          // 行跳格大于 1
          li.push(current.value.substr(current.value.charAt(0) == '\t' ? 1 : (current.value.charAt(1) == '\t' ? 2 : (current.ltrimLength > 4 ? 4 : current.ltrimLength))))
        } else {
          match2 = this.match()
          if (!match2 || match2.index > current.value.length) {
            if (empty && !tab) {
              break
            }
            li.push(current.value)
          } else if (match2.name == 'md_list' && match2.match[1] == match[1] && Boolean(match2.match[2]) == Boolean(match[2])) {
            if (li.length > 1 && li.indexOf('') != -1) {
              blocktexts.push(true)
            } else {
              blocktexts.push(false)
            }
            if (li.length > 1 && !li[li.length - 1]) {
              li.pop()
            }
            list.push(li)
            li = [match2.match[4]]
            checkboxs.push(match2.match[3])
          } else {
            break
          }
        }

        empty = !current.trimValue
        tab = li.length != 1 && ( current.spacelength > 1 || (!current.trimValue && tab))
      }

      if (li.length > 1 && !li[li.length - 1]) {
        li.pop()
      }

      list.push(li)
      blocktexts.push(blocktexts.length  ? blocktexts[blocktexts.length -1] : false)

      var children = []
      for (var i = 0; i < list.length; i++) {
        children.push({
          nodeName: 'li',
          children: list[i],
        })
      }


      var node = {
        nodeName: match[2] ? 'ol' : 'ul',
        children,
      }
      this.push(node, true)

      var liNode
      var pNode
      var checkbox
      var checkboxNode
      for (var i = 0; i < node.children.length; i++) {
        liNode = node.children[i]
        if (!blocktexts[i] && (pNode = liNode.children[0]) && pNode.nodeName == 'p') {
          // 删除第一个
          liNode.children.splice(0, 1)

          // 合并
          liNode.children = pNode.children.concat(liNode.children)
        }

        checkbox = checkboxs[i]
        if (checkbox) {
          this.setAttributes(liNode, {class:'task-list-item'})
          if (!node.attributes.class) {
            this.setAttributes(node, {class:'task-list'})
          }

          checkboxNode = {
            nodeName:'input',
            attributes: {},
            children: [],
          }
          this.setAttributes(checkboxNode, {
            type: 'checkbox',
            class: 'task-list-item-checkbox',
            disabled: true,
            checked: checkbox.toLowerCase()== 'x'
          })
          if (!liNode.children.length || liNode.children[0].nodeName != 'p') {
            liNode.children.splice(0, 0, checkboxNode)
          } else {
            liNode.children[0].children.splice(0, 0, checkboxNode)
          }
        }
      }
    },
  }
)


Token.addRule(
  'md_table',
  {
    match:/((?:.*?({{$verbar}}))+.*?){{$newline}}({{$blank}}*\2?(?:(?:{{$blank}}*(?:{{$colon}}|{{$minus}}){{$blank}}*)+\2)+(?:{{$blank}}*(?:{{$colon}}|{{$minus}}))+{{$blank}}*\2?){{$blank}}*((?:{{$newline}}(?:.*\2)+.*)+)/,
    block: true,
    priority: 35,
    prepare(match) {
      var data
      var index
      var char
      var text = ''
      var regexp = this.regexp(/({{$backslash}}|{{$verbar}})/)

      // 表头
      var thead = []
      data = match[1]
      while ((index = data.search(regexp)) != -1) {
        char = data.charAt(index)
        if (char == '\\') {
          text += data.substr(0, index + 2)
          data = data.substr(index + 2)
          continue
        }
        text += data.substr(0, index)
        data = data.substr(index + 1)
        thead.push(text ? text.match(this.rules.$trim.match)[2] : text)
        text = ''
      }
      text += data
      thead.push(text ? text.match(this.rules.$trim.match)[2] : text)
      if (thead.length > 1 && !thead[0]) {
        thead.shift()
      }
      if (thead.length > 1 && !thead[thead.length -1]) {
        thead.pop()
      }


      // 位置
      var align = match[3].split(match[2])
        .map(value => value.match(this.rules.$trim.match)[2])
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
          return 'center'
        }
        if (left) {
          return 'left'
        }
        if (right) {
          return 'right'
        }
        return ''
      })



      // 表内容
      // 表内容
      var tbody = []
      var tr = []
      var datas = match[4].split(NEWLINE)
      for (var i = 0; i < datas.length; i++) {
        data = datas[i]
        tr = []
        text = ''
        while ((index = data.search(regexp)) != -1) {
          char = data.charAt(index)
          if (char == '\\') {
            text += data.substr(0, index + 2)
            data = data.substr(index + 2)
            continue
          }
          text += data.substr(0, index)
          data = data.substr(index + 1)
          tr.push(text ? text.match(this.rules.$trim.match)[2] : text)
          text = ''
        }
        text += data
        if (text) {
          text = text.match(this.rules.$trim.match)[2]
        }
        if (!text && !tr.length) {
          continue
        }
        tr.push(text ? text.match(this.rules.$trim.match)[2] : text)
        if (tr.length > thead.length && !tr[0]) {
          tr.shift()
        }
        if (tr.length > thead.length && !tr[tr.length -1]) {
          tr.pop()
        }
        tbody.push(tr)
      }


      for (var i = 0; i < thead.length; i++) {
        thead[i] = {
          nodeName: 'th',
          block: false,
          attributes: align[i] ? {style:'text-align:' + align[i]} : null,
          children: thead[i],
        }
      }


      var tr
      var col
      for (var row = 0; row < tbody.length; row++) {
        tr = []
        for (col = 0; col < thead.length; col++) {
          tr[col] = {
            nodeName: 'td',
            block: false,
            attributes: align[col] ? {style:'text-align:' + align[col]} : null,
            children: tbody[row][col],
          }
        }
        tbody[row] = {nodeName:'tr', children: tr}
      }

      return {
        nodeName:'table',
        children: [
          {
            nodeName:'thead',
            children: [
              {
                nodeName: 'tr',
                children: thead,
              }
            ]
          },
          {
            nodeName:'tbody',
            children: tbody
          }
        ]
      }
    }
  }
)








Token.addRule(
  'md_hr',
  {
    match: /({{$asterisk}}|{{$minus}}|{{$lowbar}}){{$blank}}?(?:\1{{$blank}}?){2,}/,
    block: true,
    priority: 40,
    prepare() {
      return {nodeName: 'hr'}
    }
  },
)



Token.addRule(
  'md_toc',
  {
    match:/\[TOC\]/,
    document: true,
    priority: 17,
    prepare() {
      return {
        nodeName: 'ul',
        varName: ['toc'],
        attributes: {class: 'toc'}
      }
    }
  },
)



Token.addRule(
  'md_footnote',
  {
    match: /\[\^([^\[\]]+)\]{{$blank}}*{{$colon}}{{$blank}}*(.*)/,
    document: true,
    priority: 22,
    prepare(match) {
      var children = [match[2]]
      var current
      var match2

      while (this.nextLine()) {
        current = this.currentLine()
        if (!current.trimValue) {
          this.nextLine()
          break
        } else if (current.spacelength > 1) {
          children.push(current.value.substr(current.value.charAt(0) == '\t' ? 1 : (current.value.charAt(1) == '\t' ? 2 : (current.ltrimLength > 4 ? 4 : current.ltrimLength))))
        } else if (!(match2 = this.match()) || match2.index > current.value.length) {
          children.push(current.value)
        } else {
          break
        }
      }
      var id = this.escapeId(match[1])

      this.refnoteId = this.refnoteId || 0
      this.refnoteId++


      var node = {
        nodeName: 'li',
        block: false,
        refnoteId :this.refnoteId,
        varName: ['footnote', match[1].toLowerCase()],
        attributes: {
          class: 'footnote',
          id: this.options.prefix + 'footnote-' + id,
          style: 'display:none',
        },
        children,
      }
      this.push(node, true)
      node.children.push({
        nodeName: 'a',
        attributes: {
          href: '#'+ this.options.prefix + 'refnote-' + id,
          title: this.options.toRefnote || 'Return to article',
        },
        children: [
          {
            nodeName: '#text',
            nodeValue: '↩',
          }
        ]
      })
    }
  }
)




Token.addRule(
  'md_reflink',
  {
    match: /\[([^\^\[\]]+)\]{{$blank}}*{{$colon}}{{$blank}}*{{$lt}}?((?!{{$blank}})..*?){{$gt}}?(?:{{$newline}}?{{$blank}}*(?:{{$lt}}|{{$quote}})(.*)(?:{{$gt}}|{{$quote}}))?/,
    document: true,
    priority: 27,
    prepare(match) {
      if (!this.variables.reflink) {
        this.variables.reflink = {}
      }
      this.variables.reflink[match[1].toLowerCase()] =  {uri: match[2], title: match[3]}
    }
  }
)




Token.addRule(
  'md_tag',
  {
    match(data) {
      var option
      var names = []
      for (var name in this.rules) {
        option = this.rules[name]
        if (!option || !option.html || !option.inline || option.block) {
          continue
        }
        names.push(name)
      }
      return new RegExp('<(\\/?)('+ names.join('|') +')(?:|\\s[\\s\\S]*?)\\/?\s*>')
    },
    inline: true,
    priority: 7,
    prepare(match) {
      var nodeName = match[2].toLowerCase()
      if (match[1]) {
        this.pop(nodeName)
        this.skip(match[0].length)
        return
      }
      this.skip(nodeName.length + 1)
      var attributes = this.prepareHtmlAttributes()
      this.push({nodeName, attributes, nodeHtml: true})
    }
  }
)


Token.addRule(
  'md_comment',
  {
    match: /<\!--([\s\S]*?)-->/,
    block: true,
    inline: true,
    priority: 15,
    prepare(match) {
      return {nodeName:'#comment', nodeValue: match[1]}
    }
  }
)


Token.addRule(
  'md_code',
  {
    match: /(({{$grave}})+)([\s\S]*?(?!\2)[\s\S])\1(?!\2)/,
    inline: true,
    priority: 20,
    prepare(match) {
      return {
        nodeName:'code',
        children: [
          {
            nodeName: '#text',
            nodeValue: this.escapeHtml(match[3], true),
          }
        ]
      }
    }
  }
)

Token.addRule(
  'md_strong',
  {
    match: /(({{$lowbar}}|{{$asterisk}}){2})({{$escape_backslash}})\1(?!\2)/,
    inline: true,
    priority: 25,
    prepare(match) {
      return {
        nodeName:'strong',
        children: match[3],
      }
    },
  }
)


Token.addRule(
  'md_em',
  {
    match: /({{$lowbar}}|{{$asterisk}})({{$escape_backslash}})\1(?!\1)/,
    inline: true,
    priority: 30,
    prepare(match) {
      return {
        nodeName:'em',
        children: match[2],
      }
    }
  }
)



Token.addRule(
  'md_del',
  {
    match: /(({{$tilde}}){2})({{$escape_backslash}})\1(?!\2)/,
    inline: true,
    priority: 35,
    prepare(match) {
      return {
        nodeName:'del',
        children: match[3],
      }
    },
  }
)



Token.addRule(
  'md_image',
  {
    match: /\!{{$link_image}}/,
    inline: true,
    priority: 45,
    prepare(match) {
      return {
        nodeName: 'img',
        nodeValue: match[0],
        varName: typeof match[4] == 'string' ? ['image', match[4].toLowerCase()] : null,
        attributes: {
          alt: match[1],
          src: match[2],
          title: match[3],
        },
      }
    }
  }
)

Token.addRule(
  'md_link',
  {
    match: /{{$link_image}}/,
    inline: true,
    priority: 50,
    prepare(match) {
      return {
        nodeName: 'a',
        nodeValue: match[0],
        varName: typeof match[4] == 'string' ? ['link', match[4].toLowerCase()] : null,
        attributes: {
          href: match[2],
          title: match[3],
        },
        children: match[1],
      }
    }
  }
)




Token.addRule(
  'md_autolink',
  {
    match: /<([^ >]+?(:|@|\/)[^ >]+)>/,
    inline: true,
    priority: 55,
    prepare(match) {
      return {
        nodeName:'a',
        attributes: {
          href: match[2] == '@' ? 'mailto:' +  match[1] : match[1],
        },
        children: [
          {
            nodeName:'#text',
            nodeValue: match[1],
          }
        ]
      }
    }
  }
)



Token.addRule(
  'md_url',
  {
    match: /https?:\/\/(?:[0-9a-zA-Z_-]+\.)*[a-zA-Z]+(?:[?\/]([^\s<>,:;"'{}()\[\]])*)?/,
    inline: true,
    priority: 60,
    prepare(match) {
      return {
        nodeName:'a',
        attributes: {
          href: match[0],
        },
        children: [
          {
            nodeName:'#text',
            nodeValue: match[0],
          }
        ]
      }
    }
  }
)


Token.addRule(
  'md_refnote',
  {
    match: /\[\^([^\[\]]*)\]/,
    inline: true,
    priority: 65,
    prepare(match) {
      var id = this.escapeId(match[1])
      return {
        nodeName:'a',
        nodeValue: match[0],
        varName: ['refnote', match[1].toLowerCase()],
        attributes: {
          class: 'refnote',
          id: this.options.prefix +'refnote-' + id,
          href: '#'+ this.options.prefix +'footnote-' + id,
          title: this.options.toFootnote || 'See footnote',
        },
        children: [
          {
            nodeName:'#text',
            nodeValue: match[1],
          }
        ]
      }
    }
  }
)


Token.addRule(
  'md_br',
  {
    match: /{{$newline}}/,
    inline: true,
    priority: 70,
    prepare() {
      return {
        nodeName:'br',
      }
    }
  }
)


Token.addVariable('image', function(varName, node) {
  if (!this.variables.reflink || !this.variables.reflink[varName]) {
    node.nodeName = '#text'
    return
  }
  var reflink = this.variables.reflink[varName]
  this.setAttributes(node, {
    src: reflink.uri,
    title: reflink.title,
  })
})


Token.addVariable('link', function(varName, node) {
  if (!this.variables.reflink || !this.variables.reflink[varName]) {
    node.nodeName = '#text'
    return
  }
  var reflink = this.variables.reflink[varName]
  this.setAttributes(node, {
    href: reflink.uri,
    title: reflink.title,
  })
})


Token.addVariable('refnote', function(varName, node) {
  if (!this.variables.footnote || !this.variables.footnote[varName]) {
    node.nodeName = '#text'
    return
  }
  node.children = [
    {
      nodeName:'#text',
      nodeValue: '['+ this.variables.footnote[varName].refnoteId +']'
    }
  ]
})


Token.addVariable('footnote', function(varName, node) {
  this.document.children.splice(this.document.children.indexOf(node), 1)

  if (!this.footnoteNode) {
    this.footnoteNode = {
      nodeName:'ol',
      attributes: {},
      children: [],
    }
    this.setAttributes(this.footnoteNode, {class:'footnotes'})
    this.document.children.push(this.footnoteNode)
  }

  this.footnoteNode.children.push(node)
})


Token.addVariable('toc', function(varName, node) {
  var ulStack = []
  var ul = node
  var ul2
  var a
  var child
  var level
  var level2
  var index
  for (var i = 0; i < this.document.children.length; i++) {
    child = this.document.children[i]
    if (child.nodeHtml || (level2 = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].indexOf(child.nodeName)) == -1 || !child.attributes.id) {
      continue
    }
    level2++
    if (level) {
      if (level2 > level) {
        ul2 = {
          nodeName: 'ul',
          attributes: {},
          children: [],
        }
        ulStack.push(ul)
        ul.children[ul.children.length - 1].children.push(ul2)
        ul = ul2
      } else if (level2 < level && ul != node) {
        while (level2 < level && ul != node) {
          level--
          ul = ulStack.pop()
        }
      }
    }
    level = level2
    a = {
      nodeName: 'a',
      attributes: {},
      children: [
        {
          nodeName: '#text',
          nodeValue: this.toText(child),
        }
      ],
    }
    this.setAttributes(a, {href: '#' + child.attributes.id})

    ul.children.push({
      nodeName: 'li',
      attributes: {},
      children: [a],
    })
  }
})




Token.addAttribute('href', function (value) {
  value = String(value)
  try {
    var prot = decodeURIComponent(this.unescapeHtml(value)).replace(/[^\w:]/g, '').toLowerCase();
  } catch (e) {
    return false
  }
  var match = prot.match(/^(\w+)\:/)
  if (match && this.options.protocols.indexOf(match[1]) == -1) {
    return false;
  }
  return value
})

Token.addAttribute('src', function (value) {
  value = String(value)
  try {
    var prot = decodeURIComponent(this.unescapeHtml(value)).replace(/[^\w:]/g, '').toLowerCase();
  } catch (e) {
    return false
  }
  var match = prot.match(/^(\w+)\:/)
  if (match && this.options.protocols.indexOf(match[1]) == -1) {
    return false;
  }
  return value
})

Token.addAttribute('title', function (value) {
  return value
})

Token.addAttribute('alt', function (value) {
  return value
})

Token.addAttribute('style', function (value, nodeHtml) {
  if (!nodeHtml) {
    return value
  }
  var results = []
  var styles = String(value).split(';')
  var style
  var name
  var value
  var index
  for (var i = 0; i < styles.length; i++) {
    style = styles[i]
    index = style.indexOf(';')
    if (index == -1) {
      continue
    }
    name = style.substr(0, index).toLowerCase().trim()
    if (!this.options.styles[name]) {
      continue
    }
    value = style.substr(index + 1).toLowerCase().trim()
    if (value && !/^[^\(\)\[\]'"\:&;\\]$/.test(decodeURIComponent(this.unescapeHtml(value)))) {
      continue
    }
    results.push(name + ':' + value)
  }
  return results.join(';')
})


module.exports = Token
