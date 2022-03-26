<template>
<div class="markable-text">
  <span v-if="left">{{ left }}</span><span class="marked" v-if="hl">{{ hl }}</span><span v-if="right">{{ right }}</span>
</div>
</template>
<style lang="stylus">
@import '../layouts/variables.styl';
.markable-text
  .marked
    background 'linear-gradient(transparent 38%, %s 0%)' % ($color-secondary)
</style>

<script>
export default {
  name : 'markable-text'
  , props : {
    text : {
      type : String
      , required : true
    }
    , mark: {
      type : String
      , default : ''
    }
  }

  , computed: {
    matches() {
      return this.text.match(new RegExp('(^.*)' + this.mark + '(.*$)'));
    }
    , hl() {
      if (this.matches) {
        return this.mark;
      }
    }
    , left() {
      if (this.matches) {
        const [_, left] = this.matches;
        return left;
      } else {
        return this.text;
      }
    }
    , right() {
      if (this.matches) {
        const [_, __, right] = this.matches;
        return right;
      }
    }
  }

}
</script>
