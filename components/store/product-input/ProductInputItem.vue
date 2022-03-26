<template>
  <div class="columns product-input-item">
    <div class="column is-7">
      <div class="name-wrapper" :class="{ 'ml-6' : detailed, 'ml-4' : !detailed }">
        <div class="name-label">
          <Checkbox :checked="__available" @change="emitChangeAvailable($event)" />
          <div class="name" v-if="!detailed">
            <MarkableText :text="name" :mark="search"/>
          </div>
          <div class="name-input" v-if="detailed">
            <input type="text" class="input transparent" v-model="__name" @change="emitChange"/>
          </div>
          <a class="icon-after" @click="emitAdd" v-if="!detailed && !checkOnly">
            <img src="/images/components/store/plus.png" />
          </a>
        </div>
        <a class="name-after is-size-7" v-if="!detailed && !checkOnly" @click="emitAdd">
          <p>さらに細かく分類する</p>
        </a>
      </div>
    </div>

    <div class="column is-5">
      <div class="price">
        <div class="price-input" v-if="!checkOnly" :class="{ 'ml-6' : detailed}">
          <input type="number" class="input" v-model="__unit_price" @change="emitChange" />
        </div>
        <div class="price-input" v-else>
          {{ __unit_price }}
        </div>

        <div class="price-label">
          円/{{ unit }}
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="stylus">
.product-input-item
  .name-wrapper
    display flex
    align-items center
    justify-content flex-start
    .name-label
      display inline-flex
      align-items center
      justify-content flex-start
      border-bottom 1px solid
      .name
        margin 0 1em
      .name-input
        width 6em
        margin 0 1em
      .icon-after
        width 1em
        height 1em
    .name-after
      color inherit
  .price
    display flex
    .price-input
      margin 0 1em
      .input
        width 6em

</style>
<script>
import Checkbox from '~/components/Checkbox.vue';
import MarkableText from '~/components/MarkableText.vue';

export default {
  name : 'product-input-item'
  , components : {
    Checkbox
    , MarkableText
  }
  , props : {
    available : {
      type : Boolean
      , default : () => false
    }
    , unit_price : {
      type : String
      , default : () => '0'
    }
    , unit : {
      type : String
      , default : () => 'kg'
    }
    , name : {
      type : String
      , default : () => ''
    }
    , detailed : {
      type : Boolean
      , default : false
    }
    , checkOnly : {
      type: Boolean
      , default : false
    }
    , search: {
      type : String
      , default : () => ''
    }
  }
  , data() {
    return {
      __unit_price : '0'
      , __name : ''
      , __available : false
    }
  }
  , created() {
    this.__unit_price = this.unit_price;
    this.__name = this.name;
    this.__available = !!this.available;
  }
  , watch: {
    unit_price(ov, nv) {
      this.__unit_price = nv;
    }
    , name(ov, nv) {
      this.__name = nv;
    }
    , price(ov, nv) {
      this.__price = nv;
    }
    , search(ov, nv) {
      console.log('searched');
      const match = this.__name && this.__name.match(this.search);
      if (match) {
        this.$emit('hit', !!match);
      }
    }
  }
  , methods : {
    emitAdd() {
      this.$emit('addDetail');
    }
    , emitChange() {
      this.$emit('change', {
        unit_price : this.__unit_price
        , name : this.__name
        , available : this.__available
      });
    }
    , emitChangeAvailable(val) {
      this.$emit('change', {
        unit_price : this.__unit_price
        , name : this.__name
        , available : val
      });
    }
  }
}
</script>
