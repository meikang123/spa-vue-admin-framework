/* eslint-disable no-prototype-builtins */
/* eslint-disable eqeqeq */
/**
 * @class
 * @description 通用枚举类，参考自ECOMFE。
 */

class Enum {
  /**
   * 通用枚举类，用于生成一个枚举对象
   *
   * 枚举对象是业务系统中非常普遍使用的一个类型，其基本功能是将一个数字和具体的含义对应起来
   *
   * 枚举是一类数值的集合，枚举中的每一项包括3个属性：
   *
   * - `value`：对应原始的数字值
   * - `alias`：枚举项在业务中的别名，通常使用大写字母和下划线组成的常量表达方式
   * - `text`：该项显示时的文字
   *
   * 使用本类，可以简单地创建一个枚举对象，如：
   *
   *     var Status = new Enum(
   *         { alias: 'NORMAL', text: '正常' },
   *         { alias: 'DISABLED', text: '禁用' },
   *         { alias: 'DELETED', text: '已删除' }
   *     );
   *
   * 传入的参数的`value`由0开始今次递增。对于`value`非递增的枚举，在构造时对指定的项传入`value`属性即可，如：
   *
   *     var MouseButton = new Enum(
   *         { alias: 'LEFT', text: '左键', value: 1 },
   *         { alias: 'RIGHT', text: '右键', value: 2 },
   *         { alias: 'MIDDLE', text: '中键', value: 4 }
   *     );
   *
   * 枚举会维护2个映射，分别为`value`至`alias`及`alias`至`value`，因此可以简单地通过属性访问的方式获取`alias`或`value`：
   *
   *     if (user.status === Status.DELETED) {
   *         warn('该用户已经删除');
   *     }
   *
   * @param {object} 枚举项
   * @constructor
   */
  constructor() {
    this.valueIndex = [];
    this.aliasIndex = {};
    this.textIndex = {};

    for (let i = 0; i < arguments.length; i += 1) {
      // eslint-disable-next-line prefer-rest-params
      const element = arguments[i];
      if (element.value == null) {
        element.value = i;
      }
      this.addElement(element);
    }
  }

  /**
   * 为当前枚举对象添加一个{@link object 枚举项}
   *
   * @param {object} element 待添加的枚举项
   * @throws {Error} 如果`value`或`alias`存在重复则抛出异常
   */
  addElement(element) {
    if (this.hasOwnProperty(element.value)) {
      throw new Error(`Already defined an element with value${element.value} in this enum type`);
    }

    if (this.hasOwnProperty(element.alias)) {
      throw new Error(`Already defined an element with alias "${element.alias}" in this enum type`);
    }

    this[element.value] = element.alias;
    this[element.alias] = element.value;

    this.valueIndex[element.value] = element;
    this.aliasIndex[element.alias] = element;
    this.textIndex[element.text] = element;
  }

  /**
   * 根据数值获取枚举项
   *
   * @param {number} value 数值
   * @return {object} 对应的枚举项
   */
  fromValue(value) {
    return this.valueIndex[value];
  }

  /**
   * 根据别名获取枚举项
   *
   * @param {string} alias 别名
   * @return {object} 对应的枚举项
   */
  fromAlias(alias) {
    return this.aliasIndex[alias];
  }

  /**
   * 根据文字获取枚举项
   *
   * @param {string} text 文字
   * @return {object} 对应的枚举项
   */
  fromText(text) {
    return this.textIndex[text];
  }

  /**
   * 根据数值获取对应枚举项的文字
   *
   * @param {number} value 数值
   * @return {string} 对应的文字
   */
  getTextFromValue(value) {
    const element = this.fromValue(value);
    return element ? element.text : '--';
  }

  /**
   * 根据文字获取对应枚举项的文字
   *
   * @param {string} alias 文字
   * @return {string} 对应的文字
   */
  getTextFromAlias(alias) {
    const element = this.fromAlias(alias);
    return element ? element.text : '--';
  }

  /**
   * 根据数值获取对应枚举项的数值
   *
   * @param {string} alias 数值
   * @return {number} 对应的数值
   */
  getValueFromAlias(alias) {
    return (this.fromAlias(alias) || {}).value;
  }

  /**
   * 根据文字获取对应枚举项的数值
   *
   * @param {string} text 文字
   * @return {number} 对应的数值
   */
  getValueFromText(text) {
    return (this.fromText(text) || {}).value;
  }

  /**
   * 根据数值获取对应枚举项的别名
   *
   * @param {number} value 数值
   * @return {string} 对应的别名
   */
  getAliasFromValue(value) {
    return (this.fromValue(value) || {}).alias;
  }

  /**
   * 根据文字获取对应枚举项的别名
   *
   * @param {string} text 文字
   * @return {string} 对应的别名
   */
  getAliasFromText(text) {
    return (this.fromText(text) || {}).alias;
  }

  /**
   * 将当前枚举转换为数组，常用于下拉选择控件之类的数据源
   *
   * @param {...Mixed} [hints] 用于生成数组的提示信息，数组中的每一项可以为字符串或者对象，
   * 为字符串时使用`alias`与字符串相同的{@link object}对象，为对象时则直接将对象插入到当前位置。
   * 不提供此参数则直接将枚举按`value`属性进行排序生成数组返回
   * @return {object[]} 每次返回一个全新的数组副本
   */
  toArray() {
    const array = [];
    if (arguments.length > 0) {
      for (let i = 0; i < arguments.length; i += 1) {
        // eslint-disable-next-line prefer-rest-params
        const hint = arguments[i];
        if (typeof hint === 'string') {
          array.push(this.fromAlias(hint));
        } else {
          array.push(hint);
        }
      }
    } else {
      // 必须做一次复制操作，不能让外部的修改影响枚举结构
      /* eslint-disable no-redeclare */
      for (let i = 0; i < this.valueIndex.length; i += 1) {
        // 由于`value`不一定是连续的，所以一定要去除空项
        if (this.valueIndex[i]) {
          array.push(this.valueIndex[i]);
        }
      }
      /* eslint-enable no-redeclare */
    }
    return array;
  }

  /**
   * @description 用于select组件的 options
   */
  toSelectOptions() {
    const array = this.toArray();
    const options = array.map(
      item => ({
        value: item.value,
        label: item.text
      }),
    );
    return options;
  }

  /**
   * @description 用于select组件的 options 简写
   */
  options() {
    return this.toSelectOptions();
  }

  // { label: 'Apple', value: 'Apple' },
  toCheckArray(withAll) {
    let array = [];
    if (withAll) {
      array = [{ text: '全部', value: -1 }];
    }

    array = [...array, ...this.toArray()];

    return array.map(
      item => ({ label: item.text, value: item.value }),
    );
  }
}

export default Enum;
