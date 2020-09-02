/**
 * @module utils/browser
 * @description 浏览器操作
 * @author caoshitong@moretickets.com
 */

import Cookies from 'js-cookie';
import { APP_AUTH_TOKEN } from '../config/consts';
import EventBus from './eventbus';
import { AppEventTypeEnum } from '../enums';
/**
 * @description 打开新页面, 通过模拟点击 a 连接打开新窗口
 * @param {string} url 新页面的URL location.pathname
 * @param {object} params 拼接到生成 location.search
 */
const openNewWindow = (url, params = {}) => {
  console.log(params);
};

/**
 * @description axios 文件下载逻辑
 * @param {object} res - 文件下载返回的response
 * @TODO 待优化
 */
const fileDownload = res => {
  const blob = res.data;
  const { headers: { 'content-disposition': disposition } } = res;
  const reader = new FileReader();
  reader.readAsDataURL(blob);
  reader.onload = e => {
    const fileName = decodeURI(disposition.match(/attachment;filename=(.*)/)[1]);
    const elementA = document.createElement('a');
    elementA.download = fileName;
    elementA.href = e.target.result;
    document.body.appendChild(elementA);
    elementA.click();
    document.body.removeChild(elementA);
  };
};

/**
 * @description 去登录页，一般需要带上当前页，用于登录成功之后返回
 * @param {string} loginUrl 登录页的路径
 * @param {object} router 可选属性，如果不传用 window.location.href 进行跳转，传了之后用router push进行跳转提升跳转速度
 */
const toLogin = (loginUrl, router) => {
  const { location: { href } } = window;
  debugger;
  const toUrl = `${loginUrl}?from=[${encodeURIComponent(href)}]`;
  if (!router) {
    window.location.href = toUrl;
  } else {
    router.push({ path: toUrl });
  }
};

/**
 * @param {Route} route 当前路由
 * @param {Array} routeWhiteList 不用检查路由的白名单
 */
const checkLogin = (route, routeWhiteList) => {
  let result = true;
  const { path } = route;
  if (!routeWhiteList.includes(path)) {
    const authToken = Cookies.get(APP_AUTH_TOKEN);
    if (authToken) {
      result = true;
    } else {
      EventBus.$emit(AppEventTypeEnum.RE_LOGIN);
      result = false;
    }
  }
  return result;
};

/**
 * @description 登录之后根据from 跳到指定页面，实现从哪来回哪儿去
 * @param {string} defaultUrl 没有from跳到系统默认页
 * @param {token} token 后端反回的token
 * @param {object} router 路由实例
 */
const toApp = (defaultUrl, token, router) => {
  let appUrl = defaultUrl;
  const { search } = window.location;
  window.localStorage.setItem(APP_AUTH_TOKEN, token);
  const matched = decodeURIComponent(search).match(/from=\[(.*?)\]/);
  if (matched && matched.length === 2) {
    const { 1: matchedUrl } = matched;
    appUrl = matchedUrl;
  }
  if (router) {
    const { location: { origin } } = window;
    const toPath = appUrl.replace(origin, '');
    router.push({ path: toPath });
  } else {
    window.location.href = appUrl;
  }
};

const WindowResources = [];
/**
 * @description 动态引入资源，用于单易引入不用编译的js/css 减少编译负担
 * @param {string} src 资源路径
 * @param {function} callback 回调函数，只适用于js
 * @param {boolean} noLoad 跳过加载直接执行回调
 */
const loadResources = (src, callback, noLoad) => {
  if (WindowResources.includes(src) && callback && typeof callback === 'function') {
    callback();
    return;
  }
  if (noLoad && callback && typeof callback === 'function') {
    callback();
    return;
  }

  if (!src) {
    console.log(new Error('please set the src of script/css'));
    return;
  }
  // load javascript
  if (/\.js(\?v=.*){0,1}$/.test(src)) {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    const headEle = document.getElementsByTagName('head')[0];

    // IE
    if (script.readyState) {
      script.onreadystatechange = () => {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          callback();
          script.onreadystatechange = null;
        }
      };
    // webkit opera
    } else {
      script.onload = () => {
        callback();
      };
    }
    headEle.appendChild(script);
    WindowResources.push(src);
    // load stylesheet
  } else if (/\.css$/.test(src)) {
    const styleSheet = document.createElement('link');
    styleSheet.href = src;
    styleSheet.rel = 'stylesheet';
    const headEle = document.getElementsByTagName('head')[0];
    headEle.appendChild(styleSheet);
    WindowResources.push(src);
  }
};

export default {
  openNewWindow,
  toLogin,
  toApp,
  checkLogin,
  fileDownload,
  loadResources
};
