import StoreNavBar from '~/components/StoreNavBar.vue';
import Loading from '~/components/Loading.vue';
import CouponPreview from '~/components/store/CouponPreview.vue';
import CouponColorPicker from '~/components/store/CouponColorPicker.vue';
import ImageUpload from '~/components/ImageUpload.vue';
import ProductInput from '~/components/store/product-input/index.vue';
import { storeCatch, hasStoreError, toTwoDigitString, toFourDigitString } from '~/shared/util.js';
import moment from 'moment';
import { cloneDeep } from 'lodash-es';

export default {
  name : 'page-coupons-update'
  , components: {
    StoreNavBar, Loading
    , CouponPreview
    , CouponColorPicker
    , ImageUpload
    , ProductInput
  }
  , computed : {
    simulated() {
      const data = Math.round(this.yen * (1 + (this.rate / 100)));
      return !isNaN(data) ? data + '円' : '';
    }
    , endDate() {
      return toFourDigitString(this.end_year) + '/' + toTwoDigitString(this.end_month) + '/' + toTwoDigitString(this.end_day);
    }
    , ...Vuex.mapState({
      coupon_base : state => state.coupons.coupon
      , store_name : state => state.store.store_name
      , all_categories : state => state.store.all_categories
    })
  }
  , data() {
    return {
      is_loading : false
      , is_product_ready : false
      , color_number : 0
      , content: null
      , start_year: null
      , start_month: null
      , start_day: null
      , end_year: null
      , end_month: null
      , end_day: null 
      , yen: 0

      , coupon_categories: []
    }
  }

  , async created() {
    await this.$store.dispatch('user/init');
    const results = await Promise.all([
      this.$store.dispatch('coupons/findOne', { id : this.$route.params.id })
      , this.$store.dispatch('store/init')
    ]).catch(storeCatch);
    if (results.filter(hasStoreError).length) {
      return;
    }
    const clone = (x) => JSON.parse(JSON.stringify(x));

    this.coupon_categories = clone(this.coupon.categories);
    this.color_number = clone(this.coupon.color_number);
    this.content = clone(this.coupon.content);
    this.rate = clone(this.coupon.rate);
    const start = moment(this.coupon.start_date);
    const end = moment(this.coupon.end_date);
    this.start_year = start.format('YYYY');
    this.start_month = start.format('MM');
    this.start_day = start.format('DD');
    this.end_year = end.format('YYYY');
    this.end_month = end.format('MM');
    this.end_day = end.format('DD');

    this.is_product_ready = true;
  }

  , methods : {
    async submit() {
      this.is_loading = true;
      const data = {
        id : this.$route.params.id
        , color_number: this.color_number
        // FIXME: UI不明、API不明
        , original_image_source: ''
        , start_date: `${this.start_year}-${this.start_month}-${this.start_day}`
        , end_date: `${this.end_year}-${this.end_month}-${this.end_day}`
        , rate: this.rate
        , categories : this.coupon_categories
      };
      // FIXME: （検証できない）API通るとこまで進めず
      const result = await this.$store.dispatch('coupons/update', data).catch(storeCatch);
      if (!hasStoreError(result)) {
        this.$alert('クーポンの編集に失敗しました。');
        this.is_loading = false;
        return;
      }
      this.is_loading = false;
    }
  }


}
