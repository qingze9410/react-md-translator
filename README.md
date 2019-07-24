# react-md-translator

使用markdown文件编写你的react组件示例

## 解析规则

组件可将以` :::demo `为开头,`:::`为结尾的markdown内容解析为特定的代码块，其中代码部分需要使用 ````js`进行包裹，详情见demo文件夹。

## 开始使用

```bash
 npm i react-md-translator
```

## 使用示例

```js
import React from 'react'
import DemoPage from 'react-md-translator'
import 'react-md-translator/style/index.scss';
import 'react-md-translator/style/md-style.scss';

class demo extends React.Component {
  render() {
    return (
        <DemoPage markdown={require('./test.md')}/>
    )
  }
}

```

> 请使用`webpack raw-loader`加载markdown文件

## demo

[demo示例](./demo/page-demo/demo-page.md)

## API

| API          | 类型    | 描述          |
| ------------ | ------ | ----------- |
| dependencies | Object | demo所需要的依赖项 |
| renderer     | Object | marked.renderer配置 |
| locale       | Object | {showText:'显示代码',hideText:'隐藏代码'} |
| children     | Markdown | markdown文件 |