import React from 'react'
import MarkdownTranslator from '../es';
import '../style/index.less';

export default class demo extends React.Component {
  render() {
    return (
        <MarkdownTranslator>
          {require('./test.md')}
        </MarkdownTranslator>
    )
  }
}