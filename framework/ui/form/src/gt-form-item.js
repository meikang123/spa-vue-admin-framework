
const GtFormItem = {
  parentForm: null,
  name: 'gt-form-item',
  model: {
    prop: 'gtFormItemValue',
    event: 'change'
  },
  props: ['gtFormItemValue'],
  data() {
    return {
      itemValue: this.gtFormItemValue
    };
  },

  watch: {
    itemValue(value) {
      this.$emit('change', value);
    },
    gtFormItemValue(value) {
      this.itemValue = value;
    }
  },

  render() {
    // const inputAttributes = {
    //   class: 'input-field', // class definition
    //   onClick: this.handleClick, // event handler
    //   backdrop: false, // custom prop
    //   abc: 'fdsafd',
    //   on: {
    //     click: this.handleClick
    //   },
    //   attrs: {
    //     test: 'fdsafd'
    //   }
    // };
    // return (
    //   <div {...inputAttributes} style={{ color: 'red' }} >fdsaf</div>
    // );
    const findParentForm = parent => {
      if (parent._vnode.tag === 'form') {
        return parent;
      }
      return findParentForm(parent.$parent);
      // this.parentForm = this.findParentForm();
    };
    const { $attrs: { label, prop, rules, type, placeholder, 'type-options': typeOptions = {} } } = this;
    // 从父组件中取form ,待优化递归找到最近的一个form的 mode
    // const { $parent: { $attrs: { 'is-detail': isDetail } } } = this;
    const parentForm = findParentForm(this.$parent);
    const { $attrs: { 'is-detail': isDetail } } = parentForm;
    
    const { customShow } = this.$slots;
    // vue jsx 不支持函数引入所以一堆 case
    const itemIsDetail = isDetail;
    const createItemContent = () => {
      switch (type) {
        case 'input':

          return itemIsDetail
            ? <span>{this.itemValue}</span>
            : <el-input
              v-model={this.itemValue}
              placeholder={placeholder}
              {...typeOptions}
            />;
      
        case 'select':
          const { remoteService, defaultOptions = [] } = typeOptions;
          const showValue = defaultOptions.filter(option => {
            if (option.value === this.itemValue) {
              return true;
            }
            return false;
          }).map(option => option.label);

          return itemIsDetail
            ? (customShow || <span>{showValue.join(',')}</span>)
            : <gt-select
              v-model={this.itemValue}
              placeholder={placeholder}
              remoteService={remoteService}
              defaultOptions={defaultOptions}
              {...typeOptions}
            />;
        
        case 'textarea':

          return itemIsDetail
            ? <span>{this.itemValue}</span>
            : <el-input
              type="textarea"
              v-model={this.itemValue}
              placeholder={placeholder}
              {...typeOptions}/>;
        
        default:
          return <span>gt-form-item: type no exists</span>;
      }
    };
    
    return (
      <el-form-item label={label} prop={prop} rules={rules}>
        {
          createItemContent()
        }
      </el-form-item>
    );
  }
};

export default GtFormItem;
