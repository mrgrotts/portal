const window = require('./windowOrGlobal');
let counter = 0;
let scriptMap =
  (typeof window !== 'undefined' && window._scriptMap) || new Map();

export const ScriptCache = (function(global) {
  global._scriptMap = global._scriptMap || scriptMap;
  return function ScriptCache(scripts) {
    const Cache = {};

    Cache._onLoad = function(key) {
      return callback => {
        let stored = scriptMap.get(key);
        if (stored) {
          stored.promise.then(() => {
            stored.error ? callback(stored.error) : callback(null, stored);
            return stored;
          });
        }
      };
    };

    Cache._scriptTag = (key, src) => {
      if (!scriptMap.has(key)) {
        let tag = document.createElement('script');
        let promise = new Promise((resolve, reject) => {
          let body = document.getElementsByTagName('body')[0];

          tag.type = 'text/javascript';
          tag.async = false; // Load in order

          const callbackName = `loaderCB${counter++}${Date.now()}`;

          let handleResult = state => {
            return event => {
              let stored = scriptMap.get(key);
              if (state === 'loaded') {
                stored.resolved = true;
                resolve(src);
              } else if (state === 'error') {
                stored.errored = true;
                reject(event);
              }
              stored.loaded = true;

              cleanup();
            };
          };

          const cleanup = () => {
            if (
              global[callbackName] &&
              typeof global[callbackName] === 'function'
            ) {
              global[callbackName] = null;
              delete global[callbackName];
            }
          };

          tag.onload = handleResult('loaded');
          tag.onerror = handleResult('error');
          tag.onreadystatechange = () => {
            handleResult(tag.readyState);
          };

          // Pick off callback, if there is one
          if (src.match(/callback=CALLBACK_NAME/)) {
            src = src.replace(/(callback=)[^&]+/, `$1${callbackName}`);
            window[callbackName] = tag.onload;
          } else {
            tag.addEventListener('load', tag.onload);
          }
          tag.addEventListener('error', tag.onerror);

          tag.src = src;
          body.appendChild(tag);

          return tag;
        });
        let initialState = {
          loaded: false,
          error: false,
          promise: promise,
          tag
        };
        scriptMap.set(key, initialState);
      }
      return scriptMap.get(key);
    };

    Object.keys(scripts).forEach(function(key) {
      const script = scripts[key];

      const tag = window._scriptMap.has(key)
        ? window._scriptMap.get(key).tag
        : Cache._scriptTag(key, script);

      Cache[key] = {
        tag: tag,
        onLoad: Cache._onLoad(key)
      };
    });

    return Cache;
  };
})(window);

export default ScriptCache;
