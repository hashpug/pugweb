import Vue from 'vue';
import * as Validator from 'validatorjs';

const validate = (type, value) => {
  return validation[type](value).passes();
};

const validation = {
  required : (value) => {
    return new Validator({ value }, {
      value : 'required'
    });
  }
  , numeric : (value) => {
    return new Validator({ value }, {
      value : 'numeric'
    });
  }
  , email : (value) => {
    return new Validator({ value }, {
      value : 'required|email'
    });
  }
  , password : (value) => {
    return new Validator({ value }, {
      value: 'required|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]*$/'
    });
  }
  , pin : (value) => {
    return new Validator({ value }, {
      value : 'required|numeric'
    });
  }
  
};

Vue.prototype.$validate = validate;
