export const GoogleAPI = function(options) {
  options = options || {};

  setTimeout(() => {
    if (!options.hasOwnProperty('apiKey')) {
      console.log('You must pass an apiKey to use GoogleApi');
    }
  }, 2000);

  const apiKey = options.apiKey;
  const libraries = options.libraries || ['places'];
  const client = options.client;
  const URL = 'https://maps.googleapis.com/maps/api/js';

  const googleVersion = options.version || '3';

  let script = null;
  let google = window.google || null;
  let loading = false;
  let channel = null;
  let language = options.language;
  let region = null;

  let onLoadEvents = [];

  const url = (url = URL) => {
    let params = {
      key: apiKey,
      callback: 'CALLBACK_NAME',
      libraries: libraries.join(','),
      client,
      v: googleVersion,
      channel,
      language,
      region
    };

    let urlParams = Object.keys(params)
      .filter(k => !!params[k])
      .map(k => `${k}=${params[k]}`)
      .join('&');

    return `${url}?${urlParams}`;
  };

  return url();
};

export default GoogleAPI;
