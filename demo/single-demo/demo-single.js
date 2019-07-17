import React from 'react'
import Demo from '../../libs';
import Dep1 from '../Dep1';
import Dep2 from '../Dep2';

import '../../style/index.css';

export default class demoSingle extends React.Component {
  render() {
    return (
        <div>
          <h1>单个Demo渲染</h1>
          <p>一个将markdown文件转换为html页面的工具</p>
          <h2>demo模式</h2>
          <Demo style={{marginBottom: 20}} dependencies={{Dep1}} markdown={require('./demo.md')}/>
          <h2>display模式</h2>
          <Demo dependencies={{Dep2}} markdown={require('./display.md')}/>
        </div>
    )
  }
}