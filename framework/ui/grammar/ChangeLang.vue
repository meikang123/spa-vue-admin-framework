<template>
  <el-select v-model="value" placeholder="请选择语言" style="margin-bottom: 15px;" @change="changeLang" clearable>
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select>
</template>

<script>

export default {
  model: {
    prop: 'lang',
    event: 'changeLang'
  },
  props: ['lang'],
  data() {
    return {
      options: [{
        value: 'text',
        label: 'Text'
      }, {
        value: 'javascript',
        label: 'JavaScript'
      }, {
        value: 'json',
        label: 'JSON'
      }, {
        value: 'html',
        label: 'HTML'
      }, {
        value: 'xml',
        label: 'XML'
      }, {
        value: 'protobuf',
        label: 'ProtoBuf'
      }],
      value: ''
    };
  },
  created() {
    this.value = this.lang;
  },
  methods: {
    changeLang() {
      this.$emit('changeLang', this.value);
    }
  },

  watch: {
    lang() {
      this.value = this.lang;
    }
  }
};
</script>
