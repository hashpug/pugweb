<template>
 <div class="regi-tabbar-component">
    <div class="tabs-container">
      <div class="first-tab">
        <a class="tab-item" :class="{ 'is-active' : active_key === 'all' }"
          @click="emitChange('all')">
          全品目
        </a>
        <a class="tab-item" :class="{ 'is-active' : active_key === 'favorite' }"
          @click="emitChange('favorite')">
          お気に入り
        </a>
      </div>
      <!--div class="second-tab">
        <a class="tab-item" :class="{ 'is-active' : active_key === 'howto' }"
          @click="emitChange('howto')">
          使い方
        </a>
      </div-->
    </div>
  </div>
</template>
<style lang="stylus">
@import '../../layouts/variables.styl';
.regi-tabbar-component
  padding 3em 5% 0 5%
  border-bottom 2px solid #fff
  border-right 2px solid #fff
  .tabs-container
    display flex
    align-items center
    justify-content space-between
    max-width $max-container-width
    margin auto
    .first-tab, .second-tab
      display flex
      justify-content space-around
      font-weight bold
      border none
      width 50%
      .tab-item
        color inherit
        border 0
        margin 0 5%
        &.is-active
          color $color-primary
          border-bottom 5px solid 
    .second-tab
      justify-content flex-end
</style>
<script>
export default {
  name : 'regi-tabbar'
  , props : {
    active_key : {
      type : String
      , default : 'all'
    }
  }
  , methods: {
    emitChange(name) {
      this.$emit('change', name);
    }
  }
}
</script>
