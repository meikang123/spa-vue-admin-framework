gt-select
===
>AUTHOR: 沈展平 07-02

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

*  封装options的生成过程
*  采用cache方式对远程结果提供缓存实现
*  一定程度上可以对后端接口数据形成约束

#### 使用说明

数据源获取方式: 以下2选一

> 静态数据方式

defaultOptions 传入静态数据

> 普通接口方式

requestService 传入请求接口

#### props 属性

> 注意：设置了 requestService 参数之后认为数据源是远程的，而设置defaultOptions有两种情况：
*  1.数据源为本地数据，无需设置 requestService
*  2.defaultOptions仅用于回填数据的显示，搜索时仍使用远程接口， 这种情况下 requestService 需要设置为远程接口方法。 eg. this.$api.City.getList


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| default-options | 静态数据 | Array | —— | [] |
| request-service | 请求接口 | Promise | —— | —— |
| use-request-cache | 是否使用接口缓存 | Boolean | true/false | false |
| value | 绑定值 | Boolean / String / Number/ Array| —— | —— |
| placeholder | 占位符 | String | —— | 请选择 |
| multiple | 多选 | Boolean | —— | false |

