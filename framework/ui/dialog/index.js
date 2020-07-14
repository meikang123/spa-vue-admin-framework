import GtDialog from './src/index';

GtDialog.install = Vue => {
  Vue.component(GtDialog.name, GtDialog);
};

export default GtDialog;
