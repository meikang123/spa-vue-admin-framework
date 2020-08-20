共用代码仓库
=======

### 场景

包括但不限于使用 [gaint-spa-vue-admin-scaffold](http://git.juqitech.com/dev_front_infrastructure/mtl-spa-vue-admin-scaffold) 初始化的项目。

### 方法

#### 业务开发模式
```shell
# 项目根目录下执行
npm run download
```
同步指定版本的 framework 至业务项目的 src/framework 目录下，
公用代码指方式：
```javascript
//package.json eg.
{
  ...
  "framework": {
    "name": "spa-vue-admin",
    "branch": "dev"
  },
  ...
}
```

#### 公用代码开发模式

##### 1. 如何开发，联调公用代码
```shell
# Clone 公用代码仓库
git clone git@git.juqitech.com:dev_front_infrastructure/mtl-spa-vue-admin-framework.git

# 切到合理的分支

# Clone 联调的业务代码项目
npm run clone

# 在生成的settings.json 填写业务代码的git地址，及合理的分支
npm run clone 

cd project
npm install
npm run dev 

# 项目启动之后在 ./framework 中代码改变相当于 ./project/src/framework 中的改变
```

##### 2. settings.json 样例
该文件位于项目根目录下
```javascript
{
  "address": "git@git.juqitech.com:dev_frontend/ticketmars_b.git",
  "branch": "dev_main"
}
```

##### 3. 如何提交？
（单一分支模式）

目前来说提交至dev分支，相关项目执行发布操作会自动拉新，相关项目在业务开发模式下，执行 npm run download 会手动拉新。该模式最简单易用但是会有公用代自动升级带来风险的问题

 （多分支按计划升级模式）
依赖于团队管理策略

### 原理

通过项目运行环境检测动态指定 @/framework 的引用目录。
1. 当在本项目中启动业务项目时 @/framework 指向本项目 /framework；
2. 业务项目独立启动时 @/framework 指向业务项目 /src/framework

### 概念

Framework与业务项目是一对多的关系。

1. Framework的开发与成形引入项目坞的概念，通过在 framework-settings.json 设置业务项目的地址及分支可以指定要切换的项目

2. 业务项目项目通过锁定 framework 版本保证项目运行的稳定。

```shell
# 业务项目进坞
npm run clone
```

#### 业务项目引用方面

测试项目存放坞
===

/project 目录下临时用来联调的项目

### 代码提交

/project 目录下提交业务代码
/ 目录下提交 framework 代码

### 目录结构
```javascript
.
├── package.json
├── framework
    ├──auth 权限模块
    ├──directives 指令
    ├──global 跨项目全局配置
    ├──layout 项目骨架布局组件
       ├──BasicLayout 项目容器
       ├──Header 
       └──SiderMenu 左菜单 
    ├──SiderMenu 左菜单 
    ├──mixins 混入组件     
    ├──styles 公用样式
    ├──ui ui组件库
```

