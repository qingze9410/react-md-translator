import React from 'react'
import MarkdownTranslator from '../libs';

export default class demo extends React.Component {
  render() {
    return (
        <MarkdownTranslator>
          {require('./test.md')}
        </MarkdownTranslator>
    )
  }
}