<template>
  <el-dialog
    :class="['gt-dialog', currentTheme]"
    v-bind="$attrs"
    :visible="visible"
    :top="top"
    :before-close="beforeClose"
    v-on="$listeners"
  >
    <div slot="title" class="gt-dialog__title">
      <template v-if="title">{{ title }}</template>
      <slot v-else name="title" />
    </div>
    <div v-loading="isLoading" class="gt-dialog__body" :style="{ maxHeight: _maxHeight }">
      <slot />
    </div>
    <slot v-if="isShowFooter" slot="footer" class="gt-dialog__footer" name="footer">
      <el-button @click="handleClose">取消</el-button>
      <el-button @click="handleConfirm" type="primary">确定</el-button>
    </slot>
  </el-dialog>
</template>
<script>
export default {
  name: 'GtDialog',
  data() {
    return {};
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'primary'
    },
    mode: {
      type: String,
      default: 'middle'
    },
    maxHeight: {
      type: String,
      default: ''
    },
    isShowFooter: {
      type: Boolean,
      default: true
    },
    top: {
      type: String,
      default: '10vh'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    beforeClose: {
      // 关闭之前的方法
      // 假如使用visible的sync方法可以不设置
      // 否则需要设置此方法手动关闭dialog
      type: Function,
      default: () => () => {}
    }
  },
  computed: {
    currentTheme() {
      const cla = 'gt-dialog--theme gt-dialog--';
      switch (this.theme) {
        case 'primary':
          return cla + this.theme;
        default:
          return '';
      }
    },
    _maxHeight() {
      if (this.maxHeight) {
        const res = this.parseStyle(this.maxHeight);
        if (res.value > 0) {
          return res.value + res.unit;
        }
      }
      if (this.mode === 'middle') {
        const top = this.parseStyle(this.top);
        const other = this.isShowFooter ? 142 : 83;
        return `calc(100vh - ${top.value * 2}${top.unit} - ${other}px)`;
      }
      return '';
    }
  },
  methods: {
    parseStyle(str) {
      const reg = /px|vh|%$/;
      const res = str.match(reg);
      const data = {
        value: 0,
        unit: 'px'
      };
      let number = 0;
      if (res) {
        data.unit = res['0'];
        number = Number(str.substr(0, res.index));
      } else {
        number = Number(str);
      }
      if (number) data.value = number;
      return data;
    },
    handleClose() {
      if (typeof this.beforeClose === 'function') {
        this.beforeClose();
      }
      this.$emit('update:visible', false);
    },
    handleConfirm() {
      this.$emit('confirm');
    }
  }
};
</script>
<style lang="scss">
$primary: #409eff;
.gt-dialog {
  &.gt-dialog--theme {
    /deep/ .el-dialog__header {
      padding: 0 20px;
    }
    .gt-dialog__title {
      line-height: 42px;
    }
  }
  &.gt-dialog--primary {
    /deep/ .el-dialog__header {
      background-color: $primary;
      color: #fff;
    }
    /deep/ .el-dialog__headerbtn {
      top: 11px;
      right: 11px;
      .el-dialog__close {
        color: #ddd;
        &:hover {
          color: #fff;
        }
      }
    }
    /deep/ .el-dialog__footer {
      padding: 15px 20px;
    }
  }
  /deep/ .el-dialog__body {
    padding: 0;
  }
  .gt-dialog__body {
    padding: 20px;
    min-height: 100px;
    overflow-y: auto;
  }
}
</style>
