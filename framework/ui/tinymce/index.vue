<template>
  <div :style="{width:containerWidth}" v-show="hasInit">
    <textarea class="tinymce-textarea" :id="tinymceId" />
  </div>
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
        return ['undo redo | fontsizeselect | fontselect | formatselect | bold italic | forecolor backcolor | alignleft aligncenter alignright alignjustify | outdent indent | table tabledelete | bullist numlist | emoticons link image | code | removeformat'];
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
      tinymceId: ''
    };
  },
  created() {
    this.tinymceId = this.id || generateId('mce');
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
      const _this = this;
      window.tinymce.init({
        selector: `#${this.tinymceId}`,
        width: this.width,
        height: this.height,
        branding: false, // 隐藏右下角技术支持
        elementpath: false, // 隐藏底部的元素路径
        statusbar: false, // 隐藏状态栏
        content_style: 'p {margin: 2px 0px; }', // 调整输入框间距--这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致
        language: 'zh_CN',
        toolbar: this.toolbar, // 自定义工具栏
        menubar: this.menubar, // 1级菜单
        plugins: 'table, lists, advlist,emoticons,autolink,code,link,image',
        advlist_bullet_styles: 'circle,square,disc', // toolbar的-bullist选项
        advlist_number_styles: 'default,lower-alpha,lower-greek,lower-roman,upper-alpha,upper-roman', // toolbar的-numlist选项
        font_formats: '微软雅黑=Microsoft YaHei;宋体=SimSun;黑体=SimHei;仿宋=FangSong;楷体=KaiTi;隶书=LiSu;幼圆=YouYuan;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings',
        fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px',
        end_container_on_empty_block: true, // 空元素回车将其拆分
        object_resizing: false,
        default_link_target: '_blank', // 链接默认打开方式
        link_title: false, // 是否允许禁用链接对话框中的链接标题输入字段

        // imagetools_cors_hosts: ['wpimg.wallstcn.com', 'wallstreetcn.com'], //  指定跨域地址
        // powerpaste_word_import: 'clean', // 此设置控制如何筛选从Microsoft Word粘贴的内容
        // imagetools_toolbar: 'watermark', // 图片控制的工具栏

        init_instance_callback: editor => { // 初始化编辑器实例时要执行的函数
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on('NodeChange Change KeyUp', () => {
            this.hasChange = true;
            this.$emit('input', editor.getContent({ format: 'raw' }));
          });
          if (editor.hidden) editor.show();
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
