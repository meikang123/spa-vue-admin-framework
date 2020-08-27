### AUD方案
解决后台管理新增、编辑、详情路由页重复配置和路由页面重复新建的问题。


##### 使用场景
在路由配置项使用、使用此方法生成路由对应路径下要存在FormShop.vue大表单文件。
生成后路由地址新增-/shop/add-shop、编辑-/shop/update-shop、详情-shop/detail-shop
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
