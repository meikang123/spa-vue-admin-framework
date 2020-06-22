import store from '@/store';

const { body } = document;
const WIDTH = 992;

export default {
  watch: {
    $route() {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', { withoutAnimation: false });
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_ResizeHandle);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_ResizeHandle);
  },
  mounted() {
    const isMobile = this.$_isMobile();
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile');
      store.dispatch('app/closeSideBar', { withoutAnimation: true });
    }
  },
  methods: {
    $_isMobile() { // 验证手机尺寸
      const rect = body.getBoundingClientRect();
      return rect.width - 1 < WIDTH;
    },
    $_ResizeHandle() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile();
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');

        if (isMobile) {
          store.dispatch('app/closeSideBar', { withoutAnimation: true });
        }
      }
    }
  }
};
