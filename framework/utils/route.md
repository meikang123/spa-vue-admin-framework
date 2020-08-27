### AUD方案
解决后台管理新增、编辑、详情路由页重复配置和路由页面重复新建的问题。


##### 使用场景
在路由配置项使用、使用此方法生成路由对应路径下要存在FormShop.vue大表单文件。

> 说明

| 字段 | 新增 | 编辑 | 详情 |
| --- | --- | --- | --- |
|路由地址|/shop/add-shop|/shop/update-shop|shop/detail-shop|
|路由name|addShop|updateShop|detailShop|

> 使用方式

```javascript
const routes = [{ 
  path: 'shop',
  component: Layout,
  children: [
    {
      path: 'index',
      name: 'shopIndex',  
    }, ...generateAUDRoute('shop', '商品') 
  ]
}]
```
