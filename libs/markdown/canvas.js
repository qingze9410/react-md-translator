import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import marked from 'marked';
import {transform} from 'babel-standalone';
import less from 'less';
import sass from 'sass.js';
import prism from 'prismjs';
import Editor from '../editor';
import 'prismjs/components/prism-less';

//代码展示容器
export default class Canvas extends React.Component {
  static propTypes = {
    locale: PropTypes.object,
    name: PropTypes.string,
    containerId: PropTypes.string,
    children: PropTypes.node,
    dependencies: PropTypes.object,
    showCode: PropTypes.bool,
  };

  static defaultProps = {
    showCode: true,
    locale: {
      hide: '隐藏代码',
      show: '显示代码'
    }
  };

  constructor(props) {
    super(props);
    //坑位Id
    this.playerId = `player-${parseInt(Math.random() * 1e9).toString(36)}`;
    //分类匹配出less/scss/js/jsx/css
    const descriptionSource = this.props.children.replace(/(`{3})([^`]|[^`][\s\S]*?[^`])\1(?!`)/ig, (markdown) => {
      const [all, type, code] = markdown.match(/```(.*)\n?([^]+)```/);
      const trimType = type.trim();
      switch (trimType) {
        case 'js':
        case 'jsx':
          this.jsCode = code;
          break;
        case 'less':
        case 'css':
          this[`${trimType}CodeSource`] = marked(all);
          less.render(`
            #${this.playerId} {
              ${code}
            }
          `, (e, compiledCode) => {
            this[`${trimType}Code`] = compiledCode.css;
          });
          break;
        case 'scss':
          this[`${trimType}CodeSource`] = marked(all);
          sass.compile(`
            #${this.playerId} {
              ${code}
            }
          `, (compiledCode) => {
            this[`${trimType}Code`] = compiledCode.text;
            // sass compile fix
            this.forceUpdate();
          });
          break;
        default:
          break;
      }
      return '';
    });
    //replace剩下的是description
    this.description = marked(descriptionSource);

    this.state = {
      showBlock: false,
    };
  }

  componentDidMount() {
    this.renderSource(this.jsCode);
  }

  blockControl() {
    this.setState({
      showBlock: !this.state.showBlock,
    }, () => {
      if (this.state.showBlock && (this.lessCodeSource || this.cssCodeSource || this.scssCodeSource)) {
        prism.highlightAllUnder(document.getElementById(`${this.props.containerId}`));
      }
    });
  }

  renderSource(value) {
    const presets = ['react', 'stage-1'];
    new Promise((resolve) => {
      const args = ['context', 'React', 'ReactDOM'];
      const argv = [this, React, ReactDOM];
      this.props.dependencies &&
      Object.keys(this.props.dependencies).forEach((key) => {
        args.push(key);
        argv.push(this.props.dependencies[key]);
      });
      resolve({args, argv})
    }).then(({args, argv}) => {
      let code;
      if (/ReactDOM\.render/.test(value)) {
        code = transform(`
           ${value.replace('mountNode', `document.getElementById('${this.playerId}')`)}
        `, {
          presets
        }).code;
      } else {
        code = transform(`
          class Demo extends React.Component {
             ${value}
          }
          ReactDOM.render(<Demo {...context.props} />,
          document.getElementById('${this.playerId}'))
          `, {
          presets
        }).code;
      }
      args.push(code);
      //render to playrId div
      new Function(...args).apply(null, argv);
    }).catch((err) => {
      if (process.env.NODE_ENV !== 'production') {
        throw err;
      }
    });
  }

  render() {
    // 支持的css类型
    const cssSupportMap = ['less', 'scss', 'css'];
    const {showCode, name} = this.props;
    const {showBlock} = this.state;
    return (
        <div className={`demo-block demo-box demo-${name}`}>
          <div className="source" id={this.playerId}/>
          {
            showCode &&
            <React.Fragment>
              {
                showBlock && (
                    <div className="meta">
                      {
                        this.description && (
                            <div
                                ref="description"
                                className="description"
                                dangerouslySetInnerHTML={{__html: this.description}}
                            />
                        )
                      }
                      <Editor
                          value={this.jsCode}
                          onChange={code => this.renderSource(code)}
                      />
                      {
                        cssSupportMap.map(source => {
                          const sourceCode = this[`${source}CodeSource`];
                          if (sourceCode) {
                            return <div key={source}
                                        className="style-block"
                                        dangerouslySetInnerHTML={{__html: sourceCode}}/>;
                          }
                        })
                      }
                    </div>
                )
              }
              <div className="demo-block-control" onClick={this.blockControl.bind(this)}>
                {
                  this.state.showBlock ? (
                      <span>{this.props.locale.hide}</span>
                  ) : (
                      <span>{this.props.locale.show}</span>
                  )
                }
              </div>
            </React.Fragment>
          }
          {
            cssSupportMap.map(source => {
              const sourceCode = this[`${source}Code`];
              if (sourceCode) {
                return <style key={source}>{sourceCode}</style>;
              }
            })
          }
        </div>
    );
  }
}
