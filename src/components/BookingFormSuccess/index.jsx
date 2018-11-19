import React from 'react';
import PropTypes from 'prop-types';

const BookingFormSuccess = ({ customerData }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-md-12">
        <div className="text-center">
          <h1 className="my-1">
          Thank you!
          </h1>
        </div>
        <div className="alert alert-success">
          <p>
For further communication with the hotel, please use
            <strong>{customerData.lastBookingId}</strong>
            {' '}
as a reference.
          </p>
        </div>
      </div>
    </div>
  </React.Fragment>
);

BookingFormSuccess.propTypes = {
  customerData: PropTypes.instanceOf(Object).isRequired,
};

export default BookingFormSuccess;
