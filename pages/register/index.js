import TabBar from '~/components/TabBar.vue';
import NavBar from '~/components/NavBar.vue';
import TrialBar from '~/components/TrialBar.vue';
import FooterBar from '~/components/FooterBar.vue';
import Notice from '~/components/Notice.vue';
import Checkbox from '~/components/Checkbox.vue';
import Loading from '~/components/Loading.vue';

import { loadStripe } from '@stripe/stripe-js';
import { hasStoreError, storeCatch, axiosCatch, hasAxiosError } from '~/shared/util.js';

export default {
  name : 'page-top'
  , components : {
    TabBar
    , NavBar
    , TrialBar
    , FooterBar
    , Notice
    , Checkbox
    , Loading
  }
  , data() {
    return {
      tab_items: [
        { label : '掲載のメリット', to: '/', key: 'what' }
        , { label : '掲載の流れ', to: '/', key: 'structure' }
        , { label : '掲載登録する', to: '/', key: 'feature' }
      ]
      , active_key : 'what'

      // 以下モデル
      , email : null
      , email_conf : null
      , password : null
      , password_conf : null
      , pin : null
      , invite_code : null

      // 
      , has_agreement: false

      // stripe
      , stripe_elements : {
        stripe : null
        , card_number: null
        , card_expiry : null
        , card_cvc : null
      }

      // other
      , is_loading : false
      , submitted : false
    }
  }
  , async mounted() {
    // FIXME: public keyのハードコード
    const stripe = await loadStripe('pk_test_51Hs4cOE1spxKL698IpK1TOJtDaH0kEej0ucw5TZx8oaek5hAQYcYHjrDqcLfilb0VSGUCPaT0eJRkoave4cLNCl900Kjvf0vPs');
    this.stripe_elements.stripe = stripe;
    const elems = stripe.elements({
     fonts: [{ cssSrc: 'https://fonts.googleapis.com/css?family=Roboto' }]
      , locale: 'auto'
    });
    const style = {
      style : {
        base : {
          fontSize : '16px'
          , lineHeight : '2em'
          , padding: '0 0 0 .5em'
          , color : '#807f7e'
          , '::placeholder': {
            color: '#ddd'
          }
        }
      }
    };
    const card_number = elems.create('cardNumber', style);
    card_number.mount('#card-number');
    this.stripe_elements.card_number = card_number;
    const card_expiry = elems.create('cardExpiry', style);
    card_expiry.mount('#card-expiry');
    this.stripe_elements.card_expiry = card_expiry;
    const card_cvc = elems.create('cardCvc', style);
    card_cvc.mount('#card-cvc');
    this.stripe_elements.card_cvc = card_expiry;
  }
  , computed : {
    emailError() {
      return this.submitted ? !this.$validate('email', this.email) : false
    }
    , emailConfError() {
      return this.submitted ? !(this.$validate('email', this.email_conf)
        && this.isSameInput(this.email, this.email_conf)) : false
    }
    , passwordError() {
      return this.submitted ? !this.$validate('password', this.password) : false
    }
    , passwordConfError() {
      return this.submitted ? !(this.$validate('password', this.password_conf)
        && this.isSameInput(this.password, this.password_conf)) : false
    }
    , pinError() {
      return this.submitted ? !this.$validate('pin', this.pin) : false
    }
  }

  , methods : {
    inputValid() {
      this.submitted = true;
      return !this.emailError && !this.emailConfError && !this.passwordError && !this.passwordConfError && !this.pinError;
    }
    , isSameInput(x, y) {
      return x === y;
    }
    , async createCardToken() {
      const tok = await this.stripe_elements.stripe.createToken(this.stripe_elements.card_number).catch(e => { return null; });
      return tok && tok.token ? tok.token.id : null;
    }
    , async subscribeStripe(card_token) { 
      const response = await this.$axios.post('/server/create_subscription', {
        email: this.email, card_token
      }).catch(axiosCatch);
      return !hasAxiosError(response) ? response.data : null;
    }
    , async operateStripe() {
      const token = await this.createCardToken();
      if (!token) {
        this.$alert('カード情報の取得に失敗しました。');
        return;
      }
      const data = await this.subscribeStripe(token);
      if (!data) {
        this.$alert('決済情報の作成に失敗しました。');
        return;
      } 
      return { customer_id : data.customer_id, card_token: token };
    }
    , async register() {
      if (!this.inputValid()) {
        this.$alert('入力エラーがあります。');
        return;
      }
      if (!this.has_agreement) {
        this.$alert('利用規約に同意してください');
        return;
      }
      this.is_loading = true;
      const result = await this.operateStripe();
      if (result) {
        const response = await this.$store.dispatch('user/register', {
          email : this.email
          , password : this.password
          , pin : this.pin
          , stripe_id : result.customer_id
          , stripe_token : result.card_token
          , invite_code : this.invite_code ? this.invite_code : undefined
        }).catch(storeCatch);
        if (hasStoreError(response)) {
          this.$alert('サーバーとの通信に失敗しました。');
        } else {
          this.login();
        }
      }
      this.is_loading = false;
    }

    , async login() {
      const result = this.$store.dispatch('user/login', {
        email: this.email
        , password : this.password
      }).catch(storeCatch);
      if (hasStoreError(result)) {
        await this.$alert('初回ログインに失敗しました。');
        this.$router.push('/');
      } else {
        this.$router.push('/regi');
      }
    }
  }
} 
