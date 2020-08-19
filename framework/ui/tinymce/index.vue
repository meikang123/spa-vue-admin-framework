<template>
  <div :class="{fullscreen:fullscreen}" class="gt-tinymce-container" :style="{width:containerWidth}" :id="tinymceWrapId" />
</template>

<script>
import { THIRDPARTY_PATH } from '@framework/config/consts';
import { Browser } from '@framework/utils';

const tinymceCDN = `${THIRDPARTY_PATH}/tinymce/tinymce.min.js`;
const generateId = type => `vue-tinymce-${type}-${+new Date()}${(Math.random() * 1000).toFixed(0)}`;
export default {
  name: 'gt-tinymce',
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return [];
      }
    },
    menubar: {
      type: String,
      default: ''
    },
    height: {
      type: [Number, String],
      required: false,
      default: 360
    },
    width: {
      type: [Number, String],
      required: false,
      default: 'auto'
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id,
      tinymceWrapId: '',
      fullscreen: false
    };
  },
  created() {
    this.tinymceWrapId = generateId('wrap');
  },
  computed: {
    containerWidth() {
      const { width } = this;
      if (/^[\d]+(\.[\d]+)?$/.test(width)) { // matches `100`, `'100'`
        return `${width}px`;
      }
      return width;
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val || ''));
      }
    }
  },
  mounted() {
    this.init();
  },
  activated() {
    if (window.tinymce) {
      this.initTinymce();
    }
  },
  deactivated() {
    this.destroyTinymce();
  },
  destroyed() {
    this.destroyTinymce();
  },
  methods: {
    init() {
      // dynamic load tinymce from cdn
      Browser.loadResources(tinymceCDN, () => {
        this.initTinymce();
      });
    },

    initTinymce() {
      document.getElementById(this.tinymceWrapId).innerHTML = '';
      this.tinymceId = generateId('mce');
      document.getElementById(this.tinymceWrapId).innerHTML = `
        <textarea id=${this.tinymceId} />
      `;
      
      const _this = this;
      window.tinymce.init({
        branding: false,
        elementpath: false,
        language: 'zh_CN',
        statusbar: false,
        selector: `#${this.tinymceId}`,
        width: this.width,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        // toolbar: this.toolbar,
        menubar: this.menubar,
        plugins: 'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media, imagetools',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'],
        imagetools_toolbar: 'watermark',
        default_link_target: '_blank',
        link_title: false,
        init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on('NodeChange Change KeyUp', () => {
            this.hasChange = true;
            this.$emit('input', editor.getContent({ format: 'raw' }));
          });
        }
      });
    },

    destroyTinymce() {
      const tinymce = window.tinymce.get(this.tinymceId);
      if (tinymce) {
        tinymce.destroy();
      }
    },

    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value);
    },

    getContent() {
      window.tinymce.get(this.tinymceId).getContent();
    }
  }
};
</script>

<style scoped>
.gt-tinymce-container {
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
</style>
