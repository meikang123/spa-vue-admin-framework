import ace from 'brace';
import ChangeLang from './ChangeLang';

export default {
  name: 'gt-grammar',
  props: {
    value: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'chrome'
    },
    height: {
      type: String | Number,
      default: '200px'
    },
    width: {
      type: String | Number,
      default: '400px'
    },
    codeFold: { // 是否折叠
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    langDefault: {
      type: String,
      default: 'text'
    },
    showChangeLanguage: { // 语言切换是否显示
      type: Boolean,
      default: true
    }
  },
  render() {
    const height = this.height ? this.px(this.height) : '100%';
    const width = this.width ? this.px(this.width) : '100%';
    const style = { width, height, border: '1px solid #d5d5d5' };
    return (<div>
      {this.showChangeLanguage ? <ChangeLang vModel={this.lang} /> : ''}
      <div class="edit-main" style={style} />
    </div>);
  },
  data() {
    return {
      lang: '', // 语言
      editor: null,
      contentBackup: '' // 内容存储
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.lang = this.langDefault;
      this.editor = ace.edit(this.$el.querySelector('.edit-main'));
      const { lang, theme, codeFold, options, editor } = this;
      editor.$blockScrolling = Infinity;
      editor.getSession().setMode(`ace/mode/${lang}`);
      editor.setTheme(`ace/theme/${theme}`);
      if (codeFold) {
        editor.getSession().setTabSize(2);
        editor.getSession().setUseWrapMode(true);
      }
      if (this.value) editor.setValue(this.value, 1);
      this.contentBackup = this.value;

      editor.on('change', () => {
        const content = editor.getValue();
        this.$emit('input', content);
        this.contentBackup = content;
      });
      if (options) editor.setOptions(options);
      this.$emit('init', editor); // 透传对象出去、外部控制
    },
    px(n) {
      if (/^\d*$/.test(n)) {
        return `${n}px`;
      }
      return n;
    }
  },
  watch: {
    value(val) {
      if (this.contentBackup !== val) {
        this.editor.session.setValue(val, 1);
        this.contentBackup = val;
      }
    },
    theme(newTheme) {
      this.editor.setTheme(`ace/theme/${newTheme}`);
    },
    lang(newLang) {
      this.editor.getSession().setMode(typeof newLang === 'string' ? (`ace/mode/${newLang}`) : newLang);
      if (this.lang !== this.langDefault) this.$emit('update:langDefault', this.lang);
    },
    options(newOption) {
      this.editor.setOptions(newOption);
    },
    height() {
      this.$nextTick(() => {
        this.editor.resize();
      });
    },
    width() {
      this.$nextTick(() => {
        this.editor.resize();
      });
    },
    beforeDestroy() {
      this.editor.destroy();
      this.editor.container.remove();
    }
  }
};
