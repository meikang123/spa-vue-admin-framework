// vue.component('gt-item-content', {
//   functional: true,
//   props: {
//     isDetail: {
//       type: Boolean,
//       default: false
//     },
//     type: {
//       type: String,
//       default: ''
//     }
//   },
//   render() {
//     switch (type) {
//       case 'input':
//         const { showWordLimit = false } = typeOptions;
//         return itemIsDetail
//           ? <span>{this.itemValue}</span>
//           : <el-input
//             v-model={this.itemValue}
//             placeholder={placeholder}
//             showWordLimit={showWordLimit}
//             style={style}
//             clearable
//             {...typeOptions}
//           />;
    
//       case 'select':
//         const { remoteService, defaultOptions = [] } = typeOptions;
//         const { itemValue } = this;
//         const showValue = defaultOptions.filter(option => {
//           // 单选
//           if (option.value === itemValue) {
//             return true;
//           }
//           // 多选
//           if (itemValue instanceof Array && itemValue.indexOf(option.value) !== -1) {
//             return true;
//           }
//           return false;
//         }).map(option => option.label);

//         if (show) {
//           show.attrs = {};
//           show.attrs.defaultOptions = this.defaultOptions;
//         }
//         return itemIsDetail
//           ? (show || <span>{showValue.join(',')}</span>)
//           : <gt-select
//             v-model={this.itemValue}
//             remoteService={remoteService}
//             defaultOptions={defaultOptions}
//             { ...typeOptions }
//           />;
      
//       case 'textarea':
//         return itemIsDetail
//           ? <span>{this.itemValue}</span>
//           : <el-input
//             type="textarea"
//             v-model={this.itemValue}
//             placeholder={placeholder}
//             {...typeOptions}/>;
//       case 'password':
//         return itemIsDetail
//           ? <span>{this.itemValue}</span>
//           : <el-input
//             type="password"
//             v-model={this.itemValue}
//             show-password
//             clearable />;
//       case 'custom':
//         return itemIsDetail
//           ? show
//           : edit;
//       default:
//         return <span>gt-form-item: type no exists</span>;
//     }
//   }
// });


export const ItemContent = ({ props }) => {
  console.log(props, '---props');

  const { type, isDetail: itemIsDetail, typeOptions = {}, placeholder, style, class: clazz } = props;
  switch (type) {
    case 'input':
      const { showWordLimit = false } = typeOptions;
      return itemIsDetail
        ? <span>{this.itemValue}</span>
        : <el-input
          v-model={this.itemValue}
          placeholder={placeholder}
          showWordLimit={showWordLimit}
          style={style}
          class={clazz}
          v-bind="$attrs"
          {...typeOptions}
        />;
    
    case 'select':
      const { remoteService, defaultOptions = [] } = typeOptions;
      const { itemValue } = this;
      const showValue = defaultOptions.filter(option => {
        // 单选
        if (option.value === itemValue) {
          return true;
        }
        // 多选
        if (itemValue instanceof Array && itemValue.indexOf(option.value) !== -1) {
          return true;
        }
        return false;
      }).map(option => option.label);

      if (show) {
        show.attrs = {};
        show.attrs.defaultOptions = this.defaultOptions;
      }
      return itemIsDetail
        ? (show || <span>{showValue.join(',')}</span>)
        : <gt-select
          v-model={this.itemValue}
          remoteService={remoteService}
          defaultOptions={defaultOptions}
          { ...typeOptions }
        />;
      
    case 'textarea':
      return itemIsDetail
        ? <span>{this.itemValue}</span>
        : <el-input
          type="textarea"
          v-model={this.itemValue}
          placeholder={placeholder}
          {...typeOptions}/>;
    case 'password':
      return itemIsDetail
        ? <span>{this.itemValue}</span>
        : <el-input
          type="password"
          v-model={this.itemValue}
          show-password
          clearable />;
    case 'custom':
      return itemIsDetail
        ? show
        : edit;
    default:
      return <span>gt-form-item: type no exists</span>;
  }
};

export const abc = {};
