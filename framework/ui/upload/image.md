gt-upload-img 图片上传组件
===
>author: lukunkun

> 示例代码
```
<template>
  <gt-upload-img v-model="image" :action="uploadUrl" :is-detail="isDetail" />
</template>
<script>
  export default {
    data() {
      return {
        uploadUrl: '/upload',
        image: '',
        isDetail: false
      };
    }
  };
</script>

```


> 背景

    基于element的upload组件二次开发

> 解决问题

    1. 统一上传组件样式，方便使用管理
    2. 支持单个或多个图片上传
    3. 支持大图查看，图片删除
    4. 支持详情查看

> 使用说明

    1. 支持部分el-upload属性和方法
    2. 重写el-upload部分属性和方法
    3. 增加部分props属性

> props 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model/value | 绑定值 | string/array | — | — |
| isDetail | 是否是详情查看 | boolean | — | false |
| multiple | 是否支持上传多个文件，为true时支持多选文件 | boolean | — | false |
| size | 上传文件的大小限制，单位kb | number | — | 0 |
| measure | 上传文件尺寸大小，例如：30*30 | string | — | — |
| fileTypes | 可上传文件类型 | string | — | — |
| buildRenderData | 构建渲染数据，参数为v-model/value绑定值，需返回数组，例如：[{url: '//xxx.cdn.com/xxx.jpg'}] | function | — |
| renderDataMap | 处理渲染数据与v-model/value绑定值映射，参数为默认数据或buildRenderData处理后的数据，例：[{url: '//xxx.cdn.com/xxx.jpg'}]，返回业务需要的数据 | function | — |
| handleUploadSuccess | 处理上传成功服务端返回的数据，返回{url: '//xxx.cdn.com/xxx.jpg'}，返回值必须包含url项，用于图片预览 | function | — |

>  el-upload 可用属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| action | 必选参数，上传的地址 | string | — | — |
| headers | 设置上传的请求头部 | object | — | — |
| data | 上传时附带的额外参数 | object | — | — |
| name | 上传的文件字段名 | string | — | file |
| with-credentials | 支持发送 cookie 凭证信息 | boolean | — | true |
| diabled | 是否禁用 | boolean | — | false |
| limit | 上传文件个数限制 | number | — | 0 |
| auto-upload | 目前仅支持自动上传 | boolean | — | true |

> Slot

| name | 说明 |
| --- | --- |
| tip | 提示说明文字 |

> Event 事件

| name | 说明 |
| --- | --- |
| success | 上传成功，function(val, hasError){} val成功返回值，hasError本次上传是否包含错误（用于多选上传） |
| error | 上传成功，function(error){} error错误信息(string) |