<template>
  <el-select
    :placeholder="placeholder"
    v-model="value"
    :loading="loading"
    @change="handleChange"
    @focus="handleRemoteSearch()"
    clearable
    v-bind="$attrs"
    :remote="!useRequestCache && !!requestService"
    filterable
  >
    <el-option
      :label="item.label"
      :value="item.value"
      v-for="item in options"
      :key="item.value"
    />
  </el-select>
</template>
<script>
import { Obj } from '@framework/utils';

export default {
  name: 'gt-select',
  model: {
    prop: 'defaultValue',
    event: 'changeSelected'
  },
  props: {
    defaultValue: {
      // v-model
      type: [String, Number, Array],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择内容'
    },
    // type-options gt-form-item
    responseResolve: {
      type: [Function, Boolean],
      default: false
    },
    paramsResolve: {
      type: [Function, Boolean],
      default: false
    },
    keyword: {
      type: String,
      default: ''
    },
    useRequestCache: {
      type: Boolean,
      default: false
    },
    requestService: {
      type: [Function, Boolean],
      default: false
    },
    defaultOptions: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      options: [],
      loading: false,
      value: ''
    };
  },
  mounted() {
    this.useRequestCache && this.remoteSearch(this.keyword);
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler(newVal) {
        this.value = newVal;
      }
    },
    defaultOptions: {
      immediate: true,
      handler(newVal) {
        if (newVal.length !== 0) {
          const formatOptions = newVal.map(v => ({
            value: v.id || v.value,
            label: v.label || v.name
          }));
          this.options = Obj.deepClone(formatOptions);
        }
      }
    }
  },

  methods: {
    handleRemoteSearch() {
      if (this.requestService) {
        !this.useRequestCache && this.remoteSearch(this.keyword);
      }
    },
    remoteSearch(keyword) {
      if (
        ((this.value && !(this.value instanceof Array))
          || !this.requestService)
          && !this.$attrs.multiple
      ) {
        return;
      }

      this.loading = true;
      let params = {
        keyword,
        page: 1,
        page_size: 30
      };
      if (this.paramsResolve) {
        params = this.paramsResolve(params);
      }

      this.requestService(params).then(res => {
        this.loading = false;
        if (res && res.code === 0) {
          if (this.responseResolve) {
            this.options = this.responseResolve(res.data);
            return;
          }
          this.options = (res.data.data || []).map(item => ({
            value: item.id,
            label: `${item.name}`
          }));
        }
      });
    },

    handleChange(value) {
      this.$emit('changeSelected', value);
    }
  }
};
</script>
<style>
</style>
