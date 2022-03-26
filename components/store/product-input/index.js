import ProductInputCategory from './ProductInputCategory.vue';
import ProductInputItem from './ProductInputItem.vue';
import SimpleConfirm from '~/components/SimpleConfirm.vue';
import Loading from '~/components/Loading.vue';
import { clone, find, reduce, fill } from 'lodash-es';
import { storeCatch, hasStoreError } from '~/shared/util.js';

import mergeCategories from '~/shared/mergeCategories.js';

export default {
  name : 'product-input'
  , components : {
    ProductInputItem
    , ProductInputCategory
    , SimpleConfirm
    , Loading
  }
  , props : {
    all_categories : {
      type : Array
      , required : true
    }
    , categories : {
      type : Array
      , required : true 
    }
    , checkOnly : {
      type: Boolean
      , default : false
    }
  }
  , data() {
    return {
      does_show_application : false
      , cloned_all_categories : []
      , cloned_categories : []
      , render_version : 0
      , search_word : null
      , is_loading : false
    }
  }
  , created() {
    this.is_loading = true;
    this.cloned_all_categories = JSON.parse(JSON.stringify(this.all_categories));
    // categoryのidxで引き出したvalueの値を更新することで
    // 再度レンダリングする
    this.cloned_categories = JSON.parse(JSON.stringify(this.categories));
    mergeCategories(this.cloned_all_categories, this.cloned_categories);
    this.is_loading = false;
  }

  , methods : {
    addDetail(subcat) {
      this.is_loading = true;
      if (subcat.detailed_categories) {
        subcat.detailed_categories.push(this.createDetailed(subcat.name, subcat.detailed_categories.length));
      } else {
        subcat.detailed_categories = [this.createDetailed(subcat.name, 0)];
      }
      this.render_version++;
      this.is_loading = false;
    }
    , changeItem(subcat, { unit_price, name, available }) {
      subcat.unit_price = unit_price;
      subcat.available = available;
      subcat.name = name;
      this.render_version++;
    }
    , changeCatOpen(cat) {
      cat.open = !cat.open;
      this.render_version++;
    }
    , createDetailed(name, id) {
      return { id, name, available: false, unit_price: 0 };
    }
    , changeCategory(cat, { available }) {
      cat.available = available;
      this.render_version++;
    }
    , onSearchHit(cat, did_hit) {
      this.cloned_all_categories.forEach(c => { c._show = false; });
      cat._show = did_hit;
      this.render_version++;
    }
    , submitProduct() {
      this.$emit('submit');
    }

    // 入力されているデータを抽出
    , extractInputData() {
      return reduce(clone(this.cloned_all_categories), (acc, cat) => {
        const category = {};
        category.available = cat.available;
        category.id = cat.id;
        category.subcategories = reduce(cat.subcategories, (accm, subc) => {
          const subcategory = {};
          subcategory.id = subc.id;
          subcategory.available = subc.available;
          subcategory.unit_price = subc.unit_price;
          subcategory.detailed_categories = reduce(subc.detailed_categories, (accml, detc) => {
            const detailed = {};
            detailed.id = detc.id;
            detailed.name = detc.name;
            detailed.available = detc.available;
            detailed.unit_price = detc.unit_price;
            if (detc.unit_price) {
              accml.push(detc);
            }
            return accml;
          }, []);
          if (subcategory.unit_price || subcategory.detailed_categories.length > 0) {
            accm.push(subcategory);
          }
          return accm;
        }, []);
        if (category.subcategories.length > 0) {
          acc.push(category);
        }
        return acc;
      }, []);
    }

    , openApplication() {
      this.does_show_application = true;
    }
    , getData() {
      return this.extractInputData();
    }
    
  }
}
