export const setGuestData = ({ arrival, departure, guests }) => (dispatch) => {
  dispatch({
    type: 'SET_GUEST_DATA',
    payload: {
      arrival,
      departure,
      guests,
    },
  });
};

export const addRoomType = ({ hotelId, roomTypeId }) => (dispatch) => {
  dispatch({
    type: 'ADD_ROOM_TYPE',
    payload: {
      hotelId,
      roomTypeId,
    },
  });
};

export default {
  setGuestData,
  addRoomType,
};
