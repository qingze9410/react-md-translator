# react-md-translator

markdown编译工具，可以把单个markdown文件编译成react Demo 页

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
import 'react-md-translator/style/index.scss';

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
| locale       | Object | {showText:'显示代码',hideText:'隐藏代码'} |
| children     | Markdown | markdown文件 |


## updates

- 2018年11月09日
    - 新增`less`/`css` demo内容块的解析
- 2019年07月15日
    - 新增`scss`支持 