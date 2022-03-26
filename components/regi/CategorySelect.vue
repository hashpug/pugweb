<template>
  <div class="regi-categories">
    <p class="category-title">カテゴリ</p>

    <div class="field">
      <div class="control has-icons-left">
        <input type="text" class="input is-rounded search-input" v-model="search_word" placeholder="キーワードで探す" />
        <div class="icon is-small is-left"><img src="/images/components/store/product-input/search.png"></div>
      </div>
    </div>


    <div class="category-list" v-for="cat in categories">
      <a class="category" :class="{ 'is-active' : isActive(cat) }" @click="emitCategory(cat)">{{ cat.name }}</a>
    </div>
  </div>
</template>

<style lang="stylus">
@import '../../layouts/variables.styl';

.regi-categories
  .category-title
    margin 15% 0 .5em 10%
    font-size 0.9em
    font-weight bold
  .field
    font-size 16px
    margin-left 10%
    width 80%
    margin-bottom 3em
    .icon
      height 100%
      img
        width 19px
    .search-input
      background-color #fff
      box-shadow 0 2px 4px 0 
  .category-list
    .category
      display block
      font-weight bold
      color $color-grey
      margin 1em 0
      margin-left 15%
      &.is-active
        color $color-primary
        display flex
        align-items center
        &:before
          content ''
          display block
          width 0.5em
          height 1em
          background $color-primary
          border-radius 1em
          margin-left -1em
          margin-right .5em
</style>

<script>
import { head } from 'lodash-es';
export default {
  name : 'categories'
  , props : {
    categories : {
      type : Array
      , default : () => []
    }
  }
  , data() {
    return {
      active_category: 0
      , search_word : null
    }
  }
  , mounted() {
    const cat = head(this.categories);
    if (cat) {
      this.active_category = cat.id;
    }
  }

  , methods : {
    emitCategory(cat) {
      this.active_category = cat.id;
      this.$emit('change', cat);
    }
    , isActive(cat) {
      return this.active_category === cat.id;
    }
    , setCategoryName(name) {
      if (!name) { return; }
      const cat = this.categories.find(cat => {
        return cat.name === name;
      });
      if (cat) {
        this.active_category = cat.id;
      }
    }
    
  }
}
</script>
