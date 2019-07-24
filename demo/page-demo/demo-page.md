# Checkbox 多选框

一组备选项中进行多选

## 基础用法

单独使用可以表示两种状态之间的切换，写在标签中的内容为 `checkbox` 按钮后的介绍。

::: demo 单一的checkbox中，默认绑定变量的值会是`Boolean`，选中为`true`。
         
```js
class Demo extends React.Component{
  render(){
    return(
        <div>
         <input type="checkbox"/>
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

## 参数

| 参数     | 说明         | 类型    | 可选值                                      | 默认值  |
| -------- | ------------ | ------- | ------------------------------------------- | ------- |
| type     | 类型         | string  | primary/success/warning/danger/info/default | default |
| disabled | 是否禁用     | boolean | -                                           | False   |
| href     | 原生href属性 | string  | -                                           | -       |


