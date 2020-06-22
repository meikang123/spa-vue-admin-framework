<template>
  <div />
</template>

<script>
import { Obj } from '@/framework/utils';

export default {

  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    isEdit: {
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
      type: Object,
      default: () => {}
    },
    name: {
      type: String,
      default: ''
    }
  },

  watch: {
    dialogVisible(value) {
      const { emptyFormModel } = this;
      this.visible = value;
      this.setTitle();
      this.$nextTick(() => {
        const { form } = this.$refs;
        form.clearValidate();
        setTimeout(() => {
          if (!this.visible) {
            this.formModel = Obj.deepClone(emptyFormModel);
          }
          if (this.isEdit && this.visible) {
            this.setFormModel();
          }
          if (this.visible) {
            this.initDialogUI();
          }
        }, 300);
      });
    }
  },

  data() {
    return {
      visible: this.dialogVisible,
      formModel: Obj.deepClone(this.emptyFormModel),
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
      this.$emit('cancel');
    },

    setTitle() {
      if (this.fullTitle) {
        this.dialogTitle = this.fullTitle;
        return;
      }
      if (!this.isEdit && this.visible) {
        this.dialogTitle = `添加${this.title}`;
      }
      if (this.isEdit && this.visible) {
        this.dialogTitle = `编辑${this.title}`;
      }
    }
  }

};
</script>

<style lang="scss">

</style>
