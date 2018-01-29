export const GoogleAPI = function(options) {
  options = options || {};

  setTimeout(() => {
    if (!options.hasOwnProperty('apiKey')) {
      console.log('You must pass an apiKey to use Google Maps API');
    }
  }, 2000);

  const apiKey = options.apiKey || process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const libraries = options.libraries || ['places'];
  const client = options.client;
  const URL = 'https://maps.googleapis.com/maps/api/js';
  const googleVersion = options.version || '3';

  let channel = null;
  let language = options.language;
  let region = null;

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
