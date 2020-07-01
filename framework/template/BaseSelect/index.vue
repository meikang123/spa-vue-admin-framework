<template>
  <el-select :placeholder="placeholderVal" v-model="value" :loading="loading" :filter-method="remoteSearch" @focus="remoteSearch()" @change="handleChange" autocomplete clearable remote filterable>
    <el-option :label="item.label" :value="item.id" v-for="(item, index) in options" :key="index" />
  </el-select>
</template>
<script>
import { api } from '@/api/index';
import { Obj } from '@framework/utils';

export default {
  model: {
    prop: 'selectedValue',
    event: 'changeSelected'
  },
  props: {
    selectedValue: {
      type: String | Number,
      default: ''
    },
    requestName: {
      type: String,
      default: ''
    },
    placeholderVal: {
      type: String,
      default: '请选择内容'
    },
    selectedValue: {
      type: String | Number,
      default: ''
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
      value: '',
      placeholder: ''
    };
  },
  mounted() {},
  watch: {
    selectedValue(value) {
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
      if (this.value) {
        return;
      }
      this.loading = true;
      api[this.requestName].getList({ keyword, page: 1, page_size: 30 }).then(res => {
        this.loading = false;
        if (res && res.code === 0) {
          this.options = (res.data.data || []).map(item => ({ id: item.id, label: `${item.name}` }));
          console.log(this.options, '------this.options');
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
