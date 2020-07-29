import { GtFormItem } from './form';
import GtSelect from './select';
import GtDialog from './dialog';
import GtPagination from './pagination';
import GtConfirm from './confirm';
import { GtTableTpl, GtTableTplMIXIN } from './template';
import GtSvgIcon from './SvgIcon';

export {
  GtFormItem,
  GtSelect,
  GtDialog,
  GtPagination,
  GtSvgIcon,
  GtTableTpl,
  GtTableTplMIXIN
};

const components = [
  GtFormItem,
  GtSelect,
  GtDialog,
  GtPagination,
  GtTableTpl,
  GtSvgIcon
];

const install = Vue => {
  components.forEach(comp => {
    Vue.component(comp.name, comp);
  });
  
  Vue.prototype.GtConfirm = GtConfirm;
};


export default {
  install
};
