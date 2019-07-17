import React from 'react'
import DemoPage from '../../libs';
import Dep1 from '../Dep1';
import Dep2 from '../Dep2';

import '../../style/index.css';

export default class demoPage extends React.Component {
  render() {
    return (
        <DemoPage dependencies={{Dep1, Dep2}}>
          {require('./demo-page.md')}
        </DemoPage>
    )
  }
}