<template>
  <div class="store-navbar-component">
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
        <div class="navbar-start">
          <nuxt-link to="/regi" class="navbar-item"
            :class="{ 'is-active' : active === 'regi' }">
            レジ
          </nuxt-link>
          <nuxt-link to="/regi/update" class="navbar-item"
            :class="{ 'is-active' : active === 'regi-edit' }">
            レジ管理
          </nuxt-link>
          <nuxt-link to="/store" class="navbar-item"
            :class="{ 'is-active' : active === 'store' }">
            店舗情報編集
          </nuxt-link>
          <nuxt-link to="/coupons" class="navbar-item"
            :class="{ 'is-active' : active === 'coupon' }">
            クーポン管理
          </nuxt-link>
          <nuxt-link to="/purchase" class="navbar-item"
            :class="{ 'is-active' : active === 'purchase' }">
            買取履歴
          </nuxt-link>
        </div>
        <div class="navbar-end">
          <a class="navbar-item is-size-7" @click="logout">
            ログアウト
          </a>
        </div>
      </div>
    </nav>
    <LoginModal :isActive="is_login_active" @close="is_login_active = false"></LoginModal>
  </div>
</template>
<style lang="stylus">
@import '../layouts/variables.styl'

.store-navbar-component
  background-color $color-primary
  .navbar
    max-width $max-container-width
    margin auto
    font-weight bold
    .navbar-menu
      background-color inherit
      .navbar-start
        margin-left auto
</style>
<script>
import LoginModal from './LoginModal.vue';
export default {
  name : 'store-navbar'
  , components : {
    LoginModal
  }
  , props : {
    active : {
      type : String
      , default : ''
    }
  }
  , data() {
    return {
      is_active : false
      , is_login_active : false
    }
  }
  , methods: {
    async logout() {
      await this.$store.dispatch('user/logout');
      this.$router.push('/');
    }
  }
}
</script> 
