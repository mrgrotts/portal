export const toCamelCase = string => {
  // remove all characters that should not be in a variable name
  // as well underscores an numbers from the beginning of the string
  string = string
    .replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, '')
    .trim()
    .toLowerCase();
  // uppercase letters preceeded by a hyphen or a space
  string = string.replace(/([ -]+)([a-zA-Z0-9])/g, (a, b, c) =>
    c.toUpperCase()
  );
  // uppercase letters following numbers
  string = string.replace(
    /([0-9]+)([a-zA-Z])/g,
    (a, b, c) => b + c.toUpperCase()
  );
  return string;
};

// export const camelCase = (String.prototype.toCamelCase = () => {
//   return this.replace(/\s(.)/g, function($1) {
//     return $1.toUpperCase();
//   })
//     .replace(/\s/g, '')
//     .replace(/^(.)/, function($1) {
//       return $1.toLowerCase();
//     });
// });

export default toCamelCase;
