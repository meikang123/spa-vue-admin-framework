$gtconfigm 二次确认弹窗
===
>AUTHOR: caoshitong

#### 示例代码
```javascript
methods:{
  confirm() {
    this.$el.querySelector('div[id="J-message"]').innerText = '你确认了删除';
  },

  cancel() {
    this.$el.querySelector('div[id="J-message"]').innerText = '你取消了删除';
  },

  showConfirm() {
    this.$gtconfirm('你确定要删除${name}吗？', this.confirm, this.cancel);
  }
}
```

#### 解决的问题

* 跟据约定预制参数， 31个配置参数缩减为 3个。
* 跟据约定修改了原 MessageBox的样式

#### 参数说明

```javascript
/**
 * @description vue实例全局注册方法
 * @param {string} message 二次确认显示的文案
 * @param {function} success 点确认按钮的回调
 * @param {function} cancel 点取消按钮的回调， 可选
 */
this.$gtconfigm(message, success, cancel);


```


