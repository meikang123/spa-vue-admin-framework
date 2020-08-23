
/**
 * @description 根据时间戳/Date实例转换成格化字符串
 * @param date 代表时间的Unix时间戳，时间对象或字符串形式的Unix时间戳
 * @param format 格式化形式参考 http://momentjs.cn/docs/ 年份、月份、日期的令牌 eg. YYYY-MM-DD HH:mm:ss
 */
const formatDate = (date: any, format: string) => {
  let result = '';
  let tempDate = null;

  if (typeof date === 'object') {
    tempDate = date;
  } else {
    tempDate = new Date(date);
  }

  if (/(Y+)/.test(format)) {
    result = format.replace(RegExp.$1, tempDate.getFullYear());
  }

  const month = tempDate.getMonth() + 1;
  const day = tempDate.getDate();
  const hours = tempDate.getHours();
  const minutes = tempDate.getMinutes();
  const seconds = tempDate.getSeconds();
  const tokens = {
    'M+': `${month < 10 ? `0${month}` : month}`,
    'D+': `${day < 10 ? `0${day}` : day}`,
    'H+': `${hours < 10 ? `0${hours}` : hours}`,
    'm+': `${minutes < 10 ? `0${minutes}` : minutes}`,
    's+': `${seconds < 10 ? `0${seconds}` : seconds}`
  };

  interface IToken {
    [key: string]: any
  }

  Object.keys(tokens).forEach(key => {
    if (new RegExp(`(${key})`).test(format)) {
      result = result.replace(RegExp.$1, (<IToken>tokens)[key]);
    }
  });

  return result;
};

/**
 *
 * @description object 转数组
 * @todo 可能不需要设置为 formdata, 只需要设置contentType即可
 * @param {object} obj - 原始对象
 * @returns {object} formdata
 */
const objectToFormData = (obj: any) => {
  const formData = new FormData();
  // 递归出口
  if (typeof obj !== 'object' || !obj) {
    return obj;
  }

  Object.keys(obj).forEach(key => {
    formData.append(key, objectToFormData(obj[key]));
  });

  return formData;
};

/**
 * @description require.context取到的路由转为正式路由配置
 * @param routeFiles require.context
 */
const configRoutesToRoutes = (routeFiles: any) => {
  const configRoutes = routeFiles.keys().map((key: String) => routeFiles(key).default);

  configRoutes.sort((compared: any, current: any) => {
    const [{
      meta: {
        position: comparedPosition
      }
    }] = compared;
    const [{
      meta: {
        position: currentPosition
      }
    }] = current;

    if (comparedPosition && currentPosition) {
      return comparedPosition - currentPosition;
    }

    return false;
  });
  return configRoutes || [];
};

/**
 * @description 下化线命名转驼峰 eg.case_type to caseType
 * @param str eg.case_type
 */
const toTf = (str:String) => {
  const reg = /_(\w)/g;
  const result = str.replace(reg, ($0, $1) => $1.toUpperCase());
  return result;
};

export default {
  formatDate,
  objectToFormData,
  configRoutesToRoutes,
  toTf
};
