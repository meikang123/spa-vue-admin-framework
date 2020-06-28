<template>
  <div class="gt-table-page">
    <div class="top-block">
      <slot name="top-block-content" />
    </div>
    <slot name="middle-block-content" />
    <div class="search-result" ref="search-result" v-loading.sync="reqLoading" :element-loading-text="reqLoadingText || '数据加载中'">
      <slot name="table" />
      <gt-pagination
        v-if="pagination"
        class="gt-pagination"
        @change="changePage"
        @change-size="changePageSize"
        :pagination="pagination"
      />
    </div>
    <slot name="dialogs" />
  </div>
</template>
<script>
import GtPagination from '../../ui/pagination';

export default {
  name: 'GtTablePage',
  components: {
    GtPagination
  },
  props: {
    pagination: {
      type: [Object, Boolean]
    },
    reqLoading: {
      type: Boolean
    },
    reqLoadingText: {
      type: String
    }
  },
  methods: {
    changePage(index) {
      this.$emit('changePage', index);
    },

    changePageSize(size) {
      this.$emit('changePageSize', size);
    }
  },
  mounted() {

  }
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
  }

  .dialog-footer{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .dialog-footer_item{
      margin-right: 8px;
    }
    .dialog-footer_item:last-child{
      margin-right: 0;
    }
  }
}
</style>
