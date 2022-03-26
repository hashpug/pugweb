<template>
  <div class="calculator-item">
    <div class="upper">
      <div class="product-info">
        <a class="delete-button" @click="emitRemove">
          <img src="/images/common/icon-times-g.png" />
        </a>
        <div class="product-name">{{ product.name }}</div>
      </div>
      <div class="product-coupon-input" v-if="product.coupon_rate">
        <span class="product-coupon-input-label">クーポン適用：</span>
        <Toggle v-model="has_coupon" />
      </div>
    </div>

    <div class="lower">
      <div class="calc-input-area">
        <div class="is-flex is-align-items-center">
          <div class="unit-price">¥{{ product.unit_price }}</div>
          <div class="times">×</div>
          <div class="quantity-input">
            <input type="text" class="input" v-model.number="quantity" /> {{ product.unit }}
          </div>
          <div class="coupon-apply" v-if="has_coupon">
            <div class="times">×</div>
            <div class="coupon-rate">{{ couponRate }}</div>
          </div>

          <div class="times">=</div>
        </div>
        <div>¥{{ calcResult }}</div>
      </div>
    </div> 
  </div>
</template>
<style lang="stylus">
@import '../../layouts/variables.styl';

.calculator-item
  padding 2%
  .upper
    display flex
    justify-content space-between
    align-items center
    padding 0.5em 0
    .product-info
      display flex
      .delete-button
        width 1.5em
        height 1.5em
        margin-right 1em
      .product-name
        font-size 1.1em
        font-weight bold
    .product-coupon-input
      display flex
      align-items center
      .product-coupon-input-label
        font-weight bold
        color $color-grey
        font-size 0.8em
  .lower
    padding 0 5%
    font-weight bold
    .calc-input-area
      display flex
      align-items center
      justify-content space-between
      .unit-price
        width 4em
      .times
        width 1em
        text-align center
        margin 0 1em
      .coupon-apply
        display flex
        .coupon-rate
          color $color-primary
      .quantity-input
        display flex
        align-items center
        .input
          width 3em
          padding 5px
          margin-right 0.5em

</style>
<script>
import Toggle from '~/components/Toggle.vue';
export default {
  name : 'calculator-item'
  , components : {
    Toggle
  }
  , props : {
    product : {
      type : Object
      , required : true
    }
  }
  , computed: {
    calcResult() {
      const price = this.quantity ? parseInt(this.product.unit_price, 10) * this.quantity : 0;
      if (this.has_coupon) {
        return Math.floor(price * this.couponRate);
      } else {
        return Math.floor(price);
      }
    }
    , couponRate() {
      return (1 + (this.product.coupon_rate / 100));
    }
  }
  , data() {
    return {
      quantity : null
      , has_coupon : false
    }
  }
  , watch: {
    quantity() {
      this.$emit('change');
    }
    , has_coupon() {
      this.$emit('change');
    }
  }
  , methods: {
    emitRemove() {
      this.quantity = null;
      this.has_coupon = false;
      this.$emit('remove', this.product);
    }
    , getSubtotal() {
      return this.calcResult;
    }
    , getData() {
      return {
        name : this.product.name
        , quantity : this.quantity
        , unit : this.product.unit
        , unit_price : this.product.unit_price
        , applied_coupon : this.has_coupon
        , coupon_rate : this.product.coupon_rate
        , price : this.getSubtotal()
      }
    }
  }
}
</script>
