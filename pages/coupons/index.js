import StoreNavBar from '~/components/StoreNavBar.vue';
import Loading from '~/components/Loading.vue';
import CouponPreview from '~/components/store/CouponPreview.vue';

export default {
  name : 'page-coupons'
  , components: {
    StoreNavBar, Loading
    , CouponPreview
  }

  , data() {
    // FIXME: サンプルデータ無し（登録APIも通りません）
    return {
      is_loading : false
      , store_name : 'ABCリサイクル'
      , coupons : [
      {
        start_date : '2020/01/01'
        , content : 'PC関連製品買取価格5%UP😄'
        , end_date : '2022/01/01'
        , color_number : 0
        , id : 0
      }, {
        start_date : '2020/01/01'
        , content : 'PC関連製品買取価格5%UP😄'
        , end_date : '2022/01/01'
        , color_number : 2
        , id : 1
      }
      ]
    }
  }

  , mounted() {
    /*
    await this.$store.dispatch('user/init');
    await this.$store.dispatch('coupons/init');
    */ 
  }
}
