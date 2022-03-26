<template>
  <div class="coupon-preview">
    <div class="coupon-container"
        :style="{ 'border-color' : color }">
      <div class="coupon-title" :style="{ 'background-color' : color }">
        <div class="coupon-title-text">{{ name }}</div>
        <div class="coupon-title-date">{{ endDate }}まで有効</div>
      </div>
      <div class="coupon-text" :style="{ color }">
        <p>{{ content }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { coupon_colors } from '~/shared/util.js';

export default {
  name : 'CouponPreview'
  , props : {
    colorNumber : {
      type : Number
      , default : 0
    }
    , content: {
      type : String
      , required: true
    }
    , name : {
      type : String
      , required: true
    }
    , endDate : {
      type : String
      , required: true
    }
  }
  , computed: {
    color() {
      return coupon_colors[this.colorNumber];
    }
  }
};
</script>
<style lang="stylus">
@import '../../layouts/variables.styl';

.coupon-preview
  max-width 300px
  width 300px
  .coupon-container
    border-radius 10px
    border 4px solid
    overflow hidden
    margin auto
    background-color $color-grey-super-lite
    .coupon-title
      background-color #F8990A
      color #FFF
      font-weight bold
      padding 0.5em
      flex-shrink 0
      display flex
      justify-content space-between
      align-items center
      font-size 0.8em
    .coupon-text
      padding 1em
      font-weight bold
      overflow hidden
</style>
