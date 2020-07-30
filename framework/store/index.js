import getters from './getters';
import user from './modules/user';
import tagsView from './modules/tagsView';
import app from './modules/app';

const commonModules = {
  user,
  tagsView,
  app
};

const commonGetters = getters;

export {
  commonGetters,
  commonModules
};
