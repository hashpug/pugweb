<template>
  <div class="modal" :class="{ 'is-active' : isShow }">
    <div class="modal-background"
      :class="{ 'is-black' : isBackdropBlack }"></div>
    <div class="modal-content">
      <vue-loading
        type="spiningDubbles"
        color="#aaa"
        :size="{ width: '100px', height: '100px' }"></vue-loading>
    </div>
  </div>
</template>
<style lang="stylus">
  .modal
    .modal-background
      &.is-black
        background-color #000
        width 100vw
        height 100vh
</style>
<script>
export default {
  name : 'loading'
  , props: {
    isShow : {
      type : Boolean
      , default : false
    }
    , isBackdropBlack: {
      type: Boolean
      , default: false
    }
  }
}
</script>
