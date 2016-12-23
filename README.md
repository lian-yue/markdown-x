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
var token = new MarkdownX(node, MarkdownXNode, data)
console.log(node.toHtml())
```


## 客户端 (浏览器) [1]

```js
// 用 dom
const MarkdownX = require('markdown-x');

var data = '# 解析内容'

var node = new document.createElement('div')
var token = new MarkdownX(node, document, data)
console.log(node)



// 用虚拟 dom
const MarkdownXNode = require('markdown-x/dist/node');

var data = '# 解析内容'

var node = new MarkdownXNode
var token = new MarkdownX(node, MarkdownXNode, data)
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
    var token = new MarkdownXtoken(document.querySelector('#text'), document, data)


    // 用 虚拟 node
    var data = '# 解析内容'
    var node = new MarkdownXnode
    var token = new MarkdownXtoken(node, MarkdownXnode, data)
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
    var token = new MarkdownX(node, MarkdownXnode, data, options)
```



# 扩展方法

## 变量

### 添加
```js
var name = '$addvar'
var option = Token.getRule(name)
option = {
    match: /\$/,
}
Token.addRule(name, option)
```


### 修改
```js
var name = '$number'
var option = Token.getRule(name)
option.match = /(?:\#|＃)/
Token.addRule(name, option)
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
Token.addRule(name, option)

```


### 修改
```js
var name = 'div2'
var option = Token.getRule(name)
option = option || {}
options.block = true
Token.addRule(name, option)
```

### 删除
```js
var name = 'div2'
Token.addRule(name, null)
```


## Markdown 规则

### 添加
```js
// 添加 支持 at
var name = 'md_at'
var option = Token.getRule(name)
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
Token.addRule(name, option)
```



### 删除
```js
// 添加 支持 at
var name = 'md_at'
Token.addRule(name, null)
```
