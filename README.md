[TOC]

# MarkdownX 介绍
MarkdownX  是一个对 html兼容性，扩展性 都很强的 Markdown 解析器 默认自动过滤  危险 html 标签 和 属性

# 演示
演示地址 <https://lian-yue.github.io/markdown-x/> 自定义Markdown代码 地址<https://lian-yue.github.io/markdown-x/#textarea>

# 如何安装
```bash
npm install --save markdown-x
```

## git 安装
```bash
git clone git@github.com:lian-yue/markdown-x.git
```

# 如何测试
```bash
npm install
npm run dev
```
/test.md 是测试  md 文件

# 使用方法
## 服务端
```js
const MarkdownX = require('markdown-x');
const MarkdownXNode = require('markdown-x/dist/node');


var data = '# 解析内容'

var node = new MarkdownXNode
var token = new MarkdownX(data)
token.toNode(node)
console.log(node.toHtml())
```


## 客户端 (浏览器) [1]

```js
// 用 dom
const MarkdownX = require('markdown-x');

var data = '# 解析内容'

var node = new document.createElement('div')
var token = new MarkdownX(node)
tokento
console.log(node)



// 用虚拟 dom
const MarkdownXNode = require('markdown-x/dist/node');

var data = '# 解析内容'

var node = new MarkdownXNode
var token = new MarkdownX(node)
token.toNode(node)

console.log(MarkdownXNode.toHtml())
```



## 客户端 (浏览器) [2]

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Test</title>
    <script type="text/javascript" charset="utf-8" src="./dist/token.js"></script>
    <script type="text/javascript" charset="utf-8" src="./dist/node.js"></script>
</head>
<body>
<div id="test"></div>

<script type="text/javascript">
    // 用 node
    var data = '# 解析内容'
    var node = document.querySelector('#text')
    var token = new MarkdownX(data)
    token.toNode(node)


    // 用 虚拟 node
    var data = '# 解析内容'
    var node = new MarkdownXNode
    var token = new MarkdownX(data)
    token.toNode(node)
    document.querySelector('#text').innerHTML = node.toHtml()
</script>
</body>
</head>
```

## 选项

```js
    var options = {
        // ...
    }
    var token = new MarkdownX(data, options)
```

# 公共 方法,函数
```js
    static MarkdownX.options = {}                  // 解析器 默认 选项


    static MarkdownX.getRule(name)                 // 获得 解析规则,变量
    static MarkdownX.addRule(name, option)         // 添加,修改 解析规则,变量
    static MarkdownX.addRule(name)                 // 删除 解析规则,变量


    static MarkdownX.getAttribute(name)            // 获得 属性解析
    static MarkdownX.addAttribute(name, cb)        // 添加,修改 属性解析
    static MarkdownX.addAttribute(name)            // 删除 属性解析


    static MarkdownX.getVariable(name)             // 获得 变量解析
    static MarkdownX.addVariable(name, option)     // 添加,修改 变量解析
    static MarkdownX.addVariable(name)             // 删除 变量解析


    MarkdownX.options = {}                               // 解析器选项
    MarkdownX.document = {}                              // 解析得到的对象
    MarkdownX.toNode(document.createElement('div'))      // 创建 dom 对象
    MarkdownX.toText(separator?)                         // 取得 text 节点

```

# 扩展方法

## 变量

### 添加
```js
var name = '$addvar'
var option = {
    match: /\$/,
}
MarkdownX.addRule(name, option)
```


### 修改
```js
var name = '$number'
var option = MarkdownX.getRule(name)
option.match = /(?:\#|＃)/
MarkdownX.addRule(name, option)
```



##  html 标签

### 添加
```js
// name 规则只能是 [a-z][a-z0-9-]*  
var name = 'div2'

var option = {
    // 是否是 内链标签
    inline: true,

    // 是否是 快级标签  默认值 if (!inline && !block) block = true
    block: true,

    // 禁止连续嵌套
    blackContinuity: true,

    // 里面禁止出现块标签
    blackBlock: true

    // 黑名单 可选 {tagName:true}
    blackList: {},

    // 白名单 可选  null or {tagName:true}
    whiteList: null,

    // 禁用该标签
    block： true,
}
//  添加修改标签
MarkdownX.addRule(name, option)

```


### 修改
```js
var name = 'div2'
var option = MarkdownX.getRule(name)
option = option || {}
options.block = true
MarkdownX.addRule(name, option)
```

### 删除
```js
var name = 'div2'
MarkdownX.addRule(name, null)
```


## Markdown 规则

### 添加
```js
// 添加 支持 at
var name = 'md_at'
var option = MarkdownX.getRule(name)
option = {

    // 使用 $commat 变量
    match: /{{$commat}}([\w]+)/,

    // 内链 类型
    inline: true,

    // 块类型
    // block: true,

    // 文档类型 文档的只能在根目录匹配
    // document: true,

    // 优先级
    priority: 60,
    prepare(match) {
      return {
        nodeName:'a',
        attributes: {class: 'at', href: 'http://github.com/' + match[1]},
        children: [
            {
                nodeName:'#text',
                nodeValue: match[1],
            }
        ],
      }
    }
}
MarkdownX.addRule(name, option)
```



### 删除
```js
// 添加 支持 at
var name = 'md_at'
MarkdownX.addRule(name, null)
```



## 让 Markdown 支持中文标签符号

```js
// 修改 空格
MarkdownX.addRule('$space', {match: /[ \u00a0\u3000]/})

// 修改 增加需要转译的 字符
MarkdownX.addRule('$escape', {match: /[{}\[\]()<>'+\-\\`*:#!_~@$'.｀～＞＜＃＊ー＝＋：＿｜。．＠＄’”［］（）＼]/})

// 添加各种全角属性
MarkdownX.addRule('$space', {match: /[ \u00a0\u3000]/})


MarkdownX.addRule('$grave', {match: /[`｀]/})
MarkdownX.addRule('$tilde', {match: /[~～]/})
MarkdownX.addRule('$gt', {match: /[>＞]/})
MarkdownX.addRule('$lt', {match: /[<＜]/})
MarkdownX.addRule('$num', {match: /[#＃]/})
MarkdownX.addRule('$ast', {match: /[*＊]/})
MarkdownX.addRule('$minus', {match: /[\-ー]/})
MarkdownX.addRule('$plus', {match: /[+＋]/})
MarkdownX.addRule('$equals', {match: /[=＝]/})
MarkdownX.addRule('$colon', {match: /[:：]/})
MarkdownX.addRule('$lowbar', {match: /[_＿]/})
MarkdownX.addRule('$verbar', {match: /[|｜]/})
MarkdownX.addRule('$doc', {match: /[.。．]/})
MarkdownX.addRule('$bsol', {match: /\\/})
MarkdownX.addRule('$commat', {match: /[@＠]/})
MarkdownX.addRule('$dollar', {match: /[$＄]/})
MarkdownX.addRule('$bsol', {match: /[\\＼]/})
MarkdownX.addRule('$excl', {match: /[!！]/})
MarkdownX.addRule('$apos', {match: /['’]/})
MarkdownX.addRule('$quot', {match: /["”]/})
MarkdownX.addRule('$lbrack', {match: /[\[［]/})
MarkdownX.addRule('$rbrack', {match: /[\]］]/})
MarkdownX.addRule('$lpar', {match: /[(（]/})
MarkdownX.addRule('$rpar', {match: /[)）]/})
