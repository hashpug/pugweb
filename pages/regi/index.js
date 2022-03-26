import Vuex from 'vuex';
import CategorySelect from '~/components/regi/CategorySelect.vue';
import StoreNavBar from '~/components/StoreNavBar.vue';
import TouchPanel from '~/components/regi/TouchPanel.vue';
import Calculator from '~/components/regi/Calculator.vue';
import TabBar from '~/components/regi/TabBar.vue';
import Loading from '~/components/Loading.vue';
import mergeCategories from '~/shared/mergeCategories.js';
import mergeCategoriesAndCoupon from '~/shared/mergeCategoriesAndCoupon.js';
import { cloneByJSON } from '~/shared/util.js';
import { findIndex } from 'lodash-es';

export default {
  name : 'page-regi'
  , components : {
    StoreNavBar
    , CategorySelect
    , TouchPanel
    , Loading
    , Calculator
    , TabBar
  }
  , computed : {
    ...Vuex.mapState({
      categories : state => {
        const cats = cloneByJSON(state.store.favorite_categories)
        const all_cats = cloneByJSON(state.store.all_categories);
        const coupons = cloneByJSON(state.coupons.coupons);
        mergeCategories(all_cats, cats, true);
        coupons.forEach(coupon => {
          mergeCategoriesAndCoupon(coupon, cats);
        });
        return cats;
      }
      , coupons : state => {
        return state.coupons.coupons;
      }
    })
    , doesShowFavorite() {
      return this.tab_active === 'favorite';
    }
  }
  , data() {
    return {
      is_loading : false
      , tab_active : 'all' // all || favorite || howto
      , selected_category : null
      , checked_products : []
      , other_items : []
    }
  }
  , methods : {
    onChangeCategory(category) {
      this.selected_category = category;
      this.$refs.touchPanel.scroll(category.name);
    }
    , onAddProduct(product) {
      this.checked_products.push(product);
    }
    , onAddOtherItem(item) {
      this.other_items.push(item);
    }
    , onRemoveOtherItem(idx) {
      this.other_items.splice(idx, 1);
    }
    , onRemoveProduct(product) {
      const idx = findIndex(this.checked_products, p => {
        return p.id === product.id;
      });
      this.checked_products.splice(idx, 1);
      this.$refs.touchPanel.removeProductSelect(product);
      this.$nextTick(() => {
        this.$refs.calculator.onChangeResult();
      });
    }
    , onScroll() {
      const name = this.$refs.touchPanel.getActiveCategoryName();
      this.$refs.categorySelect.setCategoryName(name);
    }
    , onChangeTab(key) {
      this.tab_active = key;
    }

    , async submit() {
      const receipt = this.$refs.calculator.getReceipts();
      //FIXME: 通らない
      //await this.$store.dispatch('purchase/CREATE', receipt);
    }
  }
  , async mounted() {
    await this.$store.dispatch('user/init');
    await this.$store.dispatch('coupons/init');
    await this.$store.dispatch('store/init');
    await this.$store.dispatch('store/findCashRegister');

    this.$refs.center.addEventListener('scroll', this.onScroll);
  }
  , async destroyed() {
    if (this.$refs.center) {
      this.$refs.center.removeEventListener(this.onScroll);
    }
  }

}
