export const axiosCatch = (error) => {
  return { has_error : true, error };
};

export const hasAxiosError = (val) => {
  return val && val.has_error;
};

export const storeCatch = axiosCatch;

export const hasStoreError = hasAxiosError;

export const END_POINT = process.env.API_URL || 'https://dev.risapennavi.com/api/v1';

export const coupon_colors = ['#45A1F1', '#3CBFE9', '#6EBC56', '#F8990A', '#E93C66', '#B15CA0'];

export const toTwoDigitString = (n) => {
  if (!n || isNaN(n)) {
    return '';
  }
  if (n < 10) {
    return '0' + n;
  }
  return n + '';
};

export const toFourDigitString = (n) => {
  if (!n || isNaN(n)) {
    return '';
  }
  if (n < 1000) {
    return '0' + n;
  }
  if (n < 100) {
    return '00' + n;
  }
  if (n < 10) {
    return '000' + n;
  }
  return n + '';
};

export const cloneByJSON = (xs) => {
  return JSON.parse(JSON.stringify(xs));
};
