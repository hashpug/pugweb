<template>
  <div class="dropdown dropdown-text-input"
      :class="{ 'is-active' : does_show_dd }" >
    <div class="dropdown-trigger">
      <input type="text" class="input"
        :value="text"
        @input="inputValue" @focus="onFocus" @blur="onBlur">
    </div>
    <div class="dropdown-menu" role="menu">
      <div class="dropdown-content">
        <template
          v-for="(item, idx) in items">
          <a class="dropdown-item" :key="idx"
            @mousedown="setTextValue(item.value)">
            {{ item.label }}
          </a>
          <hr class="dropdown-divider"
              v-if="item.has_divider" />

        </template>
      </div>
    </div>
  </div> 
</template>
<script>
export default {
  name : 'dropdown-text-input'
  , model : {
    prop : 'text'
    , event: 'change'
  }
  , props : {
    text : {
      type : String
      , default : ''
    }
    , items : {
      type : Array
      , default : () => []
    }
  }
  , data() {
    return {
      does_show_dd : false
    }
  }
  , computed : {
    hasItem() {
      return this.items && this.items.length > 0;
    }
  }
  , methods : {
    emit(val) {
      this.$emit('change', val);
    }
    , inputValue(e) {
      this.emit(e.target.value);
    }
    , onFocus() {
      if (this.hasItem) {
        this.does_show_dd = true;
      }
    }
    , onBlur() {
      this.does_show_dd = false;
    }
    , setTextValue(val) {
      this.emit(val);
    }
  }

}
</script>
<style lang="stylus">
.dropdown-text-input
  .dropdown-menu
    max-height 200px
    overflow scroll
    border 1px solid #eee
    border-radius 5px 
</style>
