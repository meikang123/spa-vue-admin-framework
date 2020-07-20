import { GtFormItem } from './form';
import GtSelect from './select';
import Dialog from './dialog';

export {
  GtFormItem,
  GtSelect,
  Dialog
};

const components = [
  GtFormItem,
  GtSelect,
  Dialog
];
const install = Vue => {
  components.forEach(comp => {
    Vue.component(comp.name, comp);
  });
};

export default {
  install
};
