import React from 'react'
import MarkdownTranslator from '../libs';
import '../style/index.scss';

export default class demo extends React.Component {
  render() {
    return (
        <MarkdownTranslator>
          {require('./test.md')}
        </MarkdownTranslator>
    )
  }
}