<template>
  <el-form-item v-bind="$attrs" :prop="prop" :rules="rules" :required="required">
    <template v-if="isInput&&isSingle">
      <div v-if="isDetail">{{ value }}</div>
      <el-input v-else v-model="inputVal" clearable @input="handleInput" placeholder="图片路径参数" style="width:300px;" />
    </template>
    <upload-img :value="value" v-bind="typeOptions" :multiple="multiple" :is-detail="isDetail" @error="handleError" @success="handleSuccess" />
  </el-form-item>
</template>
<script>
import UploadImg from './image';

export default {
  name: 'GtUploadImgItem',
  components: {
    UploadImg
  },
  model: {
    prop: 'value',
    event: 'input'
  },
  data() {
    return {
      isError: false,
      parentForm: null,
      errorMsg: '',
      rules: [{
        validator: (rule, value, callback) => {
          if (this.isError) {
            return callback(new Error(this.errorMsg));
          } if (this.required && (!value || value.length === 0)) {
            callback('请上传图片');
          }
          callback();
        }
      }],
      inputVal: '',
      timer: null
    };
  },
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    typeOptions: {
      type: Object,
      default: () => ({})
    },
    prop: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'input'
    },
    multiple: {
      type: Boolean,
      default: false
    },
    isDetail: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isInput() {
      return this.mode === 'input';
    },
    isSingle() {
      return !this.multiple;
    }
  },
  watch: {
    value: {
      handler(newData) {
        if (newData !== this.inputVal) {
          this.inputVal = newData || '';
        }
      },
      immediate: true
    }
  },
  created() {
    this.parentForm = this.findParentForm(this.$parent);
  },
  methods: {
    findParentForm(parent) {
      if (parent._vnode.tag === 'form') {
        return parent;
      }
      return this.findParentForm(parent.$parent);
    },
    handleInput(val) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$emit('input', val);
      }, 200);
    },
    handleError(err) {
      this.errorMsg = err;
      if (this.parentForm && this.prop) {
        this.isError = true;
        this.parentForm.validateField(this.prop, () => {
          this.isError = false;
        });
      }
    },
    handleSuccess(data, hasError) {
      this.$emit('input', data);
      if (!hasError) {
        this.parentForm.validateField(this.prop);
      }
    }
  }
};
</script>
