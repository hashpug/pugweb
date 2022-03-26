<template>
  <div class="product-button-other">
    <a class="toggle-button" @click="openModal">
      <span class="toggle-button-content">その他</span>
    </a>

    <div class="modal" :class="{ 'is-active' : is_modal_active }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="detailed-container">
          <div class="is-flex is-justify-content-space-between is-align-items-center px-6 mt-5 mb-6">
            <div>{{ categoryName }} その他</div>
            <a class="close-button" @click="closeModal">
              <img src="/images/common/icon-times-g.png" />
            </a>
          </div>

          <div class="detailed-form">
            <div class="is-flex is-justify-content-space-between mb-6">
              <label class="label">製品名</label>
              <div>
                <input type="text" class="input is-small" v-model="name"/>
              </div>
            </div>
            <div class="is-flex is-justify-content-space-between mb-6">
              <label class="label">買取金額</label>
              <div class="is-flex">
                ￥<input type="text" class="input is-small price-input" v-model.number="price" />
              </div>
            </div>
            <div class="buttons is-centered mb-6">
              <a class="button is-secondary is-bordered" @click="emitOther">決定</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus">
@import '../../layouts/variables.styl';

.product-button-other
  position relative
  width 29%
  margin 2%
  .toggle-button
    display block
    background rgba(15, 175, 209, 0.15)
    color inherit
    padding 1em
    border 2px solid transparent
    border-radius 0.5em
    text-align center
    &.is-active
      border 2px solid $color-primary
      position relative
      &:before, &:after
        display block
        position absolute
      &:before
        content ''
        width 16px
        height 16px
        background $color-primary
        border 0px solid
        border-radius 100%
        top -8px
        right -8px
      &:after
        content ''
        background-image url('/images/common/form/check.png')
        background-repeat no-repeat
        background-size contain
        width 12px
        height 12px
        top -5px
        right -5px
    .toggle-button-content
      white-space nowrap
      overflow hidden
      display block
      width 80%
      margin auto
  .modal-content
    max-width 430px
    .detailed-container
      background #fff
      border 2px solid $color-primary
      border-radius 10px
      .detailed-form
        max-width 300px
        margin auto
        .input
          width 14em
        .price-input
          width 7em
      .close-button
        width 1.5em
</style>
<script>
export default {
  name : 'product-button'
  , props : {
    categoryName : {
      type : String
      , required : true
    }
  }
  , computed : {
    hasDetailed() {
      return this.product.detailed_categories && this.product.detailed_categories.length > 0;
    }
  }
  , data() {
    return {
      is_checked : false
      , is_modal_active : false
      , name : null
      , price : null
    }
  }
  , methods : {
    openModal() {
      this.is_modal_active = true;
    }
    , closeModal() {
      this.is_modal_active = false;
    }
    , emitOther() {
      if (!this.name || !this.price) { return; }
      this.$emit('add', {
        name : this.name
        , quantity : 1
        , unit : '-'
        , unit_price : this.price
        , price : this.price
      });
      this.is_modal_active = false;
      this.name = null;
      this.price = null;
    }
  }

}
</script>
