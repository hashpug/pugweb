import TabBar from '~/components/TabBar.vue';
import NavBar from '~/components/NavBar.vue';
import TrialBar from '~/components/TrialBar.vue';
import FooterBar from '~/components/FooterBar.vue';
import Notice from '~/components/Notice.vue';
import Checkbox from '~/components/Checkbox.vue';

export default {
  name : 'page-top'
  , components : {
    TabBar
    , NavBar
    , TrialBar
    , FooterBar
    , Notice
    , Checkbox
  }
  , async mounted() {
    await this.$store.dispatch('user/init');
  }
  , data() {
    return {
      tab_items: [
        { label : 'リサぺんナビとは？', to: '/', key: 'what' }
        , { label : '仕組み', to: '/', key: 'structure' }
        , { label : '特徴', to: '/', key: 'feature' }
        , { label : '買取店舗さまへ', to: '/', key: 'shop' }
        , { label : 'キャンペーン', to: '/', key: 'campaign' }
        , { label : 'お知らせ', to: '/', key: 'notice' }
      ]
      , active_key : 'what'

      , news : [
        {
          title : 'リサぺんナビのリリースが開始予定です'
          , date_string : '2021-07下旬'
          , to : '#'
          , image_url : '/images/top/movie.png'
        }
      ]
    }
  }

}
