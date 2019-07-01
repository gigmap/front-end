// @flow

export type Concert = {
  id: number,
  displayName: string,
  uri: string,
  location: {
    city: string,
    country: string,
    lat: ?number,
    lng: ?number
  },
  start: string,
  isWithCoordinates: boolean,
  memberNames: string,
  members: Array<{
    id: string,
    displayName: string
  }>

}