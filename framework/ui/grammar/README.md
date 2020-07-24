### gt-grammar 语法设计方案

### 示例代码
```vue
<template>
  <gt-grammar v-model="value" @init="init" />
</template>
<script>
  export default {
    data() {
      return {
        editor: null,
        value: '{"a": 123}'
      };
    },
    methods: {
      init(editor) {
        this.editor = editor;
        this.editor.setValue('content', 1);
      }     
    }
  };
</script>

```

#### 背景
    基于brace二次开发
    
    [API](https://ace.c9.io/#nav=about)

#### 解决问题
    添加代码在线编辑、语法错误检查、语法高亮、JSON序列化展示

#### 使用说明

> 依赖

```json
{
	 "brace": "^0.11.1",
}
```

> props 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| value / v-model | 绑定值 | string | — | — |
| theme | 主题 | string | brace/theme/里选择 | chrome |
| height | 编辑区高度 | string/number | — | 200px |
| width | 编辑区宽度 | string/number | — | 400px |
| readyOnly | 是否只读  | boolean  | — | false |
| langDefault | 默认使用语法 | string | brace/mode/里选择 | text |
| showChangeLanguage | 是否显示语言切换 | boolean | — | true(只读下是不显示的) |
| options | 初始参数 | object | 参考API | — |

> Methods

|方法|说明|回调参数|
| --- | --- | --- |
|init|语法对象初始化成功|目标语法对象可外部使用API扩展|
