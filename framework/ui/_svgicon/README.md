gt-svg-icon
===
最新鲜的 iconfont 解决方案

#### 示例

```html
<gt-svg-icon icon-name="chart" />
```

```html
<!--自定义 class-->
<gt-svg-icon icon-name="chart" class="custom-svg-icon"/>


<style scoped lang="scss">
.custom-svg-icon{
  color: red;
}
</style>

```

#### 方案

#### 1. Webpack配置
```javascript
  //vue.conf.js
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, './src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, './src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
```

#### 2. iconfont 维护
svg文件 存在目录 src/icons/svg， svg文件名与 **icon-name** 进行对应

eg.

```javascript
src
 |-icons
    |-svg
       |-404.svg
       |-chart.svg
```

#### 3. 项目引入
```javascript
// ./icons/index.js
const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
```
```javascript
//main.js app入口
import './icons';
```