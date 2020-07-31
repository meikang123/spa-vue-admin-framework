### gt-dialog 公共弹窗

### 示例代码
```
<template>
  <gt-dialog :visible.sync="visible" title="提示">
    这是一段信息
  </gt-dialog>
</template>
<script>
  export default {
    data() {
      return {
        visible: false
      };
    }
  };
</script>

```

#### 背景
    基于element的dialog组件二次开发

#### 解决问题
    1. 统一弹窗样式，支持皮肤主题设计, 去除样式重复编写
    2. 滚动高度自动计算

#### 使用说明
    1. 支持所有element-dialog方法
    2. 增加props属性

> props 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| visible | 是否显示 Dialog，支持 .sync 修饰符 | boolean | — | false |
| title | Dialog 的标题，也可通过具名 slot 传入 | string | — | — |
| theme | Dialog 的主题，使用与皮肤设计 | string | — | primary |
| mode | Dialog 的滚动方式，用于计算body的最大高度 | string | — | middle |
| maxHeight | Dialog 的body最大高度设置，优先于mode设置 | string | — | — |
| isShowFooter | 是否显示Dialog 的footer栏 | boolean | — | true |
| top | Dialog CSS中的margin-top值 | string | — | 10vh |
| isLoading | Dialog body内容支持loading | boolean | — | false |