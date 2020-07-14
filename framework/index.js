/**
 * @description 一些需要安装的内容
 */
import {
  BasicLayout,
  SiderMenu,
  Header
} from './layout';

const components = [
  BasicLayout,
  SiderMenu,
  Header
];


const install = Vue => {
  for (let index = 0; index < components.length; index++) {
    const comp = components[index];
    Vue.component(comp.name, comp);
  }
};


export default {
  install
};
