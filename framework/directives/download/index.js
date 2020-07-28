import { Message } from 'element-ui';

export default {
  bind(el, { value }) {
    el.$value = value;
    el.handler = () => {
      if (!el.$value) {
        return Message({
          type: 'warning',
          message: '下载地址不存在'
        });
      }
      const link = document.createElement('a');
      link.setAttribute('download', '');
      link.setAttribute('href', el.$value);
      link.style.position = 'absolute';
      link.style.left = '-9999px';
      link.style.opacity = 0;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
    el.addEventListener('click', el.handler);
  },
  componentUpdated(el, { value }) {
    el.$value = value;
  },
  unbind(el) {
    el.removeEventListener('click', el.handler);
  }
};
