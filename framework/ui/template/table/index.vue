<template>
  <div :class="['gt-table-template', tplClass]">
    <div class="gt-table-template__top-block">
      <slot name="top-block">
        <el-form inline class="search-form" :model="tableTplMIXIN.searchData" refs="searchForm">
          <slot name="search-form-items" />
          <slot name="search-form-btns">
            <el-button type="primary" icon="el-icon-search" @click="tableTplMIXIN.search()">搜索</el-button>
            <el-button type="primary" @click="tableTplMIXIN.reset()">重置</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="tableTplMIXIN.addRecord()">新增</el-button>
          </slot>
        </el-form>
      </slot>
    </div>
    <div class="gt-table-template__search-result" v-loading.sync="tableTplMIXIN.reqLoading" :element-loading-text="tableTplMIXIN.reqLoadingText || '数据加载中'">
      <slot name="table">
        <el-table
          border
          :data="tableTplMIXIN.resultData.list"
          :max-height="tableTplMIXIN.tableHeight"
          style="width: 100%"
          :stripe="stripe"
          :header-cell-style="{ backgroundColor: '#f5f7fa', lineHeight: '30px' }"
          :tree-props="treeProps"
          :row-key="rowKey"
        >
          <slot name="table-columns">
            <el-table-column prop="tableIndex" label="序号" width="50" />
          </slot>
        </el-table>
      </slot>
      <gt-pagination
        class="gt-pagination"
        v-if="tableTplMIXIN.pagination"
        @change="tableTplMIXIN.changePage"
        @change-size="tableTplMIXIN.changePageSize"
        :pagination="tableTplMIXIN.pagination"
      />
    </div>
    <slot name="dialogs" />
  </div>
</template>
<script>
export default {
  inject: ['tableTplMIXIN'],
  name: 'GtTableTpl',
  props: {
    /**
     * @description enum page, dialog
    * */
    mode: {
      type: String,
      default: 'page'
    },
    treeProps: {
      type: Object,
      default: null
    },
    rowKey: {
      type: String,
      default: undefined
    },
    stripe: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    tplClass() {
      return `gt-table-template--${this.mode}`;
    }
  }
};
</script>

<style lang="scss">
.gt-table-template{
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  flex-direction: column;
}

.gt-table-template__top-block{
  margin-bottom: 5px;
}

.gt-table-template--page{
  position: absolute;
  top: 84px;
  padding: 30px 30px 2px 30px;
}

.gt-table-template__search-form{
  width: 100%;
  .opt-btns-wrap{
    float: right;
    margin-right: 0;
  }
}

.gt-table-template__search-result{
    flex: 1;
    overflow: hidden;
    .el-button+.el-button{
      margin-left: unset;
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
</style>
