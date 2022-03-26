import { find } from 'lodash-es';

export default (all_categories, categories, omit) => {
  const extractCategoryInput = (targets, cat) => {
    return find(targets, category => {
      return category.id === cat.id;
    });
  };
  const extractItemInput = (subcat, input_cat) => {
    return find(input_cat.subcategories, s => {
      return s.id === subcat.id;
    });
  };

  if (omit) {
    categories.forEach(cat => {
      const found = extractCategoryInput(all_categories, cat)
      if (found) {
        cat.name = found.name;
        cat.unit = found.unit;
        cat.subcategories.forEach(subc => {
          const sub_found = extractItemInput(subc, found); 
          if (sub_found) {
            subc.name = sub_found.name;
            subc.unit = sub_found.unit;
          }
        });
      }
    });
    return;
  }

  all_categories.forEach(c => {
    // データをマージする
    const input = extractCategoryInput(categories, c);
    if (input) {
      c.available = input.available;
      c.unit_price = input.unit_price;
      if (input.name) {
        c.name = input.name;
      }
      if (input.unit) {
        c.unit = input.unit;
      }
      c.subcategories.forEach(subc => {
        subc.detailed_categories = [];
        const sub_input = extractItemInput(subc, input);
        if (sub_input) {
          subc.unit_price = sub_input.unit_price;
          subc.available = sub_input.available;
          if (sub_input.name) {
            subc.name = sub_input.name;
          }
          if (sub_input.unit) {
            subc.unit = sub_input.unit;
          }

          subc.detailed_categories = sub_input.detailed_categories || [];
        }
      });
      c.open = input.available;
    } else {
      c.open = false;
    }
  });
}; 
