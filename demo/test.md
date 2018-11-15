# Demo示例

Demo页描述

## demo写法-1

::: demo 1

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

```css
h4{
  font-size: 14px;
}
```

:::


## demo写法-2

::: demo 2

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

```less
h4{
  font-size: 32px;
}
```
:::


## display写法-仅展示

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
