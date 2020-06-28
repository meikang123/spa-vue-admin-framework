<template>
  <el-pagination
    v-if="pagination.total"
    @size-change="changeSize"
    @current-change="change"
    :current-page="pagination.current" background
    :page-size="pagination.size"
    :total="pagination.total"
    layout="total, sizes, prev, pager, next, jumper"
  />
</template>
<script>
export default {
  name: 'GtPagination',
  props: {
    pagination: {
      type: Object,
      default: () => {}
    }
  },

  methods: {
    change(pageIndex) {
      this.$emit('change', pageIndex);
    },
    changeSize(size) {
      this.$emit('change-size', size);//
    }
  }
};
</script>
<style>
</style>
