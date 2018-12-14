import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import selectors from '../selectors';
import actions from '../actions';
import BookingForm from '../components/BookingForm';
import BookingFormSuccess from '../components/BookingFormSuccess';
import ScrollToTopOnMount from '../components/ScrollToTopOnMount';

class BookingWizard extends React.PureComponent {
  componentDidMount() {
    const {
      hotel, guestData, hotelBookingData, customerData,
      estimates, history,
    } = this.props;
    if (!hotel || !guestData || !hotelBookingData || !customerData || !estimates) {
      history.push('/');
    }
  }

  render() {
    const {
      hotel, guestData, hotelBookingData, customerData,
      estimates, handleBookingFormSubmit, error,
    } = this.props;

    if (customerData.lastBookingId) {
      return (
        <React.Fragment>
          <ScrollToTopOnMount />
          <BookingFormSuccess
            customerData={customerData}
          />
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <ScrollToTopOnMount />
        {guestData && hotel && estimates && customerData && (
          <BookingForm
            guestData={guestData}
            error={error}
            hotelBookingData={hotelBookingData}
            hotel={hotel}
            estimates={estimates}
            customerData={customerData}
            handleBookingFormSubmit={handleBookingFormSubmit}
          />
        )}
      </React.Fragment>
    );
  }
}

BookingWizard.defaultProps = {
  hotel: undefined,
  guestData: undefined,
  estimates: [],
  hotelBookingData: undefined,
  customerData: undefined,
  error: undefined,
};

BookingWizard.propTypes = {
  hotel: PropTypes.instanceOf(Object),
  guestData: PropTypes.instanceOf(Object),
  estimates: PropTypes.instanceOf(Array),
  hotelBookingData: PropTypes.instanceOf(Object),
  customerData: PropTypes.instanceOf(Object),
  handleBookingFormSubmit: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  error: PropTypes.string,
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
      error: selectors.errors.getBooking(state),
    };
  },
  dispatch => ({
    handleBookingFormSubmit: (values) => {
      dispatch(actions.booking.submitBooking(values));
    },
  }),
)(BookingWizard);
