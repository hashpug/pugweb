<template>
  <div class="tabbar-component">
    <div class="tabs">
      <ul>
        <template v-for="item in items">
          <li :class="{ 'is-active' : isActive(item.key) }">
            <nuxt-link :to="item.to" :target="item.target ? item.target : false">{{ item.label }}</nuxt-link>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<style lang="stylus">
@import '../layouts/variables.styl';
.tabbar-component
  .tabs
    max-width $max-container-width
    margin auto
    ul
      justify-content space-around
      font-weight bold
      border none
      li
        a
          border 0
        &.is-active a
          color $color-primary
          border-bottom 5px solid

</style>
<script>
// prop items: Array<{ to: string, target: string | null, key: string, label: string }>
export default {
  name : 'tab-bar'
  , props : {
    items : {
      type : Array
      , default : () => []
    }
    , active_key : {
      type : String
      , require : true
    }
  }
  , methods : {
    isActive(key) {
      return key === this.active_key;
    }
  }
}
</script>
