公用代码库
---

#### 术语或概念

*公用代码开发模式*，*业务代码开发模式*，*公用代码沉淀*，*公用代码版本管理*

#### 意义
* 避免重复开发与方案设计
* 减少需要维护的代码量
* 业务开发向框架/组件开发转型
* 提升技能
* 技术，价值，思考沉淀
* 持续迭代保持新鲜


#### 与脚手架项目之前的关系


> 公用代码库，在业务项目中修改将不会生效，公用代码仓库的修改或开发，需要在公用代码开发模式下进行。


```shell
# 同步到业务项目中默认同步dev分支
npm run download 
```
#### 仓库地址

[仓库地址](http://192.168.39.184:3000/frontend/giant-spa-vue-admin-framework) : http://192.168.39.184:3000/frontend/giant-spa-vue-admin-framework

#### 目录结构
```javascript
framework
  |-auth       //通用权限管理及通用组件
  |-config     //公用配置 
  |-directives //常用指令
  |-layout     //主应用布局，可定制logo, tagsView, userdropdown, 还可以通过业务 /styles/variables.scss 对皮肤主题进行定制
  |-mixins     //常用混入方法
  |-public     //公有public概念，npm run download 之后会copy至业务public中，用于组件静态资源引入
  |-store      //公用全局响应式数据,eg: app, user, etc
  |-enums      //公用枚举
  |-styles
     |-element-ui.rewrite.scss //对element-ui 样式重写
     |-index.scss //通用样式
     |-mixin.scss //常见混入
     |-normalize.scss //reset 概念
     |-transition.scss //常用CSS动画
  |-utils
  |-types //ts 支持
  |-ui //沉淀UI组件，通过对element-ui 结合约定的业务代码进行封装
  |-utils //工具类
  |-dependencies.json //公用代码依赖，借助giant-tools工具，在npm run download 之后会与 业务项目package.json里的dependencies进行merge
  |-enums.js //公用枚举类

```


|目录|模块|简介|
|----|----|----|
|auth|权限|通用权限管理模块|
|layout|主界面布局|header,sidebarmenu,baisclayout|
|store|抽象的一些系统状态|siderbar|
|enums|框架极枚举实例|一些跨业务的枚举|
|utils|共用方法|浏览器，对象，枚举，后端请求等|
