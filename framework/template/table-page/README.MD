查询列表页模版组件
===
demo:

```html
<TablePage ref="tablePage" :pagination="pagination" @changePage="changePage" @changePageSize="changePageSize" :req-loading-text="reqLoadingText" :req-loading="reqLoading">
  <template slot="top-block-content">
    <el-form inline class="search-form" :model="searchData" refs="searchForm" @change="search()">
    <el-form-item>
      <el-input type="text" v-model.number="searchData.id" clearable placeholder="请输入用例ID" />
    </el-form-item>
    <!--el-form items-->
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
      <el-button type="primary" @click="reset()">重置</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="addRecord()">新增</el-button>
    </el-form-item>
  </el-form>
  </template>
  <template slot="table">
    <el-table border :data="resultData.list" :max-height="tableHeight" style="width: 100%" stripe :header-cell-style="{ backgroundColor: '#f5f7fa', lineHeight: '30px' }">
    <el-table-column prop="tableIndex" label="序号" width="50" />
    <!--el-table columns-->
    <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" circle icon="el-icon-edit" @click="editRecord(scope.row)" title="编辑" />
          <el-button type="danger" circle icon="el-icon-delete" @click="deleteRecord(scope.row)" title="删除" />
        </template>
      </el-table-column>
    </el-table>
  </template>
  <template slot="dialogs">
      <case-dialog :change-data.sync="selectData" />
      <detail-dialog :visible.sync="isDetailVisible" :id="detailId" type="case" />
  </template>
</TablePage>
```