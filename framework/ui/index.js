import { GtFormItem } from './form';
import GtSelect from './select';
import GtDialog from './dialog';
import GtPagination from './pagination';
import GtConfirm from './confirm';
import { GtTableTpl, GtTableTplMIXIN } from './template';
import GtSvgIcon from './_svgicon';
import GTTinyMce from './tinymce';

export {
  GtFormItem,
  GtSelect,
  GtDialog,
  GtPagination,
  GtSvgIcon,
  GtTableTpl,
  GTTinyMce,
  GtTableTplMIXIN
};

const components = [
  GtFormItem,
  GtSelect,
  GtDialog,
  GtPagination,
  GtTableTpl,
  GtSvgIcon,
  GTTinyMce
];

const install = Vue => {
  components.forEach(comp => {
    Vue.component(comp.name, comp);
  });
  
  Vue.prototype.GtConfirm = GtConfirm;
  Vue.prototype.$gtconfirm = GtConfirm;
};


export default {
  install
};
