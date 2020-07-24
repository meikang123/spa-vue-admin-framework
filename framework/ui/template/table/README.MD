TABLE 模版组件 模版类组件
===
> 解决的问题：为常见的列表查询页面进行封装，规范列表查询的编写方式

模版组件分为两部分：组件部分，mixin部分。两部分需要配套使用

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
}
```

### 使用说明
由于是模版类组件所以主要对外提供slot，以及mixins内部预置的方法,一般情况下开发者只需配置table 上部分的查询表单，以及table的列即可完成一个完整的查询列表页。

### 组件收益
每用一次减少预计300行代码量，可快速开发出应用主体功能，使5小时左右的开发工作减少至1小时左右。基本上免测试。