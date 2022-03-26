<template>
<div class="alert-modal modal" :class="{ 'is-active' : show }">
  <div class="modal-background"></div>
  <div class="modal-content" :class="modalContentClass">
    <div class="alert-modal-content">
      <a v-if="hasClose" class="close-button" @click="cancel()">
        <img class="close-button-image" src="/images/components/close.png" />
      </a>
      <slot></slot>

      <p v-if="message" class="mb-3 has-text-weight-bold has-text-centered is-size-7" :class="messageClass">{{ message }}</p>
      <div class="buttons is-centered" v-if="buttons && buttons.length > 0">
        <a class="button is-primary is-rounded is-small" v-for="button in buttons" @click="buttonPush(button)">{{ button }}</a>
      </div>
    </div>
    <!-- Any other Bulma elements you want -->
  </div>
</div>
</template>
<style lang="stylus">
.alert-modal
  .simple-mode
    display flex
    justify-content center
    .alert-modal-content
      display inline-block
      padding 1.5em
  .alert-modal-content
    background-color #fff
    border 0px solid
    border-radius 1em
    padding 2.5em
    .close-button
      display flex
      justify-content flex-end
      align-items center
      margin-top -1em
      margin-right -1em
      margin-bottom 1em
      .close-button-image
        width 1em
</style>
<script>
export default {
  name : 'alert'
  , props : {
    show: {
      type : Boolean
      , default : false
    }
    , hasClose: {
      type : Boolean
      , default : true
    }
    , message : {
      type: String
      , default : () => ''
    }
    , buttons : {
      type: Array
      , default : () => []
    }
    , messageClass : {
      type : Array
      , default : () => []
    }
  }
  , computed : {
    modalContentClass() {
      if (this.isSimple()) {
        return ['simple-mode']
      }
    }
  }

  , methods : {
    buttonPush(name) {
      this.$emit('button', name);
    }
    , cancel() {
      this.$emit('cancel');
    }
    , isSimple() {
      return this.message && this.buttons.length > 0
    }
  }
}
</script>

