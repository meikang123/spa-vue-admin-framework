import Enum from './utils/enum';

/**
 * @module enums
 * @description 跨业务级枚举类
 */

/**
 * @description http 请求通用错误码
 */
export const RequestErrorTypeEnum = new Enum(
  { alias: 'TOKEN_INVALID', text: 'token失效', value: 10003 },
);

/**
 * @description https statusCode 请求通用错误码
 *
 */
export const ResponseStatusCodeEnum = new Enum(
  { alias: 'ERROR', text: '通用错误', value: 0 },
  { alias: 'SUCCESS', text: '正常返回', value: 200 },
  { alias: 'SERVER_PARAMS_ERROR', text: '正常返回', value: 400 },
  { alias: 'SERVER_ERROR', text: '服务器错误', value: 500 },
  { alias: 'USER_NAME_NOEXIST', text: '用户名不存在', value: 101 },
  { alias: 'USER_NOT_LOGIN', text: '用户未登录', value: 15012007 },
  { alias: 'TOKEN_EXPIRE', text: 'token过期', value: 15012010 },
  { alias: 'TOKEN_PARSE_ERROR', text: 'token信息解析错误', value: 15012008 },
  { alias: 'TOKEN_INVALID', text: '登录令牌无效', value: 15012009 },


);

/**
 * @description http 请求 requestHeaders: ContentType, http/https 请求发送的数据流类型
 *
 */
export const HttpContentTypeEnum = new Enum(
  { alias: 'JSON', text: 'JSON接口进交', value: 'application/json;charset=UTF-8' },
  { alias: 'FORM', text: 'FROM提交', value: 'application/x-www-form-urlencoded;charset=UTF-8' },
  { alias: 'FILE', text: '文件上传', value: 'multipart/form-data' },
);

/**
 * @description APP运行环境枚举，通过webpack注入，默认 development。为应用提供分环境识别能力
 */
export const AppEnvTypeEnum = new Enum(
  { alias: 'DEV', text: '开发联调环境', value: 'development' },
  { alias: 'PROD', text: '生产环境', value: 'production' },
  { alias: 'ST', text: '测试环境', value: 'st' },
);

/**
 * @description 应用级别事件定义用于公用代码与业务代码进行通讯
 */
export const AppEventTypeEnum = new Enum(
  { alias: 'CHECKLOGINFALSE', text: '检查到未登录', value: 'event_login_flase' },
  { alias: 'RE_LOGIN', text: '通知重新登录', value: 'event_re_login' },
);
/**
 * @description 表单页模式枚举
 */
export const FormPageModeEnum = new Enum(
  { alias: 'ADD', text: '添加', value: 0 },
  { alias: 'UPDATE', text: '修改', value: 1 },
  { alias: 'DETAIL', text: '详情', value: 2 }
);
