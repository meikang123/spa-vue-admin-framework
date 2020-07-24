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
    readyOnly: { // 是否只读
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default() {
        return {};
      }
    },
    langDefault: { // 默认语言
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
      {(this.showChangeLanguage && !this.readyOnly) ? <ChangeLang vModel={this.lang} /> : ''}
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
      const { lang, theme, options, editor } = this;
      editor.$blockScrolling = Infinity;
      editor.getSession().setMode(`ace/mode/${lang}`);
      editor.setTheme(`ace/theme/${theme}`);
      // editor.getSession().setTabSize(2);

      this.initData();

      editor.on('change', () => {
        const content = editor.getValue();
        this.$emit('input', content);
        this.contentBackup = content;
      });
      if (options) editor.setOptions(options);
      this.$emit('init', editor); // 透传对象出去、外部控制
    },
    initData() {
      const { value, lang, editor, readyOnly } = this;
      let content = value;
      if (readyOnly) { // 是否只读
        editor.setReadOnly(true);
        if (lang === 'json') {
          if (typeof value === 'string') {
            try {
              content = JSON.parse(value);
              content = JSON.stringify(content, null, '\t');
            } catch (error) {
              content = value;
            }
          }
        }
      }

      if (content) editor.setValue(content, 1);
      this.contentBackup = value;
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
      if (this.contentBackup !== val) this.initData();
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
