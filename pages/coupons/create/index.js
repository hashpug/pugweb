import StoreNavBar from '~/components/StoreNavBar.vue';
import Loading from '~/components/Loading.vue';
import CouponPreview from '~/components/store/CouponPreview.vue';
import CouponColorPicker from '~/components/store/CouponColorPicker.vue';
import ImageUpload from '~/components/ImageUpload.vue';
import ProductInput from '~/components/store/product-input/index.vue';
import { storeCatch, hasStoreError, toTwoDigitString, toFourDigitString } from '~/shared/util.js';
import moment from 'moment';

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
      store_name : state => state.store.store_name
      , all_categories : state => state.store.all_categories
    })
  }
  , data() {
    return {
      is_loading : false
      , is_product_ready : false
      , color_number : 0
      , original_image_source : null
      , original_image_file : null
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
    await this.$store.dispatch('store/init');
    if (results.filter(hasStoreError).length) {
      return;
    }
    this.is_product_ready = true;
  }

  , methods : {
    async submit() {
      this.is_loading = true;
      const source = await this.uploadImage(); 
      const data = {
        color_number: this.color_number
        // FIXME: 要検証
        , original_image_source: source
        , start_date: `${this.start_year}-${this.start_month}-${this.start_day}`
        , end_date: `${this.end_year}-${this.end_month}-${this.end_day}`
        , rate: this.rate
        , categories : this.coupon_categories
      };
      // FIXME: （検証できない）API通るとこまで進めず。画像のせい？
      const result = await this.$store.dispatch('coupons/create', data)
          .catch(storeCatch);
      if (!hasStoreError(result)) {
        this.$alert('クーポンの編集に失敗しました。');
        this.is_loading = false;
        return;
      }
      this.is_loading = false;
    }
    , changeImageFile(idx, file) {
      if (!file) {
        this.original_image_source = null;
      } else {
        this.original_image_source = null;
        this.original_image_file = file;
      }
    }

    , uploadImage() {
      if (this.original_image_file) {
        const image_file = new FormData();
        image_file.append('file', file);
        return this.$store.dispatch('store/uploadImage', image_file);
      } else {
        return this.original_image_source;
      }
    }
  }


}
