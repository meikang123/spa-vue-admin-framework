import { MessageBox } from 'element-ui';
/**
 * @description vue实例全局注册方法
 * @param {string} message 二次确认显示的文案
 * @param {function} success 点确认按钮的回调
 * @param {function} cancel 点取消按钮的回调， 可选
 */
const GtConfirm = (message, success, cancel) => {
  MessageBox.confirm(`${message}`, '系统提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    center: false,
    customClass: 'gt-confirm',
    type: 'warning'
  }).then(() => {
    success();
  }).catch(() => {
    if (cancel) {
      cancel();
    }
  });
};

export default GtConfirm;
