import { MessageBox } from 'element-ui';

const MTLConfirm = (message, success, cancel) => {
  MessageBox.confirm(`${message}`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    success();
  }).catch(() => {
    if (cancel) {
      cancel();
    }
  });
};

const other = {};

export {
  MTLConfirm,
  other,
};
