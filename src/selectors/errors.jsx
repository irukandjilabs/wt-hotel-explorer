export function getByHotelId(state, hotelId) {
  return state.errors.hotels[hotelId];
}

export function getGlobal(state) {
  return state.errors.global;
}

export function getBooking(state) {
  return state.errors.booking;
}

export default {
  getByHotelId,
  getGlobal,
  getBooking,
};
