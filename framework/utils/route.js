import store from '@/store';

/**
 * 工具函数
 * */
const code = str => (str.slice(0, 1).toLocaleUpperCase() + str.slice(1));

/**
 * @description 添加新增路由
 * */
export const add = (view, path) => {
  const Component = () => import(`@/views/${path}/Form${code(view)}`);
  return ({
    name: `add${code(view)}`,

    render(h) {
      return h(Component, {
        props: {
          mode: this.Enums.formMode.ADD
        }
      });
    }
  });
};

/**
 * @description 添加更新路由
 * */
export const update = (view, path) => {
  const Component = () => import(`@/views/${path}/Form${code(view)}`);
  return ({
    name: `update${code(view)}`,

    props: {
      id: {
        type: String | Number,
        required: true
      }
    },

    render(h) {
      return h(Component, {
        props: {
          id: this.id,
          mode: this.Enums.formMode.UPDATE
        }
      });
    }
  });
};

/**
 * @description 添加详情路由
 * */
export const detail = (view, path) => {
  const Component = () => import(`@/views/${path}/Form${code(view)}`);
  return ({
    name: `detail${code(view)}`,

    props: {
      id: {
        type: String | Number,
        required: true
      }
    },

    render(h) {
      return h(Component, {
        props: {
          id: this.id,
          mode: this.Enums.formMode.DETAIL
        }
      });
    }
  });
};

/**
 * @description 合并路由数据
 * */
const routeMerge = (defaultData = {}, data = {}) => {
  const meta = Object.assign({}, defaultData.meta || {}, data.meta || {});
  const _data = Object.assign({}, defaultData, data);
  _data.meta = meta;
  return _data;
};

/**
 * 生成新增、编辑、详情路由页-- AUD {add, update, detail}
 * @param {string} view- 下对应的生成的文件夹名称
 * @param {string} name - 路由名称
 * @param {string} path - 需要加载内容组件的路径
 * @param {object} config - 需要覆盖的配置生成、覆盖对象与路由配置对象结构一致
 *
 * @return RouteConfig
 * */
export const generateAUDRoute = (view, name, path = '', config = {}) => {
  if (!view || !name) return;
  if (typeof path !== 'string') {
    config = path;
    path = '';
  }
  path = path || 'FormContainer';

  const { add: $add, update: $update, detail: $detail } = config;
  const defaultMeta = {
    activeMenu: path ? `/${path}` : `/${view}/index`,
    roles: store.state.user.roles || ['admin']
  };

  const _add = routeMerge({
    path: `add-${view}`,
    component: add(view, path),
    name: `add${code(view)}`,
    hidden: true,
    meta: {
      title: `增加${name}`,
      ...defaultMeta
    }
  }, $add);

  const _update = routeMerge({
    path: `update-${view}/:id?`,
    component: update(view, path),
    name: `update${code(view)}`,
    props: true,
    hidden: true,
    meta: {
      title: `修改${name}`,
      getTitle: to => `修改${name}(${to.params.id})`,
      ...defaultMeta
    }
  }, $update);

  const _detail = routeMerge({
    path: `detail-${view}/:id?`,
    component: detail(view, path),
    name: `detail${code(view)}`,
    props: true,
    hidden: true,
    meta: {
      title: `${name}详情`,
      getTitle: to => `${name}详情(${to.params.id})`,
      ...defaultMeta
    }
  }, $detail);

  return [_add, _update, _detail];
};
