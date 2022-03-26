import ImageUpload from '~/components/ImageUpload.vue';
import Checkbox from '~/components/Checkbox.vue';
import DropdownTextInput from '~/components/DropdownTextInput.vue';
import Toggle from '~/components/Toggle.vue';
import { range, tail } from 'lodash-es';

const label_24h = '24時間';
const week_labels = ['日曜', '月曜', '火曜', '水曜', '木曜', '金曜', '土曜', '祝日\n祭日'];

const initData = () => {
  return {
    purchase : {}
    , business_hours : range(8).map(i => {
      return {
        week : i
        , holiday: true
      }
    })
    , exceptional_business_hours : []
    , phone_number_sub : {}
    , permits : []
  };
};

export default {
  name : 'info-input'
  , components : {
    ImageUpload, Checkbox, DropdownTextInput, Toggle
  }
  , props : {
    storeInfo : {
      type : Object
      , default : initData
    }
  }
  , created() {
    if (this.storeInfo) {
      this.store = JSON.parse(JSON.stringify(this.storeInfo));
    } else {
      this.store = initData()
    }
  }
  , watch: {
    storeInfo() {
      this.store = JSON.parse(JSON.stringify(this.storeInfo));
    }
  }
  , data() {
    return {
      store : {}
      , is_loading : false
    }
  }

  , computed : {
    startTimes() {
      const head = { label : label_24h, value : label_24h, has_divider : true };
      const tails = range(0, 60 * 28, 30).map(val => {
        const hour = (() => {
          const h = Math.floor(val / 60) + '';
          return h.length < 2 ? '0' + h : h;
        })();
        const minutes = val % 60 ? '30' : '00';
        const label = `${hour}:${minutes}`;
        return {
          label, value: label
        };
      });
      return [head, ...tails];
    }
  }
  , methods: {
    calcEndTime() {
      return tail(this.startTimes);
    }
    , setStartTime(item, val) {
      if (val === label_24h) {
        item.open_24_hours = true;
        item.end_time = '';
      } else {
        item.open_24_hours = false;
      }
    }
    , weekLabel(week) {
      return week_labels[week] || week_labels[7];
    }
    , addEBH() {
      this.store.exceptional_business_hours.push({
        id: this.store.exceptional_business_hours.length
        , holiday: true
      });
    }
    , addPermit() {
      this.store.permits.push({
        name: null
        , number: null
      });
    }
    , submitShopInfo() {
      this.$emit('submit');
    }

    , changeImageFile(idx, file) {
      const img = this.store.images[idx];
      // 無い時は削除
      if (!file) {
        img.source = undefined;
      } else {
        img.source = null;
        img._file = file;
      }
    }
    , spliceArray(array, idx) {
      array.splice(idx, 1);
    }

    , getData() {
      return this.store;
    }
  }
}
