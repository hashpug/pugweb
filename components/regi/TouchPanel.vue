<template>
  <div class="touch-panel">
    <template v-for="cat in categories">
      <p class="category-name" ref="categoryName">{{ cat.name }}</p>
      <ProductSelect
        :products="categoryProducts(cat)"
        :update="update"
        :categoryName="cat.name"
        :isOnlyFavorite="isOnlyFavorite"
        @add="addProduct"
        @addOther="addOther"
        @remove="removeProduct"
        @favorite="emitFavorite"
        ref="productSelect" ></ProductSelect>
    </template>
  </div>
</template>
<style lang="stylus">
@import '../../layouts/variables.styl';

.touch-panel
  font-weight bold
  padding 3em 8% 8% 8%
  border-right 2px solid #fff
  .category-name
    color $text-color-base
    font-size 1.1em
    &:not(:first-child)
      margin-top 3em
</style>
<script>
import ProductSelect from '~/components/regi/ProductSelect.vue';
import { flatten } from 'lodash-es';
export default {
  name : 'touch-panel'
  , components : {
    ProductSelect
  }
  , props : {
    categories : {
      type : Array
      , default : () => []
    }
    , update : {
      type : Boolean
      , default : false
    }
    , isOnlyFavorite : {
      type : Boolean
      , default : false
    }
  }
  , methods : {
    categoryProducts(category) {
      const subs = category.subcategories;
      return subs;
    }

    , addProduct($event) {
      this.$emit('add', $event);
    }
    , addOther($event) {
      this.$emit('addOther', $event);
    }
    , removeProduct($event) {
      this.$emit('remove', $event);
    }
    , removeProductSelect(product) {
      const ps = this.$refs.productSelect;
      ps.forEach(ref => {
        ref.removeProductSelect(product);
      });
    }
    , emitFavorite(product) {
      this.$emit('favorite', product);
    }

    , async scroll(name) {
      this.is_scrolling = true;
      const target = this.$refs.categoryName.find(el => {
        return el.textContent === name;
      });
      if (target) {
        await this.scrollIntoViewPromise(target);
      }
      this.is_scrolling = false;
    }
    , getActiveCategoryName() {
      if (this.is_scrolling) {
        return '';
      }
      const names = this.$refs.categoryName.filter(el => {
        return this.doesInViewport(el);
      });
      return names[0] ? names[0].textContent : '';
    }
    , doesInViewport(element) {
      const bounding = element.getBoundingClientRect();
      return (bounding.top >= 0 && bounding.left >= 0
          && bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
          && bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight));
    }

    , scrollIntoViewPromise(element) {
      return new Promise((resolve, reject) => {
        element.scrollIntoView({ behavior: 'smooth'
            , block: 'start', inline: 'nearest' });
        const intersectionObserver = new IntersectionObserver((entries) => {
          const [entry] = entries;
          if (entry.isIntersecting) {
            intersectionObserver.unobserve(element)
            setTimeout(() => {
              resolve();
            }, 300);
          }
        });
        intersectionObserver.observe(element);
      });
    }
  }
  , data() {
    return {
    }
  }
}
</script>
