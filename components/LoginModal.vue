<template>
<div class="login-modal-component modal" :class="{ 'is-active' : isActive }">
  <div class="modal-background"></div>
  <div class="modal-content">
    <button class="delete is-large ml-auto mr-0 is-block" aria-label="close" @click="emitClose"></button>
    <p class="has-text-primary is-size-5 has-text-weight-bold mb-4">買取店舗様向け</p>

    <div class="columns">
      <div class="column is-6">
        <div class="is-flex is-flex-direction-column is-justify-content-space-between" style="height: 100%;">
          <div class="left-top">
            <div class="p-3">
              <p class="is-size-6 has-text-weight-bold mb-4">アカウントをお持ちでない方</p>
              <p class="is-size-7 mb-4">掲載登録していただくと、店舗情報をリサぺんナビに掲載できます</p>
            </div>
            <div class="merits">
              <div class="columns is-mobile">
                <div class="column is-narrow">
                  <img src="/images/common/login-modal/icon_01.png" width="32" />
                </div>
                <div class="column">
                  <p class="is-size-7 has-text-weight-bold">店舗情報の掲載で広告・集客効率アップ！</p>
                </div>
              </div>
              <div class="columns is-mobile">
                <div class="column is-narrow">
                  <img src="/images/common/login-modal/icon_02.png" width="32.5" />
                </div>
                <div class="column">
                  <p class="is-size-7 has-text-weight-bold">便利なレジや管理機能で作業効率アップ</p>
                </div>
              </div>
            </div>
            <div class="columns is-mobile">
              <div class="column is-6 is-offset-6 mt-4">
                <p class="is-size-7 has-text-weight-bold">この他にもたくさんのメリットがあります！</p>
              </div>
            </div>
          </div>
          <div class="buttons is-centered mt-6">
            <a class="button is-primary">
              掲載登録をする
            </a>
          </div>
        </div>
      </div>
      <div class="column is-6 second-col">
        <div class="is-flex is-flex-direction-column is-justify-content-space-between" style="height: 100%;">
          <div>
            <p class="has-text-centered has-text-weight-bold mb-2">ログイン</p>
            <div class="field">
              <label class="label has-text-weight-normal is-size-7">ログインID</label>
              <div class="control">
                <input type="text" class="input is-rounded" v-model="email" />
              </div>
            </div>
            <div class="field">
              <label class="label has-text-weight-normal is-size-7">パスワード</label>
              <div class="control">
                <input type="password" class="input is-rounded" v-model="password" />
              </div>
            </div>
            <a class="is-block help is-danger is-size-7 has-text-right">ID・パスワードを忘れた方</a>
            <div class="field">
              <div class="control my-2">
                <label class="checkbox is-inline-flex">
                  <Checkbox v-model="is_remember"></Checkbox>
                  <span class="ml-1 is-size-7">ログイン情報を記憶する</span>
                </label>
              </div>
            </div>
          </div>
          <div class="buttons is-centered">
            <a class="button is-primary" @click="doLogin">
              ログイン
            </a>
          </div> 
        </div>

      </div>
    </div>
  </div>
</div>
</template>
<script>
import Loading from '~/components/Loading.vue';
import Checkbox from '~/components/Checkbox.vue';
import { storeCatch, hasStoreError } from '~/shared/util.js';
export default {
  name : 'login-modal'
  , components : {
    Checkbox
    , Loading
  }
  , props : {
    isActive : {
      type : Boolean
      , default : false
    }
  }
  , data() {
    return {
      is_remember : false
      , is_loading : false
      , email : null
      , password: null
    }
  }
  , methods : {
    async doLogin() {
      this.is_loading = true;
      const result = await this.$store.dispatch('user/login', {
        email : this.email
        , password : this.password
        , is_remember : this.is_remember
      }).catch(storeCatch);
      this.is_loading = false;
      if (!hasStoreError(result)) {
        this.$router.push('/store');
      } else {
        this.$alert('ログインに失敗しました。');
      }
    }

    , emitClose() {
      this.$emit('close');
    }
  }

}
</script>
<style lang="stylus">
@import '../layouts/variables.styl';

.login-modal-component
  .button
    border-radius 16px
    padding-top calc(1.5em - 1px)
    padding-bottom calc(1.5em - 1px)
    font-weight bold
  .modal-content
    padding 30px 60px 60px 60px
    background #fff
    border 0px solid
    border-radius 20px
    width 80%
    max-width 750px
    .left-top
      width 80%
      margin auto
    .merits
      margin-top 20px
      padding-left 20px
      border-left 3px solid $color-primary
    .second-col
      @media size-is-mobile
        margin-top 30px
</style>
