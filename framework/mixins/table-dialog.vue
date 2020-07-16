<template>
  <div />
</template>

<script>
import { Obj } from '@framework/utils';

export default {

  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    fullTitle: {
      type: String,
      default: ''
    },
    row: {
      type: [Object],
      default: () => ({})
    },
    success: {
      type: Function,
      required: false,
      default: () => {}
    }
  },

  watch: {
    dialogVisible(value) {
      const { initFormModel = {} } = this;
      this.visible = value;
      this.setTitle();
      this.$nextTick(() => {
        const { form } = this.$refs;
        form.clearValidate();
        setTimeout(() => {
          // 关闭弹窗即做数据还原
          if (!this.visible) {
            this.formModel = Obj.deepClone(initFormModel);
          } else {
            if (this.row) {
              this.setFormModel();
            }
            this.initDialogUI();
          }
        }, 300);
      });
    }
  },

  data() {
    return {
      visible: this.dialogVisible,
      initFormModel: {},
      formModel: Obj.deepClone(this.initFormModel) || {},
      dialogTitle: '',
      submitIng: false,
      uiInitIng: false
    };
  },

  methods: {

    initDialogUI() {
      console.log('业务中实现--');
    },

    doSubmit() {
      console.log('请在业务中实现--');
    },

    setFormModel() {
      console.log('业务中实现--');
    },

    doCancel() {
      this.$emit('update:dialogVisible', false);
      this.$emit('cancel');
    },

    setTitle() {
      let title = '';
      if (this.fullTitle) {
        title = this.fullTitle;
        return;
      }
      if (this.visible) {
        if (this.row) {
          title = `编辑${this.title}`;
          if (this.isDetail) {
            title = `${this.title}详情`;
          }
        } else {
          title = `添加${this.title}`;
        }
      }
      this.dialogTitle = title;
    }
  }

};
</script>

<style lang="scss">

</style>
