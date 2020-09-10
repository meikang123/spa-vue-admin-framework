<template>
  <div>
    <div v-if="isDetail">
      <div class="gt-picture-image" v-for="(item, index) in renderList" :key="index">
        <div class="gt-preview-btn" @click.stop="">
          <i class="el-icon-zoom-in" @click="handlePreviewImg(index)" />
        </div>
        <img :src="item.url">
      </div>
    </div>
    <el-upload
      v-else
      v-bind="$attrs"
      v-on="$listeners"
      accept="image/*"
      :with-credentials="withCredentials"
      :file-list="fileList"
      :multiple="multiple"
      :limit="limit"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :on-exceed="handleExceed"
      style="line-height:0;"
    >
      <div v-if="isNeedTrigger" class="gt-upload--trigger" slot="trigger"><i class="el-icon-plus" /></div>
      <div class="gt-picture-image" v-for="(item, index) in renderList" :key="index">
        <div class="gt-preview-btn" @click.stop="">
          <i class="el-icon-zoom-in" @click="handlePreviewImg(index)" />
          <i class="el-icon-delete" @click="handleDeleteImg(index)" />
        </div>
        <img :src="item.url">
      </div>
      <slot name="tip" slot="tip" />
    </el-upload>
    <gt-dialog :visible.sync="isVisible" title="图片预览" :is-show-footer="false">
      <div class="gt-preview-box"><img :src="previewUrl"></div>
    </gt-dialog>
  </div>
</template>

<script>
export default {
  name: 'GtUploadImg',
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [String, Array],
      default: ''
    },
    isDetail: {
      type: Boolean,
      default: false
    },
    withCredentials: {
      type: Boolean,
      default: true
    },
    multiple: {
      type: Boolean,
      default: false
    },
    size: {
      // 文件大小，单位为kb
      type: Number,
      default: 0
    },
    measure: {
      // 文件尺寸大小，例：30*30
      type: String,
      default: ''
    },
    fileTypes: {
      // 文件类型
      // jpg 或 jpg,png 或 jpg|png
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    buildRenderData: {
      type: Function,
      default: null
    },
    renderDataMap: {
      type: Function,
      default: null
    },
    handleUploadSuccess: {
      // 处理上传成功数据，必须返回可以预览的url
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isInit: false,
      isVisible: false,
      previewUrl: '',
      fileList: [],
      uploadNumber: 0,
      errMsg: ''
    };
  },
  computed: {
    isSingle() {
      return !this.multiple;
    },
    isNeedTrigger() {
      return this.multiple || this.renderList.length === 0;
    },
    renderList: {
      get() {
        if (typeof this.buildRenderData === 'function') return this.buildRenderData(this.value);
        if (this.value && typeof this.value === 'string') {
          return [{ url: this.value }];
        }
        if (Array.isArray(this.value)) {
          return this.value.map(item => ({
            url: item
          }));
        }
        return [];
      },
      set(data) {
        let val;
        if (typeof this.renderDataMap === 'function') {
          val = this.renderDataMap(data);
        } else {
          val = data.map(item => item.url);
          if (this.isSingle && typeof this.value === 'string') {
          // eslint-disable-next-line prefer-destructuring
            val = data[0].url;
          }
        }
        this.$emit('input', val);
        this.$emit('success', val, !!this.errMsg);
      }
    }
  },
  watch: {
    uploadNumber(newData) {
      if (newData === 0) {
        if (this.errMsg) {
          this.$emit('error', this.errMsg);
          this.errMsg = '';
        }
      }
    }
  },
  methods: {
    uploadError() {
      // 文件上传失败
      this.uploadNumber -= 1;
      if (!this.errMsg) this.errMsg = '上传失败，请稍后尝试！';
    },
    uploadSuccess(res, file) {
      this.uploadNumber -= 1;
      if (res && res.code === 0) {
        if (!this.isInit) this.isInit = true;
        let data = {
          url: res.data
        };
        if (typeof this.handleUploadSuccess === 'function') {
          data = this.handleUploadSuccess(res.data);
        }
        const { renderList } = this;
        if (this.isSingle) {
          this.renderList = [data];
        } else {
          renderList.push(data);
          this.renderList = renderList;
        }
      } else if (!this.errMsg) this.errMsg = `${file.name}图片上传失败`;
    },
    handleBeforeUpload(file) {
      const { name, size } = file;
      this.uploadNumber += 1;
      return new Promise((resolve, reject) => {
        if (this.fileTypes) {
          let { fileTypes } = this;
          if (this.fileTypes.includes(',')) {
            fileTypes = this.fileTypes.replace(',', '|');
          }
          const exp = new RegExp(`\\.(${fileTypes})$`);
          if (!exp.test(name)) {
            if (!this.errMsg) this.errMsg = `图片${name}格式只能为${this.fileTypes}`;
            this.setUploadNumber();
            return reject();
          }
        }
        if (this.size && size / 1024 > this.size) {
          if (!this.errMsg) this.errMsg = `图片${name}大小超过${this.size}kb`;
          this.setUploadNumber();
          return reject();
        }
        const img = new Image();
        img.onload = () => {
          const { error, width, height, src } = img;
          if (error) {
            if (!this.errMsg) this.errMsg = `图片${name}加载失败`;
            this.setUploadNumber();
            reject();
          } else if (this.measure && this.measure !== `${width}*${height}`) {
            if (!this.errMsg) this.errMsg = `图片${name}尺寸必须为${this.measure}`;
            this.setUploadNumber();
            reject();
          } else {
            resolve();
          }
          window.URL.revokeObjectURL(src);
        };
        img.src = URL.createObjectURL(file);
      });
    },
    handlePreviewImg(index) {
      this.isVisible = true;
      this.previewUrl = this.renderList[index].url;
    },
    handleDeleteImg(index) {
      const { renderList } = this;
      const { url } = renderList[index];
      if (url.startsWith('blob:')) {
        window.URL.revokeObjectURL(url);
      }
      renderList.splice(index, 1);
      this.renderList = renderList;
      this.fileList = renderList;
    },
    handleExceed() {
      this.$emit('error', `最多只能上传${this.limit}张图片`);
    },
    setUploadNumber() {
      this.$nextTick(() => {
        this.uploadNumber -= 1;
      });
    }
  }
};
</script>

<style scoped lang="scss">
  .gt-upload--trigger {
    margin: 5px;
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #8c939d;
    border: 1px dashed #d9d9d9;
    &:hover {
      border-color: #409EFF;
    }
  }
  .gt-picture-image {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    width: 150px;
    height: 150px;
    border: 1px solid #d9d9d9;
    vertical-align: top;
    &:hover {
      border-color: #409EFF;
      .gt-preview-btn {
        display: flex;
      }
    }
    .gt-preview-btn {
      display: none;
      position: absolute;
      top: 0;
      width: 100%;
      height: 36px;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: flex-end;
      align-items: center;
      cursor: default;
      i {
        margin-right: 15px;
        font-size: 18px;
        color: #fff;
        cursor: pointer;
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .gt-preview-box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
