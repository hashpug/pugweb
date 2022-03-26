<template>
<div class="notice-component card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img :src="image_url" :alt="title">
    </figure>
  </div>
  <div class="card-content has-text-weight-bold">
    <div class="date">{{ date_string }}</div>
    <div class="content is-size-4">
      {{ title }}
    </div>
  </div>
</div>
</template>
 
<script>
export default {
  name: 'notice'
  , props : {
    to : {
      type : String
      , require : true
    }
    , image_url : {
      type : String
      , require : true
    }
    , date_string : {
      type:  String
      , require : true
    }
    , title : {
      type : String 
      , require : true
    }
  }
}
</script>

<style lang="stylus">
.notice-component
  max-width 400px
  margin auto
  &.card
    box-shadow none
    border-radius 0
    background-color transparent
    .card-image
      border 0 solid
      border-radius 10px
      overflow hidden
      img
        border-radius 0
    .card-content
      padding 0
      .date
        color #ccc
        
</style>
