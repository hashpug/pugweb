<template>
  <div class="product-button" :key="render_ver">
    <a class="toggle-button" @click="emitProduct"
      :class="{ 'is-active' : has_display_check }">
      <span class="toggle-button-content">{{ product.name }}</span>
    </a>
    <a class="modal-button" @click="openModal"  v-if="hasDetailed">
      <img src="/images/common/icon-dots-g.png" class="modal-icon" />
    </a>
    <a class="fav-button" v-if="update">
      <img v-if="!product.favorite" src="/images/common/icon-heart-g.png" class="fav-icon" />
      <img v-if="product.favorite" src="/images/common/icon-heart-r.png" class="fav-icon" />
    </a>

    <div class="modal" :class="{ 'is-active' : is_modal_active }">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="detailed-container">
          <div class="is-flex is-justify-content-space-between is-align-items-center px-6 my-5">
            <div>{{ product.name }} 詳細</div>
            <a class="close-button" @click="closeModal">
              <img src="/images/common/icon-times-g.png" />
            </a>
          </div>

          <div class="detailed-buttons">
            <template v-for="detailed in product.detailed_categories">
              <a class="toggle-button" @click="submitDetailedButton(detailed)" 
                :class="{ 'is-active' : detailed.is_checked }">
                <span class="toggle-button-content">{{ detailed.name }}</span>
              </a> 
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus">
@import '../../layouts/variables.styl';

.product-button
  position relative
  width 29%
  margin 2%
  .toggle-button
    display block
    background #fff
    color $text-color-base
    padding 1em
    border 2px solid #fff
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
      text-overflow ellipsis
  .modal-button
    position absolute
    top 0em
    right 0.5em
    width 1em
  .fav-button
    position absolute
    top 0em
    left 0.5em
    width 1em
  .detailed-container
    background #fff
    border 1px solid $color-primary
    border-radius 10px
    .close-button
      width 1.5em
    .detailed-buttons
      display flex
      flex-wrap wrap
      align-items center
      justify-content center
      .toggle-button
        border-color $color-grey-lite
        margin 1em
        width 12em
        &.is-active
          border 2px solid $color-primary
</style>
<script>
export default {
  name : 'product-button'
  , props : {
    product : {
      type : Object
      , required: true
    }
    , update: {
      type : Boolean
      , default : false
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
      , has_display_check : false
      , render_ver : 0
    }
  }
  , methods : {
    emitProduct() {
      if (this.update) {
        this.emitFavorite();
        return;
      }
      this.is_checked = !this.is_checked;
      if (this.is_checked) {
        this.$emit('add', this.product);
      } else {
        this.$emit('remove', this.product);
      }
      this.offsetCheck();
    }
    , emitFavorite() {
      this.$emit('favorite', this.product);
      this.$nextTick(() => {
        this.render_ver++;
      });
    }
    
    , submitDetailedButton(dt) {
      dt.is_checked = !dt.is_checked;
      if (dt.is_checked) {
        this.$emit('add', dt);
      } else {
        this.$emit('remove', dt);
      }
      this.offsetCheck();
    }
    , openModal() {
      this.is_modal_active = true;
    }
    , closeModal() {
      this.is_modal_active = false;
    }
    , removeSelect(p) {
      if (p && p.name === this.product.name
          && p.id === this.product.id) {
        this.is_checked = false;
      }
      if (this.hasDetailed) {
        this.product.detailed_categories.forEach(det => {
          if (det.name === p.name
            && det.id === p.id) {
            p.is_checked = false;
          }
        });
      }
      this.offsetCheck();
    }
    , offsetCheck() {
      if (this.hasDetailed) {
        const checks = this.product.detailed_categories.filter(det => {
          return det.is_checked;
        });
        this.has_display_check = this.is_checked || checks.length > 0; 
      } else {
        this.has_display_check = this.is_checked;
      }
      this.render_ver++;
    }
  }

}
</script>
