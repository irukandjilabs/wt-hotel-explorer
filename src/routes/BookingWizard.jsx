import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import selectors from '../selectors';
import actions from '../actions';
import BookingForm from '../components/BookingForm';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

const BookingWizard = ({
  hotel, guestData, hotelBookingData, customerData, estimates, handleBookingFormSubmit,
}) => (
  // TODO if no hotel/guestData, redirect to homepage
  <React.Fragment>
    <ScrollToTopOnMount />
    <BookingForm
      guestData={guestData}
      hotelBookingData={hotelBookingData}
      hotel={hotel}
      estimates={estimates}
      customerData={customerData}
      handleBookingFormSubmit={handleBookingFormSubmit}
    />
  </React.Fragment>
);

BookingWizard.propTypes = {
  hotel: PropTypes.instanceOf(Object).isRequired,
  estimates: PropTypes.instanceOf(Array).isRequired,
  guestData: PropTypes.instanceOf(Object).isRequired,
  hotelBookingData: PropTypes.instanceOf(Object).isRequired,
  customerData: PropTypes.instanceOf(Object).isRequired,
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
      customerData: selectors.booking.getCustomerData(state),
      hotelBookingData,
    };
  },
  dispatch => ({
    handleBookingFormSubmit: (values) => {
      dispatch(actions.booking.submitBooking(values));
    },
  }),
)(BookingWizard);
