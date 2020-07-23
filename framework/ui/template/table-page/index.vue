<template>
  <div class="gt-table-page">
    <div class="top-block">
      <slot name="top-block-content" />
    </div>
    <slot name="middle-block-content" />
    <div class="search-result" ref="search-result" v-loading.sync="tablePageMIXIN.reqLoading" :element-loading-text="tablePageMIXIN.reqLoadingText || '数据加载中'">
      <div style="height: 10px;" />
      <slot name="table" />
      <gt-pagination
        class="gt-pagination"
        v-if="tablePageMIXIN.pagination"
        @change="tablePageMIXIN.changePage"
        @change-size="tablePageMIXIN.changePageSize"
        :pagination="tablePageMIXIN.pagination"
      />
    </div>
    <slot name="dialogs" />
  </div>
</template>
<script>

export default {
  inject: ['tablePageMIXIN'],
  name: 'GtTablePage'
};
</script>
<style lang="scss">
.gt-table-page{
  position: absolute;
  top: 84px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
  padding: 30px 30px 2px 30px;
  flex-direction: column;
  .top-block{
    display: flex;
    justify-content: space-between;
  }

  .search-form{
    width: 100%;
    .opt-btns-wrap{
      float: right;
      margin-right: 0;
    }
  }

  .search-result{
    flex: 1;
    overflow: hidden;
    .search-result__toppage{
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 15px;
    }
  }

  .gt-pagination{
    margin-top: 20px;
  }

  .dialog-footer{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}
</style>
