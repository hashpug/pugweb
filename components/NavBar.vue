<template>
  <div class="navbar-component">
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="/images/common/logo.png" width="144" height="29">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" :class="{ 'is-active' : is_active }"
          @click="is_active = !is_active">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active' : is_active }">
        <div class="navbar-end">
          <div class="navbar-item">
            <nuxt-link to="" class="has-text-white" v-if="!token">店舗掲載をご検討中のお客様</nuxt-link>
          </div>
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-rounded is-outlined is-white"
                @click="is_login_active = true" v-if="!token">
                ログイン
              </a>
              <nuxt-link to="/store" v-if="token" class="button is-rounded is-outlined is-white">
                ログイン
              </nuxt-link>
              <nuxt-link to="/register" class="button is-rounded is-outlined is-white"  v-if="!token">
                掲載登録
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <LoginModal :isActive="is_login_active" @close="is_login_active = false"></LoginModal>
  </div>
</template>
<style lang="stylus">
@import '../layouts/variables.styl'

.navbar-component
  background-color $color-primary
  .navbar
    max-width $max-container-width
    margin auto
    font-weight bold
    .navbar-menu
      background-color inherit
</style>
<script>
import Vuex from 'vuex';
import LoginModal from './LoginModal.vue';
export default {
  name : 'navbar'
  , components : {
    LoginModal
  }
  , computed : {
    ...Vuex.mapState({
      token : state => state.user.token
    })
  }
  , data() {
    return {
      is_active : false
      , is_login_active : false
    }
  }
}
</script>
