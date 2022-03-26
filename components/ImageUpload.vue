<template>
  <div class="image-upload">
    <!-- 画像アップ -->
    <label class="no-image" v-if="!preview_image">
      <div class="add-button">
        <img src="/images/common/icon-plus-g.png" class="icon-image">
        <span>追加する</span>
      </div>
      <input class="input-file" type="file" name="resume" accept="image/png, image/jpeg" @change="onFileSelect" />
    </label>

    <div class="change-image" v-else>
      <img :src="preview_image" class="image-preview" />
      <div class="overlay">
        <a class="close-button" @click="removeImage">
          <img src="/images/common/icon-times-w.png"  class="icon-image"/>
        </a>
        <div class="change-button-container">
          <label class="change-button">
            <input class="input-file" type="file" name="resume" accept="image/png, image/jpeg" @change="onFileSelect" />
            変更する
          </label>
        </div>
      </div>
    </div>
  </div> 
</template>
<style lang="stylus">
.image-upload
  margin 1px
  width 100px
  height 100px
  display inline-block
  font-size 14px
  position relative
  background-color #e5e5e5
  .icon-image
    width 1em
  .input-file
    display none
  .no-image
    width 100%
    height 100%
    display flex
    align-items center
    cursor pointer
    .add-button
      display flex
      width 100%
      align-items center
      justify-content center
      span
        margin-left .5em
        color #999

  .change-image
    position absolute
    width 100%
    height 100%
    overflow hidden
    .overlay
      opacity 0
      transition opacity 0.3s ease-in-out
    &:hover
      .overlay
        opacity 1
        position absolute
        top 0
        left 0
        right 0
        bottom 0
        background-color rgba(0,0,0,0.5)
        z-index 1
        display flex
        align-items center
        justify-content space-around
        .close-button
          position absolute
          top 5px
          right 5px
        .change-button-container
          .change-button
            border 1px solid #fff
            border-radius 999px
            padding 2px 12px
            color #fff
            font-size 12px
            cursor pointer
 
</style>
<script>
import { axiosCatch, hasAxiosError, END_POINT } from '~/shared/util.js';
export default {
  name : 'ImageUpload'
  , props : {
    image : {
      type : String
      , require : false
    }
  }

  , data() {
    return {
      preview_image : null
      , file : null
    };
  }

  , created() {
    this.preview_image = this.image;
  }

  , watch: {
    image() {
      this.preview_image = this.image;
    }
  }

  , methods : {
    onFileSelect(e) {
      const files = e.target.files || e.dataTransfer.files;
      if (!files && files.length <= 0) { return; }
      const file = files[0];
      this.file = file;
      const reader = new FileReader();
      reader.onload = (ev) => {
        this.preview_image = ev.target.result;
        this.changeFile();
      };
      reader.readAsDataURL(file);
    }

    , removeImage() {
      this.preview_image = null;
      this.$emit('change');
    }

    , changeFile() {
      this.$emit('change', this.preview_image);
    }

    , async uploadFile() {
      if (!this.file) {
        return Promise.reject('file did not select.');
      }
      const image = this.file;
      const data = new FormData();
      data.append("file", this.file);

      const authorization_header = this.$store.getters['user/authorization'];
      authorization_header.headers['content-type'] = 'multipart/form-data';
      const response = await this.$axios.post(END_POINT + '/private/upload.json'
          , data, authorization_header).catch(axiosCatch);
      if (hasAxiosError(response)) {
        return Promise.reject('ファイルのアップロードに失敗しました。');
      } else {
        return Promise.resolve();
      }
    }

  }
};
</script>
