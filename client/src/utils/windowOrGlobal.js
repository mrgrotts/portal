module.exports =
  (typeof window === 'object' && window.self === window && window) ||
  (typeof global === 'object' && global.global === global && global) ||
  this;
