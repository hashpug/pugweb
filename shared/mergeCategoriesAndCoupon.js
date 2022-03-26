import { find } from 'lodash-es';

export default (coupon, all_categories) => {
  const extractCategory = (cpn) => {
    return all_categories.find(cat => {
      return cpn.id === cat.id;
    });
  };
  const extractSubCategory = (subcats, cpn) => {
    return subcats.find(sub => {
      return sub.id === cpn.id;
    });
  };
  const extractDetCategory = (dets, cpn) => {
    return dets.find(det => {
      return det.id === cpn.id;
    });
  };
  if (!coupon.categories) { return; }
  const rate = coupon.rate;

  coupon.categories.forEach(cp_cat => {
    const category = extractCategory(cp_cat);
    if (!category) { return; }
    if (cp_cat.available) {
      category.coupon_rate = rate;
    }
    const subs = category.subcategories;
    if (!subs) { return; }
    cp_cat.subcategories.forEach(cp_sub => {
      const subcat = extractSubCategory(subs, cp_sub);
      if (!subcat) { return; }
      if (cp_sub.available) {
        subcat.coupon_rate = rate;
      }
      const dets = subcat.detailed_categories;
      if (!dets) { return; }

      cp_sub.detailed_categories.forEach(cp_det => {
        const det = extractDetCategory(dets, cp_det);
        if (!det) { return; }
        if (cp_det.available) {
          det.coupon_rate = rate;
        }
      });
    });
  });

};
