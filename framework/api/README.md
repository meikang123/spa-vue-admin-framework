对接后端接口层（service/api） 方案
------

### 解决的问题
1. 规范api层代码编写方式
2. 生成curd常规方法
3. 低代码  
  3.1 省去import  
  3.2 可直接传入组件, 无需在data/(或)computed 中声明
  3.3 使用公用方法自动生成 delete, detail, getList, modify, add, update 等常见方法

### 实现方案
利用webpack require.context 扫描当前文件夹以文件名为做namespace, 自动注册到Vue.prototype.$api 变量中, 具体可阅读 /src/api/index.js 实现
 
### 开发规范
* 文件名驼峰，首字母大写
* export default
* 注释用jsdoc

#### 示例

```javascript
// src/api/Plan.js 文件名
import request from '@/utils/request';
import { Obj } from '@framework/utils';

export default {
  
  ...Obj.generateCURD('/plan', request),
  /**
   * @description 复制plan
   * @param {*} data plan表单数据
   */
  clonePlan(data) {
    return request.post('/plan/clone', data);
  },
};

```

### 使用规范

```javascript
// 当前Vue 实例内使用
this.$api.Case.getList
```

```javascript
// 非当前Vue 实例内使用
import { Api } from '@/src/api';
Api.Case.getList

```

### 目录结构:
```javascript
  api
  |-Case.js //业务api
  |-User.js
  |-Plan.js
  |-index.js //自注册及统一导出

```