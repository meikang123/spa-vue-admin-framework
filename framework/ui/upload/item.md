gt-upload-item 图片上传form-item组件
===
>author: lukunkun

> 示例代码
```
<template>
  <gt-upload-item v-model="formData.image" label="商品图片" prop="image" required :is-detail="isDetail" :type-options="typeOptions" />
</template>
<script>
  export default {
    data() {
      return {
        formData: {
            image: ''
        },
        typeOptions: {
            action: `/upload`,
            getRenderList(url) {
                if (url) return [{ url: `//${url}` }];
                return [];
            },
            setRenderList(data) {
                if (data && data.length) {
                    const { url } = data[0];
                    return url.startsWith('//') ? url.substr(2) : url;
                }
                return '';
            }
        }
      };
    }
  };
</script>

```


> 背景

    基于element的form-item和gt-upload-img组件的包装，实现上传图片的form-item使用

> 解决问题

    1. 统一上传组件样式，方便使用管理
    2. 封装form-item，简化图片上传错误处理

> 使用说明

    1. 支持部分el-form-item属性和方法
    2. 支持gt-upload-item的属性和方法
    3. 增加部分props属性

> props 属性

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| v-model/value | 绑定值 | string/array | — | — |
| prop | 必填项，用于上传图片验证 | string | — | — |
| required | 是否必填 | boolean | — | false |
| multiple | 是否支持上传多个文件，为true时支持多选文件 | boolean | — | false |
| mode | 组件模式，uploadUrl为single时有用 | string | — | input |
| isDetail | 是否是详情查看，并传递到gt-upload-img组件 | boolean | — | false |
| typeOptions | 传递到gt-upload-img组件的属性 | object | — | {} |

>  支持el-form-item 的方法和属性，rules除外