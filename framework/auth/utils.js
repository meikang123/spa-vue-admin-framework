/**
 * @module auth/utils
 */

/**
 * @description 根据权限点数组递归过滤出有权限的 route
 * @param { Array } routes 系统预置路由配置
 *  eg. {..., meta: {auth: '222333'}}
 * @param { Array } codes 根据token获取到的权限点数组
 *  eg. ['222333','333ffff','adfdsa', 'fdsfadsaafds]
 * @returns { Array } 鉴权之后的路由配置
 */
const routeDeepFilter = (routes, codes) => {
  const nextRoutes = [];
  // 递归出口
  for (let index = 0; index < routes.length; index += 1) {
    const route = routes[index];
    let deleteRouteFlag = false;

    const { meta } = route;
    if (meta) {
      const { auth } = meta;
      if (auth) {
        deleteRouteFlag = true;
        if (codes.includes(auth)) {
          deleteRouteFlag = false;
        }
      }
    }

    if (!deleteRouteFlag) {
      if (!(route.children instanceof Array && route.children.length > 0)) {
        nextRoutes.push(route);
      } else {
        nextRoutes.push({
          ...route,
          children: routeDeepFilter(route.children, codes)
        });
      }
    }
  }
  return nextRoutes;
};

const other = {};

export {
  routeDeepFilter,
  other
};
