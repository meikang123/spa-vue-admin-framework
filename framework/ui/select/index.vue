<template>
  <div>
    <el-select v-if="dictName.length !== 0" :placeholder="placeholder" v-model="value" :loading="loading" @change="handleChange" clearable filterable>
      <el-option :label="item.label" :value="item.id" v-for="(item, index) in dictName" :key="index" />
    </el-select>
    <el-select v-if="dictName.length === 0 && requestName && !remote" :placeholder="placeholder" v-model="value" :loading="loading" @change="handleChange" clearable filterable>
      <el-option :label="item.label" :value="item.id" v-for="(item, index) in options" :key="index" />
    </el-select>
    <el-select
      v-if="dictName.length === 0 && requestName && remote"
      :placeholder="placeholder"
      v-model="value"
      :loading="loading"
      @change="handleChange"
      :filter-method="remoteSearch"
      @focus="remoteSearch()"
      clearable
      remote
      filterable
    >
      <el-option :label="item.label" :value="item.id" v-for="(item, index) in options" :key="index" />
    </el-select>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex';
import { api } from '@/api/index';
import { Obj } from '@framework/utils';

export default {
  model: {
    prop: 'selectedValue',
    event: 'changeSelected'
  },
  props: {
    remote: {
      type: Boolean,
      default: false
    },
    dictName: {
      type: Array,
      default: () => []
    },
    requestName: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择内容'
    },
    selectedValue: {
      type: [String, Number],
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
      value: ''
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    // ...mapGetters(['dict'])
  },
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
    init() {
      // !this.remote && (this.dictName ? (this.value = this.selectedValue) : this.remoteSearch());
      if (!this.remote) {
        if (this.dictName.length !== 0) {
          this.value = this.selectedValue;
        } else {
          this.remoteSearch();
        }
      }
    },
    remoteSearch(keyword) {
      if (this.value || !api[this.requestName]) {
        return false;
      }
      this.loading = true;
      api[this.requestName].getList({ keyword, page: 1, page_size: 30 }).then(res => {
        this.loading = false;
        if (res && res.code === 0) {
          this.options = (res.data.data || []).map(item => ({ id: item.id, label: `${item.name}` }));
          this.value = this.selectedValue;
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
