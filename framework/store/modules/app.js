
/**
 * @module store/app
 * @description vuex/modules/app, 目前维护的是 1.侧边栏状态，2.用于生成面包屑的当前路由列表
 *
 */
import { DeviceTypeEnum } from '@framework/enums';

export default {
  namespace: true,

  state: {
    /**
     * @member {DeviceTypeEnum} deviceType
     * @description 侧边栏状态
     */
    deviceType: DeviceTypeEnum.PC,
    /**
     * @member {Array} currentRoutes
     * @description 用于生成面包屑的当前路由列表
     */
    currentRoutes: [],
  },

  getters: {

  },

  mutations: {

    APP_CHANGE_DEVICE_TYPE(state, payload) {
      const { deviceType } = payload;
      const tempState = state;
      tempState.deviceType = deviceType;
    },

    APP_SET_CURRENT_ROUTES(state, payload) {
      const tempState = state;
      tempState.currentRoutes = payload;
    },
  },

  actions: {

  },
};
