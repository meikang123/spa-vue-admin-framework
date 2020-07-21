### 07-02
BY 沈展平
### gt-select 方案设计及实现



## 静态数据方式
```
<template>
  <gt-select
    :defaultOptions="options"
    v-model="value"
    :placeholder="'请选择城市'"
  />
</template>
<script>
  export default {
    data() {
      return {
        options: [
          {
            value: '1',
            label: '北京'
          }, {
            value: '2',
            label: 上海'
          }
        ],
        value: ''
      };
    }
  };
</script>

```
## 普通接口方式
```
<template>
  <gt-select
    :requestService="ProductService"
    v-model="value"
    :placeholder="'请选择城市'"
  />
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        ProductService: () => {
        // mock 接口返回
          return new Promise((res, rej) => {
            const obj = {
              code: 0,
              data: {
                data: [
                  {
                    id: 'guangzhou',
                    name: '广州'
                  },
                  {
                    id: 'shenzhen',
                    name: '深圳'
                  }
                ]
              }
            };
            res(obj);
          });
        }
      };
    }
  };
</script>

```
## 缓存接口方式
```
<template>
  <gt-select
    :useRequestCache="true"
    :requestService="ProductService"
    v-model="value3"
    :placeholder="'请选择城市'"
  />
</template>
<script>
  export default {
    data() {
      return {
        value: '',
        ProductService: () => {
        // mock 接口返回
          return new Promise((res, rej) => {
            const obj = {
              code: 0,
              data: {
                data: [
                  {
                    id: 'guangzhou',
                    name: '广州'
                  },
                  {
                    id: 'shenzhen',
                    name: '深圳'
                  }
                ]
              }
            };
            res(obj);
          });
        }
      };
    }
  };
</script>

```
解决问题

1.  el-select 没有接口模式请求，每次使用接口请求 options 需要重复编写。
2.  添加使用配置读取 options 的功能

使用说明

---必须选择一种方式获取options的值---

>静态数据方式

1. defaultOptions 传入静态数据

>普通接口方式

1. requestService 传入请求接口

>缓存接口方式

1. requestService 传入请求接口
2. useRequestCache 传入布尔值,决定是否使用接口缓存




>props


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| defaultOptions | 静态数据 | array | —— | [] |
| requestService | 请求接口 | promise | —— | —— |
| useRequestCache | 是否使用接口缓存 | Boolean | true/false | false |
| value | 绑定值 | boolean / string / number| —— | —— |
| placeholder | 占位符 | string | —— | 请选择 |

