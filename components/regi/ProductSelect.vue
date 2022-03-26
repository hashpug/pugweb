<template>
<div class="regi-product-select">
  <div class="regi-product-container">
    <template v-for="p in products">
      <ProductButton
        v-if="isOnlyFavorite ? p.favorite : true"
        :product="p"
        :update="update"
        ref="productButton"
        @favorite="emitFavorite"
        @add="emitAdd"
        @remove="emitRemove"></ProductButton>
    </template>
    <ProductButtonOther v-if="!update"
      :categoryName="categoryName"
      @add="emitAddOther($event)"></ProductButtonOther> 
  </div>
</div> 
</template>
<style lang="stylus">
.regi-product-select
  .regi-product-container
    display flex
    flex-wrap wrap

</style>
<script>
import ProductButton from '~/components/regi/ProductButton.vue';
import ProductButtonOther from '~/components/regi/ProductButtonOther.vue';

export default {
  name : 'product-select'
  , props : {
    products : {
      type : Array
      , default : () => []
    }
    , categoryName : {
      type : String
      , required : true
    }
    , update : {
      type : Boolean
      , default : false
    }
    , isOnlyFavorite: {
      type : Boolean
      , default : false
    }
  }
  , components : {
    ProductButton
    , ProductButtonOther
  }
  , data() {
    return {}
  }

  , methods : {
    emitAdd(product) {
      this.$emit('add', product);
    }
    , emitRemove(product) {
      this.$emit('remove', product);
    }
    , emitAddOther(data) {
      this.$emit('addOther', data);
    }
    , emitFavorite(data) {
      this.$emit('favorite', data);
    }
    , removeProductSelect(product) {
      const ps = this.$refs.productButton;
      ps.forEach(el => {
        el.removeSelect(product);
      });
    }
  }
}
</script>


