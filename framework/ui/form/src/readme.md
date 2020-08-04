gt-form-item
===
> author: caoshitong

#### 示例代码

##### input
```html
<gt-form-item
  label="名称：" prop="name" type="input"
  v-model="ruleForm.name"
  :rules="[{ required: true, message: '不能为空', trigger: 'change' }]"
  :type-options="{
    type:'text',
    showWordLimit: true,
    clearable: true,
    maxlength: 50,
  }"
/>
```
##### select
```html
<gt-form-item
  label="版本：" type="select" placeholder="请选择版本"
  v-model="ruleForm.defaultVersion"
  :type-options="{
    style: {width: '100%'},
    requestService: this.$api.Version.getList,
    defaultOptions: versionOptions,
    paramsResolve: resolveVersionParams,
    disabled: !ruleForm.product_id
  }"
/>
```

##### custom
```html
<gt-form-item label="描述：" prop="text" type="custom">
  <template slot="edit">
    <div class="el-input">
      <rich-text :type="richTextType.markdown" @change="handleChange" :content="content" />
    </div>
  </template>
  <template slot="show">
    <div class="el-input">
      <div v-html="hcContent" style="min-height:100px;border: 1px #ccc solid;padding: 0 10px; border-radius: 3px;" />
    </div>
  </template>
</gt-form-item>
```

#### 解决的问题
1. el-form-item 没有纯展示模式，虽然有disable/readonly模式，但是表现效果欠佳。为了达到更好的展示效果需要写大量的if判断
2. 对于特定类型的表单项，需要通过大量代码编写复杂的实现并且这些代码不易管理
3. 使用el-form-item实现功能代码不太优雅

#### 收益
1. 详情，编辑，添加 三种模式合一
2. 减少代码量
3. 效率、质量提升

