<template>
  <div class="columns">
    <div class="column is-7">
      <div class="product-input-category">
        <Checkbox :checked="category.available" @change="changeAvailable" />
        <a class="category-name" @click="toggleDisp">
          <div class="name">
            <MarkableText :text="category.name" :mark="search"/>
            </div>
          <div class="icon-after">
            <img src="/images/components/store/product-input/arrow-up.png"
              v-show="open" />
            <img src="/images/components/store/product-input/arrow-down.png"
              v-show="!open"/>
          </div>
        </a>
      </div> 
    </div>
  </div>
</template>
<style lang="stylus">
.product-input-category
  display inline-flex
  align-items center
  justify-content flex-start
  border-bottom 1px solid
  .category-name
    display flex
    color inherit
    align-items center
    justify-content flex-start
    .name
      margin 0 1em
    .icon-after
      width 1em
      height 1em
</style>
<script>
import Checkbox from '~/components/Checkbox.vue';
import MarkableText from '~/components/MarkableText.vue';

export default {
  name : 'product-input-category'
  , props : {
    category : {
      type: Object
      , required : true
    }
    , open : {
      type : Boolean
      , default : false
    }
    , checkOnly : {
      type: Boolean
      , default : false
    }
    , search: {
      type : String
      , default : () => ''
    }
  }
  , components : {
    Checkbox
    , MarkableText
  }
  , watch: {
    search() {
      const cat = this.category;
      if (!cat) { return; }
      const match = cat.name && cat.name.match(this.search);
      if (match) {
        this.$emit('hit', !!match);
      }
    }
  }
  
  , methods : {
    changeAvailable() {
      this.$emit('change', {
        available : !this.category.available
      });
    }
    , toggleDisp() {
      this.$emit('toggle', this.category);
    }
  }
}

</script>
