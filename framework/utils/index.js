
/**
 * @module utils
 * @description 共用代码工具库 eg
 * @tutorial import { Cookies } from '@framework/utils';
 */

import Cookies from 'js-cookie';
import Enum from './enum';
import Obj from './object';
import request from './request';
import EventBus from './eventbus';
import {
  openNewWindow, toLogin, toApp, checkLogin, mtlLoadResources,
} from './browser';

export {
  Enum,
  Obj,
  request,
  Cookies,
  EventBus,
  openNewWindow,
  toLogin,
  checkLogin,
  toApp,
  mtlLoadResources,
};
