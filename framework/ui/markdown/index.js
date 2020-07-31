import GtMarkDownEditor from './src/editor';
import GtMarkDownDisplay from './src/display';


export {
  GtMarkDownEditor,
  GtMarkDownDisplay
};

const install = Vue => {
  Vue.component(GtMarkDownEditor.name, GtMarkDownEditor);
  Vue.component(GtMarkDownDisplay.name, GtMarkDownDisplay);
};

export default {
  install
};
