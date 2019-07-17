# Demo示例

Demo页描述

## demo

::: demo demo描述内容

```js
class Demo extends React.Component{
  render(){
    const article = 'There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.';
    return(
        <div>
          <h4>{article}</h4>
        </div>
    )
  }
}

ReactDOM.render(<Demo {...context.props}/>,mountNode)
```

```scss
h4{
  font-size: 32px;
}
```
:::


## display

::: display

```js
render(){
  const article = 'There were injuries alleged in three cases in 2015, and a fourth incident in September, according to the safety recall report. After meeting with US regulators in October, the firm decided to issue a voluntary recall.';
  return(
      <div>
        <h4>{article}</h4>
      </div>
  )
}
```
:::
