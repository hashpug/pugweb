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
  name : 'page-regi-update'
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
      , advertising_content : 'ご利用いただきありがとうございます。\nまたのお越しをお待ちしております。'
      , cashiers : []
    }
  }
  , methods : {
    onChangeCategory(category) {
      this.selected_category = category;
      this.$refs.touchPanel.scroll(category.name);
    }
    , onScroll() {
      const name = this.$refs.touchPanel.getActiveCategoryName();
      this.$refs.categorySelect.setCategoryName(name);
    }
    , onChangeTab(key) {
      this.tab_active = key;
    }
    , setFavorite(product) {
      product.favorite = !product.favorite;
    }
    , addCashier() {
      this.cashiers.push({ name : '' });
    }
    , async submit() {
      this.cashiers = this.cashiers.filter(c => c.name);
      /* FIXME: API 通す
      await this.$store.dispatch('store/updateRegi', {
        advertising_content : this.advertising_content
        , cashiers : this.casiers
        , categories : this.categories
      });
      */
    }
  }
  , async mounted() {
    await this.$store.dispatch('user/init');
    await this.$store.dispatch('coupons/init');
    await this.$store.dispatch('store/init');
    await this.$store.dispatch('store/findCashRegister');

    this.cashiers = cloneByJSON(this.$store.state.store.cashiers);
    this.advertising_content = this.$store.state.store.advertising_content;

    this.$refs.center.addEventListener('scroll', this.onScroll);
  }
  , async destroyed() {
    if (this.$refs.center) {
      this.$refs.center.removeEventListener(this.onScroll);
    }
  }

} 
