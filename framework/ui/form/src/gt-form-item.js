import { Obj } from '@framework/utils';

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
      console.log(value, 'getFormItemValue');
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
    const { $attrs: { label, prop, rules, type } } = this;
    const { $parent: { $attrs: { mode = 'edit' } } } = this;
    
    const ItemContentMap = {
      input: {
        show: <span>{this.itemValue}</span>,
        edit: <el-input v-model={this.itemValue} />
      },
      select: {
        show: <span>select</span>,
        edit: <gt-select />
      }
    };
    
    return (
      <el-form-item label={label} prop={prop} rules={rules}>
        {
          Obj.get(ItemContentMap, `${type}.${mode}`) || <span>gt-form-item: type no exists</span>
        }
      </el-form-item>
    );
  }
};

export default GtFormItem;
