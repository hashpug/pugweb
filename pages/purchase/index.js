import Vuex from 'vuex';
import { range, take, takeRight, find } from 'lodash-es';
import moment from 'moment';

import StoreNavBar from '~/components/StoreNavBar.vue';
import Checkbox from '~/components/Checkbox.vue';
import Loading from '~/components/Loading.vue';

export default {
  name : 'page-purchase'
  , components : {
    StoreNavBar
    , Loading
    , Checkbox
  }
  , computed : {
    ...Vuex.mapState({
      purchases : state => state.purchase.purchases
      , page : state => state.purchase.page
      , limit : state => state.purchase.limit
      , totalPage : state => state.purchase.total_page
    })
    , pages() {
      const PAGER_STATIC = '…';
      const ranges = range(1, this.totalPage + 2);
      if (ranges.length < 10) {
        return ranges;
      }
      const disp_page = this.page + 1;
      const isBeside = (x, n, i) => x >= n - i && x <= n + i;
      const right = takeRight(ranges, 2);
      return ranges.map(x => {
        return x <= 2 || x >= right[0]
          || isBeside(x, disp_page, 1)
          || isBeside(x, disp_page, 2)
          ? x 
          : isBeside(x, disp_page, 3) ? PAGER_STATIC : null;
      }).filter(x => x);
      return ranges;
    }
    , hasPagerPrev() {
      return this.totalPage !== 0 && this.page !== 0;
    }
    , hasPagerNext() {
      return this.totalPage !== 0 && this.page !== this.totalPage;
    }
  }
  , data() {
    return {
      is_loading : false
      , years : []
      , months : []
      , days : []
      , year : null
      , month : null
      , day : null
      // TODO: API通ったら消す --ここから
      , ps: [{
          "id": 0,
          "datetime": "2021-09-07T07:41:30.242Z",
          "receipt_number": "string",
          "cashier_name": "string",
          "applied_round_up": true,
          "round_up_price": 0,
          "total_price": 0,
          "note": "string",
          "items": [
            {
              "id": 0,
              "name": "string",
              "quantity": 0,
              "unit": "string",
              "unit_price": 0,
              "applied_coupon": true,
              "coupon_rate": 0,
              "price": 0
            }
          ]
        }]
      // TODO: API通ったら消す --ここまで
    }
  }
  , async mounted() {
    await this.$store.dispatch('user/init');
    await this.$store.dispatch('purchase/init'); 
    const mom = moment();
    this.year = parseInt(mom.format('YYYY'), 10);
    this.years = [this.year - 1, this.year, this.year + 1];
    this.month = parseInt(mom.format('MM'), 10);
    this.months = range(1, 13);
    this.days = range(1, parseInt(mom.endOf('month').format('DD'), 10) + 1);
  }

  , methods:  {
    async goPrevPage() {
      this.is_loading = true;
      await this.$store.dispatch('purchase/find', {
        limit : this.limit, page : this.page + 1
      }); 
      this.is_loading = false;
    }
    , async goNextPage() {
      this.is_loading = true;
      await this.$store.dispatch('purchase/find', {
        limit : this.limit, page : this.page + 1
      }); 
      this.is_loading = false;
    }
    , async goPage(x) {
      this.is_loading = true;
      await this.$store.dispatch('purchase/find', {
        limit : this.limit, page : (x - 1)
      }); 
      this.is_loading = false;
    }
    , isPageActive(x) {
      return this.page === (x - 1);
    }
    , isPageStatic(x) {
      return x === '…';
    }
  }
}
