<template>
  <div>
    <el-select :placeholder="placeholder" v-model="value" :loading="loading" @change="handleChange" @focus="handleRemoteSearch()" clearable :remote="isUseRemoteRequest && !!remoteService" filterable>
      <el-option :label="item.label" :value="item.value" v-for="item in options" :key="item.value" />
    </el-select>
  </div>
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
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择内容'
    },
    // type-options gt-form-item
    resResolve: {
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
    isUseRemoteRequest: {
      type: Boolean,
      default: false
    },
    remoteService: {
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
      options: this.defaultOptions || [],
      loading: false,
      value: ''
    };
  },
  mounted() {
    !this.isUseRemoteRequest && this.remoteSearch(this.keyword);
  },
  computed: {
    formatDefaultVal() {
      return this.options.map(v => {
        return {
          value: v.id,
          label: v.label
        };
      });
    }
  },
  watch: {
    defaultValue(value) {
      this.$nextTick(() => {
        this.value = value;
      });
    },
    defaultOptions(value) {
      if (value.length !== 0) {
        this.options = Obj.deepClone(value);
      }
    }
  },
  methods: {
    handleRemoteSearch() {
      this.isUseRemoteRequest && this.remoteSearch(this.keyword);
    },
    remoteSearch(keyword) {
      if (this.value || !this.remoteService) {
        return;
      }
      this.loading = true;

      // TODO 需要merge外部参数用于做联动
      let params = {
        keyword,
        page: 1,
        page_size: 30
      };
      if (this.paramsResolve) {
        params = this.paramsResolve(params);
      }

      this.remoteService(params).then(res => {
        this.loading = false;
        if (res && res.code === 0) {
          this.options = (res.data.data || []).map(item => {
            if (this.resResolve) {
              return this.resResolve(res.data);
            }
            return { value: item.id, label: `${item.name}` };
          });
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
