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

  if (rules.isNumeric) {
    const pattern = /^\d+$/;
    valid = pattern.test(value) && valid;
  }

  if (rules.isPhoneNumber) {
    // console.log(value);
    if (value !== '') {
      // const pattern = /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
      const pattern = /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
      valid = pattern.test(value) && valid;
    }
  }

  if (rules.isIPAddress) {
    const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    valid = pattern.test(value) && valid;
  }

  // returns true or false
  return valid;
};

export default validateFields;
