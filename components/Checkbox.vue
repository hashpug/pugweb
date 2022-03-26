<template>
  <div class="colored-checkbox">
    <label class="colored-checkbox-label">
      <input
        type="checkbox"
        class="colored-checkbox-input"
        :checked="checked"
        @change="$emit('change', $event.target.checked)"
      >
      <div class="colored-checkbox-inactive" />
      <div class="colored-checkbox-active">
        <img src="/images/common/form/check.png" class="colored-checkbox-active-image" />
      </div>
    </label>
  </div>
</template>

<script>
export default {
  name : 'Checkbox'
  , model : {
    prop : 'checked'
    , event : 'change'
  }
  , props : {
    checked : Boolean
  }
};
</script>

<style lang="stylus">
.colored-checkbox
  display inline-block
  height 1.25em
  line-height 1.25em
  vertical-align middle
  .colored-checkbox-label
    position relative
    width 1em
    height 1em
    display block
    border 0px solid
    border-radius 3px
    overflow hidden
    .colored-checkbox-inactive
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      background-color #dedede
      display block
    .colored-checkbox-active
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      margin auto
      background-color #0FAFD1
      display none
      .colored-checkbox-active-image
        position absolute
        top 0
        bottom 0
        left 0
        right 0
        margin auto
        width 13px
    .colored-checkbox-input
      display none
      &:checked
        & ~ .colored-checkbox-inactive
          display none
        & ~ .colored-checkbox-active
          display block


</style>  
