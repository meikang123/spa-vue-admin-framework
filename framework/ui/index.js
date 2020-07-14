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

console.log(GtSelect, '----gtselect');
const install = Vue => {
  components.forEach(comp => {
    Vue.component(comp.name, comp);
  });
};

export default {
  install
};
