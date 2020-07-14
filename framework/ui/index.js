import { GtFormItem } from './form';

const abc = {};
export {
  GtFormItem,
  abc
};

const components = [
  GtFormItem
];


const install = Vue => {
  components.forEach(comp => {
    Vue.component(comp.name, comp);
  });
};

export default {
  install
};
