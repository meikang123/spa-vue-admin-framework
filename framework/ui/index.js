import { GtFormItem } from './form';
import GtSelect from './select';
import GtDialog from './dialog';
import GtPagination from './pagination';
import { GtTablePage, GtTablePageMIXIN } from './template';

export {
  GtFormItem,
  GtSelect,
  GtDialog,
  GtPagination,
  GtTablePage,
  GtTablePageMIXIN
};

const components = [
  GtFormItem,
  GtSelect,
  GtDialog,
  GtPagination,
  GtTablePage
];

const install = Vue => {
  components.forEach(comp => {
    Vue.component(comp.name, comp);
  });
};

export default {
  install
};
