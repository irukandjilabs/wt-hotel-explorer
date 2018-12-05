import { createActionThunk } from 'redux-thunk-actions';
import dayjs from 'dayjs';

import {
  HttpError,
  Http404Error,
  HttpConflictError,
  HttpBadRequestError,
  HttpInternalServerError,
} from '../services/errors';

import { computeCancellationFees } from '../services/cancellation-fees';

export const setGuestData = ({ arrival, departure, guests }) => (dispatch) => {
  dispatch({
    type: 'SET_STAY_DATA',
    payload: {
      arrival,
      departure,
    },
  });
  dispatch({
    type: 'SET_GUEST_DATA',
    payload: {
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

export const translateNetworkError = (status, code, message) => {
  if (status === 400) {
    return new HttpBadRequestError(code, message);
  }
  if (status === 404) {
    return new Http404Error(code, message);
  }
  // Consider 422 as a 409
  if (status === 409 || status === 422) {
    return new HttpConflictError(code, message);
  }
  if (status === 500) {
    return new HttpInternalServerError(code, message);
  }
  const e = new HttpError(code, message);
  e.status = status;
  return e;
};


export const sendBooking = createActionThunk('SEND_BOOKING', ({ bookingData, bookingUri }) => {
  const url = `${bookingUri}/booking`;
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(bookingData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status > 299) {
        throw translateNetworkError(response.status, 'Cannot save booking!');
      }
      return response.json();
    })
    .then(data => ({
      id: data.id,
      status: data.status,
    }));
});

export const submitBooking = values => (dispatch, getState) => {
  const state = getState();
  const hotel = state.hotels.list.find(h => h.id === values.hotelId);
  if (!hotel || !hotel.bookingUri) {
    return;
  }
  dispatch({
    type: 'SET_CUSTOMER',
    payload: {
      customer: values.customer,
    },
  });
  dispatch({
    type: 'SET_GUEST_DATA',
    payload: {
      guests: values.booking.guestInfo,
    },
  });
  const { _formActions, ...bookingData } = values;
  dispatch(sendBooking({
    bookingUri: hotel.bookingUri,
    bookingData,
  }));
};

export const cancelBooking = createActionThunk('CANCEL_BOOKING', (values) => {
  const url = `${values.bookingUri}/booking/${values.bookingId}`;
  return fetch(url, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 204) {
        return { status: 204, code: 'ok' };
      }
      return response.json();
    })
    .then((response) => {
      values.finalize(response.status <= 299, response.code);
    }, () => {
      values.finalize(false, undefined);
    });
});

export default {
  setGuestData,
  addRoomType,
  determineCancellationFees,
  submitBooking,
  cancelBooking,
};
