# 关于组件讲解
## 组件初始化
### 语法支持
页面中的`this.selectComponent(<元素id选择器>)`可以返回对应的组件，`this.selectAllComponents(<元素class选择器>)`可以返回对应的元素列表，`el.func(data)`可以执行对应的函数
### 使用情况
自定义函数 initData 用于初始化组件元素数值，因为该项目很多时候在页面初始化后网络请求得到数据，然后要按照数据使用组件，此时如果使用`properties`是迟的。
## 输入结果返回
### 语法支持
组件里面使用`this.triggerEvent('name',data)`可以传递信号给父组件或元素，父组件或元素可以通过在`wxml`的`bind="funcName"`监听，函数定义部分`f(e)`可以通过`e.detail`获取`data`。
### 使用情况
`button`组件信号名是`the_tap`，为了不和原生的`tap`冲突。`input`等输入组件的信号名是`input`，数据是`{key:value}`，在组件数据初始化也就是initData执行后和用户输入的时候会发送信号，`input-group`发送的数据对象是`{key1:value1,key2:value2}`。