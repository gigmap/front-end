export const makeLatLng = (position) => ({
  lat: position[0],
  lng: position[1]
});

export const makeYaPosition = (latLng) => [latLng.lat, latLng.lng];