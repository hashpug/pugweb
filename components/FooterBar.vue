<template>
 <div class="footer-component section">
    <div class="container">
      <div class="columns is-vcentered">
        <div class="column is-narrow">
          <img src="/images/common/logo-desc.png" width="216" />
        </div>
        <div class="column">
          <div class="columns links has-text-weight-bold">
            <div class="column is-narrow">
              <nuxt-link to="/">会社概要</nuxt-link>
            </div>
            <div class="column is-narrow">
              <nuxt-link to="/">当サイトのご利用にあたって</nuxt-link>
            </div>
            <div class="column is-narrow">
              <nuxt-link to="/">ご意見・ご要望</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
 </div> 
</template>
<style lang="stylus">
@import '../layouts/variables.styl'

.footer-component
  background-color $color-primary
  .links
    justify-content space-between
    margin-right 15%
    margin-left 5%
    a
      color $color-primary-invert

</style> 
