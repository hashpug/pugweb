<template>
  <div class="receipt-component"
    :class="{ 'is-preview' : showPreviewMode, 'is-downloading' : is_downloading }"
    ref="receiptComponent">
    <div class="receipt-preheader" v-if="receiptCount">
       <span>{{ receiptCount }}</span>
    </div>
    <div class="receipt-header">
      <p>{{ division }}</p>
      <div class="receipt-header-info">
        <div class="info-line">
          <span class="info-label">発行日</span>
          <span>{{ dateString }}</span>
        </div>
        <div class="info-line">
          <span class="info-label">レシートNo</span>
          <span>{{ receiptNumber }}</span>
        </div>
      </div>
    </div>
    <div class="receipt-info">
      <div class="receipt-form" v-if="mode === 'store'">
        <div class="line name">氏名：</div>
        <div class="line">
          <p class="ruby"><span>〒</span><span>-</span></p>
          <p>住所：</p>
        </div>
        <div class="line has-margin"></div>
        <div class="line birth">生年月日：<div><span>年</span><span>月</span><span>日</span></div></div>
      </div>
      <div class="receipt-comment" v-else>
        <p class="receipt-comment-content">{{ advertisingContent }}</p>
      </div>
      <div class="receipt-campany">
        <p class="line campany-name">株式会社xxxxxx</p>
        <p class="line">〒000-0000</p>
        <p class="line">東京都千代田区千代田1-1-1</p>
        <p class="line">TEL: 00-0000-0000</p>
        <p class="line">担当: {{ cashierName }}</p>
      </div>
    </div>
    <div class="receipt-content">
      <div class="total">
        <span>合計金額</span>
        <span class="price">¥{{ subtotal }} −</span>
      </div>
      <div>
        <div class="detail-header">
          <div class="category">品目</div>
          <div class="quantity">数量</div>
          <div class="unit-price">単価</div>
          <div class="discount">割引/割増</div>
          <div class="price">金額</div>
        </div>
        <div class="detail-row" v-for="item in allItems">
          <div class="category"
            :class="{ 'has-text-right' : item.is_round_up }">{{ item.name }}</div>
          <div class="quantity"><span class="count">{{ item.quantity }}</span><span class="dimension">{{ item.unit }}</span></div>
          <div class="unit-price">{{ item.unit_price }}</div>
          <div class="discount">{{ discountPrice(item) }}</div>
          <div class="price">{{ item.price }}</div> 
        </div>
        <div class="detail-row is-end">
          <div class="subtotal">合計</div>
          <div class="price">{{ subtotal }}</div> 
        </div>
      </div>
    </div>
    <div class="receipt-note">
      <p class="receipt-note-title">備考</p>
      <div class="receipt-note-content">{{ note }}</div>
    </div>
    <div class="receipt-footer">
      <img src="/images/common/logo-b.png" />
      <span>copyright risapennavi all rights reserved</span>
    </div>
  </div>
</template>
<style lang="stylus">
.receipt-component
  //width 827px
  //height 1169px 
  //padding 100px 100px 40px 100px
  position relative
  background #fff
  color #000
  border 1px solid
  font-size 16px
  width 51.6875em
  height 73.0625em
  padding 6.25em 6.25em 2.5em 6.25em
  &.is-preview
    font-size 9px
  .receipt-preheader
    top 3.125em
    right 3.125em
    width 100%
    text-align right
    position absolute
  .receipt-header
    display flex
    align-items flex-start
    justify-content space-between
    margin-bottom 2.5em
    .receipt-header-info
      width 35%
      .info-line
        display flex
        justify-content space-between
        .info-label
          margin-right 1em
        .info-receipt-num
          display flex
          justify-content space-between
  .receipt-info
    display flex
    justify-content space-between
    margin-bottom 3.75em
    .receipt-form, .receipt-campany
      overflow hidden
      .line
        min-height 1em
        line-height 1.1em
        width 100%
    .receipt-form, .receipt-comment
      width 50%
      font-weight bold
      .line
        border-bottom 1px solid #000
        margin-bottom 1.5em
        .ruby
          font-size 0.8em 
          text-align center
          font-weight normal
          span
            vertical-align super
            margin-right 4em 
        &.name
          margin-bottom 0em
          width 80%
        &.birth
          display flex
          justify-content space-between
          span
            font-size 0.7em
            margin-left 4em
            font-weight normal
        &.has-margin
          margin-left 1em
    .receipt-comment
      overflow hidden
      max-height 9.0625em
      text-overflow ellipsis
      .receipt-comment-content
        white-space pre-wrap

    .receipt-campany
      width 35%
      .line
        line-height 1.8em
      .campany-name
        font-weight bold
        margin-bottom 0.5em
  .receipt-content
    font-weight bold
    .total
      border-bottom 0.25em double #000
      display flex
      justify-content space-between
      align-items flex-end
      width 50%
      margin-bottom 1.25em
      .price
        font-size 1.5em
        margin-right 1em
    .detail-header
      background #eee
    .detail-row
      font-weight normal
      &:last-child
        border-bottom 1px solid
      .category
        padding 0 1em
      .category.is-note
        text-align right
      .quantity
        display flex
        align-items center
        justify-content space-between
        padding 0 1em
    .detail-header, .detail-row
      display flex
      > div
        line-height 1.875em
        min-height 1.875em
        width 12.5%
        text-align center
        border-top 1px solid
        border-left 1px solid
        &:last-child
          border-right 1px solid
        &.subtotal
          width 82.5%
        &.price
          width 17.5%
        &.category
          width 45%
  .receipt-note
    margin-top 1.875px
    .receipt-note-title
      font-weight bold
    .receipt-note-content
      width 100%
      height 6.25em
      padding 0.625em
      border 1px solid
      white-space pre-wrap
      overflow hidden
  .receipt-footer
    margin-top 3.125em
    display flex
    justify-content space-between
    img
      width 20%

</style>

<script>
import Vuex from 'vuex';
import moment from 'moment';
import { sumBy, reduce } from 'lodash-es';
import JSPDF from 'jspdf';
import html2canvas from 'html2canvas';

const getOffset = (el) => {
  const rect = el.getBoundingClientRect();
  return {
    left : rect.left + window.scrollX
    , top : rect.top + window.scrollY
  };
};

export default {
  name : 'purchase-receipt'
  , props : {
    mode : {
      type : String
      , default : 'user'
    }
    , isPreview: {
      type: Boolean
      , default : false
    }
    , receiptCount : {
      type : String
      , required : false
    }
    , receiptNumber : {
      type : String
      , required : true
    }
    , items : {
      type : Array
      , required : true
      , default : () => []
    }
    , dateString: {
      type : String
      , required : true
    }
    , cashierName: {
      type : String
      , required : true
    }
    , roundUpPrice: {
      type : Number
      , default : 0
    }
    , note : {
      type : String
      , required : true
    }
    , advertisingContent: {
      type : String
      , default : ''
    }
  }
  , computed : {
    allItems() {
      return this.items.reduce((acc, item, idx) => {
        acc[idx] = item;
        return acc;
      }, [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
    }
    , showPreviewMode() {
      return this.isPreview && !this.is_downloading;
    }
    , division() {
      return this.mode === 'store' ? '店舗保管用' : 'お客様控え'
    }
    , subtotal() {
      return sumBy(this.items, i => {
        return i.price;
      });
    }
  }
  , data() {
    return {
      is_downloading : false
    }
  }

  , methods : {
    discountPrice(item) {
      const result = item.price - (item.unit_price * item.quantity);
      return !isNaN(result) && result ? result : '';
    }
    , async download() {
      this.is_downloading = true;
      const element = this.$refs.receiptComponent;
      await new Promise((resolve) => {
        this.$nextTick(() => { resolve(); });
      });
      const canvas = await html2canvas(element);
      const doc = new JSPDF({
        orientation : 'p'
        , unit : 'px'
        , format : 'a4'
      });
      const width = doc.internal.pageSize.getWidth();
      const height = doc.internal.pageSize.getHeight();
      doc.addImage(canvas, 'JPEG', 0, 0, width, height);

      const filename = this.receiptNumber;
      doc.save(filename + '.pdf');

      this.is_downloading = false;
    }
  }

};
</script>
