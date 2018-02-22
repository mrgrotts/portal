export const toCamelCase = string => {
  // remove all characters that should not be in a variable name
  // as well underscores an numbers from the beginning of the string
  string = string
    .replace(/([^a-zA-Z0-9_\- ])|^[_0-9]+/g, '')
    .trim()
    .toLowerCase();
  // uppercase letters preceeded by a hyphen or a space
  string = string.replace(/([ -]+)([a-zA-Z0-9])/g, (a, b, c) => c.toUpperCase());
  // uppercase letters following numbers
  string = string.replace(/([0-9]+)([a-zA-Z])/g, (a, b, c) => b + c.toUpperCase());
  return string;
};

export const toCapitalCamelCase = string => {
  string =
    string
      .split(/(?=[A-Z])/)[0]
      .charAt(0)
      .toUpperCase() +
    string.split(/(?=[A-Z])/)[0].slice(1) +
    string
      .split(/(?=[A-Z])/)
      .slice(1)
      .map(word => word.replace(word[0], word[0].toUpperCase()))
      .join(' ');
  // console.log(string);
};

export const toTitleCase = string => {
  let words = [];

  for (let word of string.split(/(?=[A-Z])/)) {
    // console.log(word);
    words.push(word.replace(word[0], word[0].toUpperCase()));
  }

  return words.join(' ');
};

// export const titleCase = string =>
//   string
//     .toLowerCase()
//     .split(' ')
//     .map(word => word.replace(word[0], word[0].toUpperCase()))
//     .join(' ');
