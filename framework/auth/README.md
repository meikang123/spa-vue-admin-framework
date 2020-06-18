权限模块
===
应用权限管理共用代码

### 1. 菜单的权限处理
实现原理：路由配置->页面菜单，所以只要在拿到系统预置的路由配置之后，再通过token拿到的全量权限点列表对预置配置过进行过滤即可现实页面菜单的按权限显示。
1. 过滤的时机 basicLayout created
2. 过滤之后配置的存取 vuex->store->user

```javascript
// 业务项目中使用示例
import { routeDeepFilter } from '@framework/auth';

export default {
  mutations: {
    ...
    APP_INIT_AUTHRISED_ROUTES(state, payload) {
      const { codes } = payload;
      const nextRoutes = routeDeepFilter(routes, codes);
      state.authrisedRoutes = nextRoutes;
    },
  }
};

```

### 组件的权限处理

业务项目全局引入
```javascript
//main.js(项目入口文件，启动文件)
import '@framework/auth';
```
#### 1.通过公用权限组件wrap的方式来实现

对需要鉴权组件（ui）进行包裹

```html

<!-- 举例1，使用默认无权显示组件 -->
<mtl-auth code="权限点">
  <component-x></component-x>
</mtl-auth>

<!-- 举例2，使用自定义无权显示组件 -->
<mtl-auth code="权限点">
  <component-x></component-x>
  <template slot="noauth">
    <div>
      D系统： 您没权限请联系XXXX。
    </div>
  </template>
</mtl-auth>
```
props:

|参数|说明|类型
|----|----|----|
|code|该组件的权限点,当类型为Array,且具有多个权限点的时候取或；当类型为String的时候取等 |Array/String|

权限校验依赖 vuex->store->getters->USER_GET_AUTHORIZATION_CODES, 全局的用户权限点。 

#### 2.通过指令方式实现
```html
<component-x v-mtl-auth="权限点"></component-x>
```
