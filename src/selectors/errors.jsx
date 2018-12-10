export function getByHotelId(state, hotelId) {
  return state.errors.hotels[hotelId];
}

export function getGlobal(state) {
  return state.errors.global;
}

export function getBooking(state) {
  return state.errors.booking;
}

export function getSearch(state) {
  return state.errors.search;
}

export default {
  getByHotelId,
  getGlobal,
  getBooking,
  getSearch,
};
