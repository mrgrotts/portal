export const validateFields = (value, rules) => {
  // recheck valid status after each rule
  let valid = true;

  if (!rules) {
    return true;
  }

  if (rules.required) {
    valid = value.trim() !== '' && valid;
  }

  if (rules.minLength) {
    valid = value.length >= rules.minLength && valid;
  }

  if (rules.maxLength) {
    valid = value.length <= rules.maxLength && valid;
  }

  if (rules.isEmail) {
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isURL) {
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    valid = pattern.test(value) && valid;
  }

  // International Phone Numbers
  if (rules.isPhoneNumber) {
    // console.log(value);
    if (value !== '') {
      // const pattern = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
      const pattern = /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
      valid = pattern.test(value) && valid;
    }
  }

  // North American Phone Numbers
  if (rules.isPhoneNumberNA) {
    const pattern = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isPostalAddress) {
    const pattern = /[a-zA-Z\d\s\-\,\#\.\+]+/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isZipCode) {
    const pattern = /^\d{5,6}(?:[-\s]\d{4})?$/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isIPAddress) {
    const pattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isValidCreditCard) {
    const pattern = /	^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isSocialSecurityNumber) {
    const pattern = /^\d{3}-\d{2}-\d{4}$/;
    valid = pattern.test(value) && valid;
  }

  // returns true or false
  return valid;
};

export default validateFields;
