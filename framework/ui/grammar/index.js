import Grammar from './grammar';

const install = Vue => {
  Vue.component(Grammar.name, Grammar);
};

if (window.Vue) {
  window.Vue.use(install);
}

export default Grammar;
