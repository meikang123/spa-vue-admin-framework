## 07-02

### gt-select 方案设计及实现

解决问题

1.  el-select 没有接口模式请求，每次使用接口请求 options 需要重复编写。
2.  添加使用配置读取 options 的功能

使用说明

--基本接口模式

1. 在 src 目录下的 api 文件夹(结构中的接口文件地址)中的 index.js 中引入相关接口文件并根据定义名导出。
2. 在使用组件中引入 api 文件
3. 在 gt-select 使用时 requestName 传入接口定义名，placeholder-val 传入 placeholder，v-model 中定义使用的值

--remote 接口模式(需要更加完善，远程过滤)

1. 在 gt-select 使用时 remote 传值 true, requestName 传入接口定义名，placeholder-val 传入 placeholder，v-model 中定义使用的值

--配置模式

1. 在 gt-select 使用时 dict-name 传入配置中使用的字段名，placeholder-val 传入 placeholder，v-model 中定义使用的值
