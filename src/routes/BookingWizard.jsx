import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import selectors from '../selectors';
import actions from '../actions';
import BookingForm from '../components/BookingForm';

const BookingWizard = ({
  hotel, guestData, hotelBookingData, estimates, handleBookingFormSubmit,
}) => (
  // TODO if no hotel/guestData, redirect to homepage
  <BookingForm
    guestData={guestData}
    hotelBookingData={hotelBookingData}
    hotel={hotel}
    estimates={estimates}
    handleBookingFormSubmit={handleBookingFormSubmit}
  />);

BookingWizard.propTypes = {
  hotel: PropTypes.instanceOf(Object).isRequired,
  estimates: PropTypes.instanceOf(Array).isRequired,
  guestData: PropTypes.instanceOf(Object).isRequired,
  hotelBookingData: PropTypes.instanceOf(Object).isRequired,
  handleBookingFormSubmit: PropTypes.func.isRequired,
};

export default connect(
  (state) => {
    const hotelBookingData = selectors.booking.getHotelData(state);
    const getHotelById = selectors.hotels.makeGetHotelById();
    return {
      hotel: getHotelById(state, hotelBookingData.id),
      estimates: selectors.estimates.getCurrentByHotelId(state, hotelBookingData.id),
      guestData: selectors.booking.getGuestData(state),
      hotelBookingData,
    };
  },
  dispatch => ({
    handleBookingFormSubmit: (values) => {
      dispatch(actions.booking.submitBooking(values));
    },
  }),
)(BookingWizard);
