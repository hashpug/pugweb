<template>

  <div class="calculator-component box">

    <div class="calc-header">
      <div class="header-title">小計</div>

      <div class="staff">
        <div class="staff-label">担当：</div>
        <div class="select">
          <select v-model="cashier_name">
            <option v-for="c in cashiers" :value="c.name">{{ c.name }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="calc-products" v-for="p in products">
      <CalculatorItem :product="p" @change="onChangeResult" @remove="emitRemove" ref="calculatorItem" />
    </div>

    <div class="other-item" v-for="(item, idx) in otherItems">
      <div class="is-flex is-align-items-center is-justify-content-space-between">
        <div class="is-flex is-align-items-center">
          <a class="delete-button" @click="removeOtherItem(idx)">
            <img src="/images/common/icon-times-g.png" />
          </a>
          <div class="name">{{ item.name }}</div>
        </div>
        <div class="price">￥{{ item.price }}</div>
      </div>
    </div>



    <div class="calc-results">
      <div class="calc-toggle-floor">
        <div>金額の切り上げ</div>
        <div><Toggle v-model="is_floor" @change="onChangeResult" /></div>
      </div>
      <div class="calc-floor-price" v-if="is_floor">
        <input type="text" class="input" v-model.number="floor_price" /> 円
      </div>

      <div class="calc-total">
        <div>買取額合計</div>
        <div>
          <span>{{ calcResult }}</span>
          <span>円</span>
        </div>
      </div>
    </div>

  </div>

</template>

<style lang="stylus">
@import '../../layouts/variables.styl';
.calculator-component
  margin 5%
  .calc-header
    display flex
    justify-content space-between
    align-items flex-end
    border-bottom 2px solid $color-grey
    padding-bottom 1em
    font-weight bold
    .header-title
      font-size 1.2em
      color #000
    .staff
      display flex
      align-items center
      .staff-label
        font-size 1.1em
      .select
        width 6em
  .calc-results
    margin 1em 0
    padding 1em 0
    border-top 2px solid $color-grey
    .calc-toggle-floor, .calc-total, .calc-floor-price
      display flex
      align-items center
      justify-content space-between
      padding 1em 0
    .calc-floor-price
      justify-content flex-end
      padding-top 0
      .input
        width 4em
        padding 5px
  .other-item
    padding 4% 7% 4% 2%
    .delete-button
      width 1.5em
      height 1.5em
      margin-right 1em
    .name, .price
      font-size 1.1em
      font-weight bold
</style>

<script>
import Vuex from 'vuex'
import Toggle from '~/components/Toggle.vue';
import CalculatorItem from '~/components/regi/CalculatorItem.vue';
import { sumBy, takeRight } from 'lodash-es';

export default {
  name : 'calculator'
  , components : {
    Toggle
    , CalculatorItem
  }
  , props : {
    products : {
      type : Array
      , required : true
    }
    , otherItems: {
      type : Array
      , default : () => []
    }
  }
  , data() {
    return {
      total : 0
      , is_floor : false
      , floor_price : 0
      , calc_result : null
      , cashier_name : null
    }
  }
  , watch: {
    otherItems() {
      this.onChangeResult();
    }
  }
  , computed : {
    ...Vuex.mapState({
      cashiers : state => state.store.cashiers
      , advertising_content : state => state.store.advertising_content
    })
    , calcResult() {
      if (this.is_floor) {
        return this.calc_result + this.floor_price;
      } else {
        return this.calc_result;
      }
    }
  }
  , methods: {
    emitRemove($event) {
      this.$emit('remove', $event);
    }
    , removeOtherItem(idx) {
      this.$emit('removeOther', idx);
    }
    , onChangeResult() {
      this.calc_result = 0;
      this.floor_price = 0;
      const els = this.$refs.calculatorItem;
      let price = sumBy(els, el => {
        return el.getSubtotal();
      });
      price += sumBy(this.otherItems, i => {
        return i.price;
      });
      if (price) {
        const floor_count = price >= 10000 ? 1000 : price >= 1000 ? 100 : price >= 100 ? 10 : 0;
        if (!floor_count) {
          this.floor_price = 0;
        } else {
          this.floor_price = ((Math.floor(price / floor_count) + 1) * floor_count) - price;
        }
        this.calc_result = price;
      }
    }

    , getReceipts() {
      const items = this.$refs.calculatorItem.map(el => {
        return el.getData();
      }).filter(item => {
        return item.quantity;
      }).concat(this.otherItems);
      return {
        datetime : new Date().toISOString()
        , cashier_name : this.cashier_name
        , applied_round_up : !!this.floor_price
        , round_up_price : this.floor_price || undefined
        , note : this.advertising_content
        , items
      };
    }
  }
}
</script>
