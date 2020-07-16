import { GtFormItem } from './form';
import GtSelect from './select';

export {
  GtFormItem,
  GtSelect
};

const components = [
  GtFormItem,
  GtSelect
];
const install = Vue => {
  components.forEach(comp => {
    Vue.component(comp.name, comp);
  });
};

export default {
  install
};
