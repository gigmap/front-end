export const isLocationDefined =
  ({location: {lat, lng}}) => lat !== null && lng !== null;

export const prepareConcert = (concert) => ({
  ...concert,
  isWithCoordinates: isLocationDefined(concert),
  memberNames: concert.members.map(it => it.displayName).join(', ')
});