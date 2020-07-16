const GtFormItem = {
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
    const { $attrs: { label, prop, rules, type, placeholder, 'type-options': typeOptions = {} } } = this;
    // 从父组件中取form ,待优化递归找到最近的一个form的 mode
    const { $parent: { $attrs: { mode = 'edit' } } } = this;
    const { customShow } = this.$slots;
    // vue jsx 不支持函数引入所以一堆 case
    const createItemContent = () => {
      switch (type) {
        case 'input':
          return {
            show: <span>{this.itemValue}</span>,
            edit: <el-input
              v-model={this.itemValue}
              placeholder={placeholder}
              {...typeOptions}
            />
          };
        case 'select':
          const { remoteService, defaultOptions = [] } = typeOptions;
          console.log(this.itemValue, defaultOptions, '----defaultOptions');

          const showValue = defaultOptions.filter(option => {
            if (option.value === this.itemValue) {
              return true;
            }
            return false;
          }).map(option => option.label);
          return {
            show: customShow || <span>{showValue.join(',')}</span>,
            edit: <gt-select
              v-model={this.itemValue}
              placeholder={placeholder}
              remoteService={remoteService}
              defaultOptions={defaultOptions}
              {...typeOptions}
            />
          };
        case 'textarea':
          return {
            show: <span>{this.itemValue}</span>,
            edit: <el-input
              type="textarea"
              v-model={this.itemValue}
              placeholder={placeholder}
              {...typeOptions}/>
          };
        default:
          return {
            show: <span>gt-form-item: type no exists</span>,
            edit: <span>gt-form-item: type no exists</span>
          };
      }
    };
    
    return (
      <el-form-item label={label} prop={prop} rules={rules}>
        {
          createItemContent()[mode]
        }
      </el-form-item>
    );
  }
};

export default GtFormItem;
