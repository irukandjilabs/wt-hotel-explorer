import dayjs from 'dayjs';
import { computeCancellationFees } from '../services/cancellation-fees';

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

export const determineCancellationFees = ({ hotelId }) => (dispatch, getState) => {
  const state = getState();
  const hotel = state.hotels.list.find(h => h.id === hotelId);
  if (!hotel) {
    return;
  }
  if (!state.booking || !state.booking.guest || !state.booking.guest.helpers) {
    return;
  }
  const arrivalDayjs = state.booking.guest.helpers.arrivalDateDayjs;
  const cancellationFees = computeCancellationFees(
    dayjs(), // today
    arrivalDayjs,
    hotel.cancellationPolicies,
    hotel.defaultCancellationAmount,
  );
  dispatch({
    type: 'SET_CANCELLATION_FEES',
    payload: {
      hotelId,
      fees: cancellationFees,
    },
  });
};

export default {
  setGuestData,
  addRoomType,
};
