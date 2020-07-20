<template>
  <el-select
    v-model="value"
    :placeholder="placeholder"
    :loading="loading"
    :remote-method="remoteSearch"
    :remote="isRemote"
    clearable
    filterable
    v-bind="$attrs"
    @focus="remoteSearch()"
    @change="handleChange"
  >
    <el-option :label="item.label" :value="item.value" v-for="(item) in options" :key="item.value" />
  </el-select>
</template>
<script>
// import { mapGetters } from 'vuex';
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
    remoteSearch(keyword) {
      if (!this.remoteService) {
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
