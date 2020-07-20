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
    defaultValue: { // v-model
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
  created() {
    // just for no remote
    if (!this.isRemote) {
      this.value = this.defaultValue;
      this.options = Obj.deepClone(this.defaultOptions).map(option => ({ value: option.value || option.id, label: option.name || option.label }));
    }
  },

  computed: {
    isRemote() {
      return !!this.remoteService;
    }
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
      !this.useRequestCache && this.remoteSearch(this.keyword);
    },
    remoteSearch(keyword) {
      if (this.value || !this.requestService) {
        return;
      }

      if (this.value instanceof Array) {
        if (this.value.length > 0) {
          return;
        }
      } else if (this.value) {
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
          } else {
            this.options = (res.data.data || []).map(item => ({ value: item.value || item.id, label: item.name || item.label }));
          }
          this.value = this.defaultValue;
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
