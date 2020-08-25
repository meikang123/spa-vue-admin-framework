import store from '@/store';

/**
 * 工具函数
 * */
const code = str => (str.slice(0, 1).toLocaleUpperCase() + str.slice(1));
const contextView = view => () => import(`@/views/${view}/Form${code(view)}`);

/**
 * @description 添加新增路由
 * */
export const add = view => {
  const ContextView = contextView(view);
  return ({
    name: `add${code(view)}`,

    render(h) {
      return h(ContextView, {
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
export const update = view => {
  const ContextView = contextView(view);
  return ({
    name: `update${code(view)}`,

    props: {
      id: {
        type: String | Number,
        required: true
      }
    },

    render(h) {
      return h(ContextView, {
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
export const detail = view => {
  const ContextView = contextView(view);
  return ({
    name: `detail${code(view)}`,

    props: {
      id: {
        type: String | Number,
        required: true
      }
    },

    render(h) {
      return h(ContextView, {
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
 * 生成新增、编辑、详情路由页
 * @param {string} view- 下对应的生成的文件夹名称
 * @param {string} name - 路由名称
 * @param {object} data - 需要覆盖的配置生成、覆盖对象与路由配置对象结构一致
 *
 * @return RouteConfig
 * */
export const routeGenerator = (view, name, data = {}) => {
  if (!view || !name) return;
  const { add: $add, update: $update, detail: $detail } = data;
  const defaultMeta = {
    activeMenu: `/${view}/index`,
    roles: store.state.user.roles || ['admin']
  };

  const _add = routeMerge({
    path: 'add',
    component: add(view),
    name: `add${code(view)}`,
    hidden: true,
    meta: {
      title: `增加${name}`,
      ...defaultMeta
    }
  }, $add);

  const _update = routeMerge({
    path: 'update/:id?',
    component: update(view),
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
    path: 'detail/:id?',
    component: detail(view),
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
