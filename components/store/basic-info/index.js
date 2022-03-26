export default {
  name : 'basic-info'
  , props : {
    basicInfo : {
      type : Object
      , default : () => { return null; }
    }
  }
  , data() {
    return {
      name: null
      , zip_code: null
      , address: null
      , phone_number: null
    }
  }
  , methods : {
    getData() {
      if (this.basicInfo) { return null; };
      return { name: this.name, zip_code: this.zip_code
        , address: this.address, phone_number: this.phone_number
        , latitude: 0, longitude: 0 };
    }
  }
}
