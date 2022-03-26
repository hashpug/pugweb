<template>
  <div class="coupon-color-picker">
    <div class="color-line">
      <label class="color-picker" v-for="(rgb, idx) in palettes">
        <input type="radio" class="radio"
          name="colorpicker" :value="idx" @change="$emit('change', idx)" >
        <div class="color-picker-content" :style="{ 'background-color' : palettes[idx] }" />
        <div class="color-picker-selected" />
      </label>
    </div>
  </div>
</template>

<script>
import { coupon_colors } from '~/shared/util.js';

export default {
  name : 'CouponColorPicker'
  , model : {
    prop : 'color'
    , event : 'change'
  }
  , props : {
    color : {
      type : Number
      , require : true
    }
    , palettes : {
      type : Array
      , default : () => {
        return coupon_colors;
      }
    }
  }
};
</script>

<style lang="stylus">
.coupon-color-picker
  max-width 400px
  .radio
    display none
  .color-line
    display flex
    justify-content space-between
    flex-wrap wrap
    &:first-child
      margin-bottom 15px
    .color-picker
      position relative
      display inline-block
      width 110px
      height 50px
      .color-picker-content
        position absolute
        width 98px
        height 38px
        border 0px solid
        border-radius 6px
        margin auto
      .color-picker-selected
        display none
        position: absolute
        width 108px
        height 48px
        border 3px solid #c4c4c4
        border-radius: 9px
        top -5px
        left -5px
      .radio:checked
        & ~ .color-picker-selected
          display block

</style>  
