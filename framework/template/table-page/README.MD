查询列表页模版组件
===
demo:

```html
<template>
  <TablePage
    ref="tablePage"
    :pagination="pagination"
    @changePage="changePage"
    @changePageSize="changePageSize"
    :reqLoadingText="reqLoadingText"
    :reqLoading="reqLoading">
    <template slot="top-block-content">
      <el-form inline size="small" class="search-form" :model="formData" refs="searchForm">
        <el-form-item prop="resourceName">
          <!-- form-items -->
          <el-input placeholder="请输入资源名称" v-model="formData.resourceName">
              <el-button type="info" slot="append" icon="el-icon-search" @click="search">搜索</el-button>
          </el-input>
          </el-form-item>
      </el-form>
    </template>
    <template slot="table">
      <el-table :data="resultData.list" :height="tableHeight" style="width: 100%">
        <el-table-column prop="createTime" label="日期" width="180" />
        <!-- columns -->
        <el-table-column label="操作" width="120">
          <template>
            <div class="button-box">
              <el-link type="primary">修改</el-link>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </TablePage>
</template>
<script>
import ShopService from '@/services/shop';
import { TablePage, TablePageMIXIN } from '@/components';

export default {
  components: {
    TablePage,
  },
  mixins: [TablePageMIXIN],
  data() {
    return {
      formData: {
        resourceName: '',
      },
    };
  },
  created() {
    this.SearchService = ShopService;
  },
};
</script>
```