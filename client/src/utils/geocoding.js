const GOOGLE_MAPS_API = 'https://maps.googleapis.com/maps/api/geocode/json';
const API_KEY = 'AIzaSyD_xwq4iNehc3lxu1JPyDQyc_nm7D8KTRs';

const ADDRESS = '27W223 Churchill Road, Winfield, IL 60190';
const PLACES_LOOKUP_URL = `${GOOGLE_MAPS_API}?address=${ADDRESS}&key=${API_KEY}`;

const LATITUDE = 41.88;
const LONGITUDE = -87.65;
const REVERSE_GEOCODING_URL = `${GOOGLE_MAPS_API}?latlng=${LATITUDE},${LONGITUDE}&key=${API_KEY}`;
