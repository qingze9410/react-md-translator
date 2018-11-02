## react-md-translator

一个简单的react markdown编辑器，可以把markdown文件编译成react Demo 页

```
 npm i react-md-translator
```

```js
import React from 'react'
import reactMarkdownTranslator from 'react-md-translator'
import 'react-md-translator/style/index.less';

class demo extends React.Component {
  render() {
    return (
        <MarkdownTranslator>
          {require('./test.md')}
        </MarkdownTranslator>
    )
  }
}

```