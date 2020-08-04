gt-select
===
>author: 沈展平 07-02， 修改： caoshitong

#### 示例代码

```html
<!--静态数据方式-->
<gt-select
  :defaultOptions="options"
  v-model="value"
  :placeholder="'请选择城市'"
/>

<!--接口数据方式-->
<gt-select
  :requestService="this.$api.City.getList"
  v-model="searchData.cityId"
  :placeholder="'请选择城市'"
/>

<!--接口数据缓存方式-->
<gt-select
  :use-request-cache="true"
  :request-service="this.$api.City.getList"
  v-model="searchData.cityId"
  :placeholder="'请选择城市'"
/>
```

#### 解决的问题

    1. 封装options的生成过程
    2. 采用cache方式对远程结果提供缓存实现
    3. 一定程度上可以对后端接口数据形成约束

#### 使用说明

> 跟据数据源的获取方式该组件可以分为以下两大类

    1. 静态数据方式: 不设置 requestService，通过defaultOptions 传入可选项 
    2. 接口数据方式: 设置 requestService，通过它来获取数据，它是一个Promise, 比如返回一个axios的promise的包装，
    这种情况下 defaultOptions，value 配合使用可以用来设置默认的回填值及回填显示。

#### props 属性


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| default-options | 静态数据 | Array | —— | [] |
| request-service | 请求接口 | Promise | —— | —— |
| use-request-cache | 是否使用接口缓存 | Boolean | true/false | false |
| value | 绑定值 | Boolean / String / Number/ Array| —— | —— |
| placeholder | 占位符 | String | —— | 请选择 |
| multiple | 多选 | Boolean | —— | false |
| response-resolve | 定制接口返回数据 | Function | false |
| params-resolve | 定制接口请求参数 | Function | false |

