import Vuex from 'vuex';

import crypto from 'crypto-js';

import ProductInput from '~/components/store/product-input/index.vue';
import InfoInput from '~/components/store/info-input/index.vue';
import StoreNavbar from '~/components/StoreNavBar.vue';
import BasicInfo from '~/components/store/basic-info/index.vue';
import SimpleConfirm from '~/components/SimpleConfirm.vue';
import { axiosCatch, hasAxiosError, END_POINT } from '~/shared/util.js';
import { storeCatch, hasStoreError } from '~/shared/util.js';
import Loading from '~/components/Loading.vue';

export default {
  name : 'page-store'
  , components : {
    ProductInput
    , InfoInput
    , BasicInfo
    , StoreNavbar
    , SimpleConfirm
    , Loading
  }

  , computed : {
    ...Vuex.mapState({
      all_categories : state => state.store.all_categories
      , categories : state => state.store.categories
      , base : state => {
        if (state.store.store) {
          const { name, zip_code, address, phone_number } = state.store.store;
          return { name, zip_code, address, phone_number };
        } else {
          return null;
        }
      }
      , store : state => state.store.store
    })
  }
  , data() {
    return {
      active : 'store'
      , is_loading : false
      , is_product_ready : false
      , does_show_application_success : false
      , does_show_application_failure : false
      , does_show_first_input : false
      , confirm_base : {}
    }
  }

  , async mounted() {
    await this.$store.dispatch('user/init');
    await this.$store.dispatch('store/init');
    this.is_product_ready = true;
  }


  , methods : {
    async submitData(name, data) {
      const first_input = this.$refs.basicInfo.getData();
      if (first_input) {
        if (!this.validateRegister(first_input)) {
          this.does_show_application_failure = true;;
          return;
        }
        this.confirm_base = first_input;
        this.does_show_first_input = true;
      } else {
        this.is_loading = true;
        await this.update();
        this.is_loading = false;
      }
    }
    , validateRegister(data) {
      return this.$validate('required', data.name)
        && this.$validate('required', data.zip_code)
        && this.$validate('numeric', data.zip_code)
        && this.$validate('required', data.address)
        && this.$validate('required', data.phone_number)
        && this.$validate('numeric', data.phone_number);
    }
    // FIXME: API通らない
    , async register() {
      this.is_loading = true;
      const data = this.confirm_base;
      const result = await this.$store.dispatch('store/create', data).catch(storeCatch);
      if (hasStoreError(result)) {
        this.$alert('店舗情報の初回登録に失敗しました。');
        this.is_loading = false;
        return;
      }
      await this.update();
      this.is_loading = false;
    }

    , async update() {
      const categories = this.$refs.productInput.getData();
      const store = this.$refs.infoInput.getData();
      // 画像ファイルをアップロードする
      const uploadOps = store.images.map(async img => {
        if (img.source) return img;
        if (img._file) {
          const source = await this.uploadImage(img._file);
          delete img._file;
          img.source = source;
        }
        return img;
      });
      // FIXME: 要検討 エラーハンドリング
      await Promise.all(uploadOps);

      const responses = await Promise.all([
        this.$store.dispatch('store/updateCategories', categories)
        , this.$store.dispatch('store/updateStore', store)
      ]).catch(storeCatch);
      const results = responses.filter(res => {
        return hasStoreError(res);
      });
      if (!results.length) {
        this.does_show_application_success = true;
      } else {
        this.$alert('店舗情報の更新に失敗しました。');
      }
    }

    , async uploadImage(file) {
      const image_file = new FormData();
      image_file.append('file', file);
      const source = await this.$store.dispatch('store/uploadImage'
        , image_file);
      return source;
    }
  }

};
