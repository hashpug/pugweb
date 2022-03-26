<template>
  <div class="toggle">
    <label class="toggle__label">
      <input
        type="checkbox"
        class="toggle__input"
        :checked="reverse ? !checked : checked"
        @change="$emit('change', reverse ? !$event.target.checked : $event.target.checked)"
      >
      <span class="toggle__content" />
      <span class="toggle__circle" />
    </label>
  </div>
</template>

<script>
export default {
  name : 'Toggle'
  , model : {
    prop : 'checked'
    , event : 'change'
  }
  , props : {
    checked : {
      type : Boolean
      , default : false
    }
    , reverse: {
      type: Boolean
      , default : false
    }
  }
};
</script>

<style lang="stylus">
$toggle_bg_color = #0FAFD1;
$transition_time = .3s
.toggle
  display inline-block
  &__label
    width 37px
    position relative
    display inline-block
    padding-top 3px
  &__content
    display block
    cursor pointer
    position relative
    border-radius 8px
    height 16px
    background-color rgba(34,31,31,.26)
    transition all .1s .4s
    overflow hidden
    &:after
      content ""
      display block
      position absolute
      width 0
      height 100%
      top 0
      left 0
      border-radius 7px
      transition all $transition_time
  &__input
    display none
  &__circle
    display block
    top 0px
    left 0px
    position absolute
    width 20px
    height 20px
    border-radius 10px
    background-color #FFF
    transition all $transition_time
    box-shadow 1px 2px 3px 1px #ccc
  &__input:checked
    & ~ .toggle__circle
      left 18px
    & ~ .toggle__content
      border-color transparent
      transition all 0s
    & ~ .toggle__content:after
      background-color $toggle_bg_color
      width 100%
</style> 
