import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';

// import config from './utils/config';

const clientOptions = {
  accessToken: 'pk.eyJ1IjoianJleW5vbGRzNjciLCJhIjoiY2x4Mjhwbm4zMGVzeTJqcTEzdm9wbDF5ZCJ9.93xvC_UKzFBuRpvV5frNwA',
};
const directionsClient = MapboxDirectionsFactory(clientOptions);

export { directionsClient };
