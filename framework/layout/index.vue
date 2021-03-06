<template>
  <div :class="classObj" class="app-wrapper gt-layout">
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container gt-layout__sidebar">
      <template slot="logo">
        <slot name="logo" />
      </template>
    </sidebar>
    <div :class="{hasTagsView:needTagsView}" class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar>
          <template>
            <slot name="top-right-menu-items" />
          </template>
          <template slot="dropdown-items">
            <slot name="navbar-dropdown" />
          </template>
        </navbar>
        <tags-view v-if="needTagsView" />
      </div>
      <app-main />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import {
  AppMain, Navbar, Sidebar, TagsView
} from './components';
import ResizeMixin from './mixin/index';

export default {
  name: 'Layout',
  components: {
    AppMain, Navbar, Sidebar, TagsView
  },
  mixins: [ResizeMixin],
  data() {
    return {
      needTagsView: true,
      fixedHeader: true
    };
  },

  created() {
    const attrsNeedTagsView = this.$attrs['need-tags-view'];
    
    if (typeof attrsNeedTagsView !== 'undefined') {
      this.needTagsView = attrsNeedTagsView;
    }
  },

  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device
    }),
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      };
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../styles/mixin.scss";
@import "@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
      position: fixed;
      top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px)
}

.mobile .fixed-header {
  width: 100%;
}
</style>
