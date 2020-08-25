枚举方案
------
> 枚举方案分为两部分： A. 后端动态枚举，B. 前端静态枚举。  
> 区分方式：前端逻辑本身枚举，或后端暂时不能提供的业务枚举，可以归类于前端静态枚举。其他为后端动态枚举。

### A. 后端动态枚举
 考虑到编码的便利性，及使用成本，后端动态枚举设计为阻塞式。所有枚举统一通过后端固定接口返回，该接口在 root Compoent created时被调用。

 ```javascript
||||||||||||||||||||||||||||||||||||||||
||     ||                             ||
|| 菜单 | view component, 被阻塞的内容  |
||     ||                             ||
||     ||                             ||
||     ||                             ||
||||||||||||||||||||||||||||||||||||||||
 ```

### B. 前端静态枚举
 使用 framework/utils/enum 实例化。eg.
 ```javascript
import { Enum } from '@framework/utils';

 ```






> 前端静态枚举与后端动态枚举将被合并至 Enums (vuex) 中，从而统一使用规范。


### 使用场景及规范

#### 1.template中使用
```html
<!-- 渲染逻辑 -->
<el-form-item>
  <gt-select
    :default-options="Enums.caseType.toSelectOptions()"
    v-model="searchData.type"
    placeholder="请选择类型"
  />
</el-form-item>

<!-- Filter -->
<el-table-column label="类型" width="90">
  <template slot-scope="{ row }">
    {{ row.type | formatEnum(Enums.caseType) }}
  </template>
</el-table-column>
```
#### 2.javascript中使用
```javascript
  ...
  computed: {
    isRuning() {
      return this.info.status === this.Enums.processState.RUNNING;
    }
  },
  ...
```




