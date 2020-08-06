gt-table-tpl 模版组件
===
#### 解决的问题：
    该组件适用于最常见的查询列表页，以及查询列表组件，旨在将公用样式，查询逻辑，分页逻辑，重置逻辑抽象至公用的模版组件或mixin中去。
    开发人员只需要配置查询项，列表列即可完查询列表的开发。



#### 模版组件分为两部分：
    1. 组件: 通过插槽分情况定制 SearchForm, search-form-items, table, table-columns。
    2. mixin：可以混入分页查询列表常用的方法，比如查询，分页逻辑，table高度自适应，以前响应式数据的定义。

### 示例
```html
<!--template 部分 -->
<gt-table-tpl>
  <template slot="search-form-items">
    <el-form-item>
      <el-input 
        placeholder="请输入产品名称" 
        v-model="searchData.keyword" 
        suffix-icon="el-icon-edit" 
      />
    </el-form-item>
  </template>
  <template slot="table-columns">
    <el-table-column prop="tableIndex" label="序号" width="50" />
    <el-table-column label="操作" width="90" header-align="center" align="right">
      <template slot-scope="scope">
        <el-button type="danger" circle icon="el-icon-delete" @click="deleteRecord(scope.row)" title="删除" />
      </template>
    </el-table-column>
  </template>
  <template slot="dialogs">
    <!--dialogs-->
  </template>
</gt-table-tpl>
```
```javascript
// script部分
import { GtTableTplMIXIN } from '@framework/ui';
export default{
  ...
  mixins: [GtTableTplMIXIN],
  created() {
    this.SearchService = this.$api.Product;
  }
}
```

### slots 插槽
|name|desc|用途|
| -- | -- | -- |
| top-block | 上部内容区 | 当需要定制整个table上部区域时使用， **低频使用** | 
| search-form-items | 查询项 | 定制搜索条件时候使用 |
| search-form-btns | 查询按钮 | 定制查询表单的按钮时使用，默认 查询，重置，添加 三个
| table | 列表 | 定制整个表格时使用 **低频使用** |
| table-columns | 列表项 | 定制列表数据中的数据列 |


### minxins 混入
    看源码更直观， 以下是简单罗列

#### 1. 响应式数据

  ```javascript
    // 查询参数
    searchData
    // 查询结果
    resultData: {
      list: []
    }
    // 分页数据
    pagination: {
      current: 1,
      size: 20,
      total: 0
    },
    // 是否loading
    reqLoading: false,
    // loading文案
    reqLoadingText: ''
  ```

#### 2. 方法
    见源码
  

### 组件收益
    1. 样式一致性
    2. 代码抽公用
    3. 业务代码简单化