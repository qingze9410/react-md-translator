# react-md-translator

一个简单的react markdown编辑器，可以把markdown文件编译成react Demo 页

## 解析规则

组件可将以` :::demo `为开头,`:::`为结尾的markdown内容解析为特定的代码块，其中代码部分需要使用 ````js`进行包裹，详情见demo文件夹。

## 开始使用

```bash
 npm i react-md-translator
```

## 使用示例

```js
import React from 'react'
import ReactMarkdownTranslator from 'react-md-translator'
import 'react-md-translator/style/index.less';

class demo extends React.Component {
  render() {
    return (
        <ReactMarkdownTranslator>
          {require('./test.md')}
        </ReactMarkdownTranslator>
    )
  }
}

```

## marked.renderer 自定义示例

```js
import marked from 'marked';

const renderer = new marked.Renderer();
renderer.table = (header, body) => {
  return `<table class="md-table"><thead>${header}</thead><tbody>${body}</tbody></table>`;
};
```

## API

| API          | 类型     | 描述          |
| ------------ | ------ | ----------- |
| dependencies | Object | demo所需要的依赖项 |
| renderer     | Object | marked.renderer配置 |
| children     | Markdown | markdown文件 |

