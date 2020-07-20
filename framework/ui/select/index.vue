<template>
  <div>
    <el-select
      :placeholder="placeholder"
      v-model="value"
      :loading="loading"
      @change="handleChange"
      @focus="handleRemoteSearch()"
      clearable
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
  computed: {},
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
          const formatOptions = newVal.map(v => {
            return {
              value: v.id,
              label: v.label
            };
          });
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

      this.requestService(params).then(res => {
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
