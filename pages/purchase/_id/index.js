import Vuex from 'vuex';
import { range, takeWhile } from 'lodash-es';
import moment from 'moment';

import StoreNavBar from '~/components/StoreNavBar.vue';
import Checkbox from '~/components/Checkbox.vue';
import Loading from '~/components/Loading.vue'; 
import Receipt from '~/components/purchase/Receipt.vue';
import { cloneByJSON } from '~/shared/util.js';

export default {
  name : 'page-purchase'
  , components : {
    StoreNavBar
    , Loading
    , Checkbox
    , Receipt
  }
  , computed : {
    ...Vuex.mapState({
      // FIXME: 散布データ無し、登録も不可
      //purchase : state => state.purchase.purchase
    })
    , partialItems() {
      let items = cloneByJSON(this.purchase.items);
      if (this.purchase.round_up_price) {
        items.push({
          name : '繰り上げ分'
          , is_round_up : true
          , price : this.purchase.round_up_price
        });
      }
      const page_count = Math.ceil(items.length / 12);
      if (page_count === 1) {
        return [{ pageCount : null, items }];
      }
      return range(0, page_count).map(i => {
        return {
          pageCount: (i + 1) + '/' + page_count
          , items : items.reduce((acc, item, idx) => {
            const max = 11 + (12 * i);
            const min = 0 + (12 * i);
            if(idx >= min && idx <= max) {
              acc.push(item);
            }
            return acc;
          }, [])
        }
      });
    }
  }
  , data() {
    return {
      is_loading : false
      , is_loading_dark : false
      , is_modal_active : false
      , has_agreement : false
      , advertisingContent : 'ああああああ\nあああああああ\nああああああああ'

      // FIXME: データ来次第消去
      , purchase : {
        datetime: "2021-09-07T07:47:10.498Z"
        , dateString : '2020年01月01日'
        , receipt_number: '2021010101'
        , cashier_name: "string"
        , round_up_price: 5
        , note: '明日から出禁です'
        , items : [{
          name: 'エアコン'
          , quantity: 5
          , unit: '台'
          , unit_price: 600
          , applied_coupon: true
          , coupon_rate: 5
          , price: 2900
        }, {
          name: '銅'
          , quantity: 3
          , unit: 'kg'
          , unit_price: 300
          , applied_coupon: false
          , coupon_rate: 0
          , price: 900
        }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        , { name: '銅' , quantity: 3 , unit: 'kg' , unit_price: 300 , applied_coupon: false , coupon_rate: 0 , price: 900 }
        ]
      }
    };
  }

  , async mounted() {
    await this.$store.dispatch('user/init');
    /* FIXME: 取得通らない（データが無いから？）
    const _id = this.$route.params.id;
    await this.$store.dispatch('purchase/findOne', { id });
    */
  }

  , methods : {
    async downloadUserPDF(idx) {
      this.is_loading_dark = true;
      await this.$refs.userReceipts[idx].download();
      this.is_loading_dark = false;
    }
    , async downloadStorePDF(idx) {
      this.is_loading_dark = true;
      await this.$refs.storeReceipts[idx].download();
      this.is_loading_dark = false;
    }
    , openDeleteModal() {
      this.is_modal_active = true;
    }
    , goBackPage() {
      window.history.back();
    }
  }
}
