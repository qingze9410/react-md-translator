import React from 'react'
import DemoPage from '../../libs';
import Dep1 from '../Dep1';
import Dep2 from '../Dep2';

import '../../style/index.scss';
import '../../style/md-style.scss';

export default class demoPage extends React.Component {
  render() {
    return (
        <DemoPage dependencies={{Dep1, Dep2}} markdown={require('./demo-page.md')}/>
    )
  }
}