import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, FieldArray,
} from 'formik';

import HotelInfoBox from '../HotelInfoBox';
import GuestInfoForm from './guest-info-form';
import CustomerForm from './customer-form';
import CancellationTerms from './cancellation-terms';
import RoomType from './room-type';
// TODO move to an action somewhere
import { computeCancellationFees } from '../../services/cancellation-fees';

const BookingForm = ({
  hotel, guestData, hotelBookingData, estimates,
}) => {
  const initialValues = {
    booking: {
      arrival: guestData.arrival,
      departure: guestData.departure,
      guestInfo: guestData.guests,
      rooms: hotelBookingData.rooms,
    },
    note: '',
    customer: {
      name: '',
      surname: '',
      email: '',
      phone: '',
      address: {
        line1: '',
        line2: '',
        postalCode: '',
        city: '',
        state: '',
        country: '',
      },
    },
  };
  const firstRoomEstimate = estimates.find(x => x.id === initialValues.booking.rooms[0].id);
  const cancellationFees = computeCancellationFees(
    dayjs(),
    dayjs(initialValues.booking.arrival),
    hotel.cancellationPolicies,
    hotel.defaultCancellationAmount,
  );

  // TODO don't allow booking in the past
  // TODO improve validation of phone, email and other fields
  const validate = (values) => {
    // TODO move this into a component, common code with GuestForm
    const errors = {
      dates: {},
    };
    const normalizedArrival = dayjs(values.booking.arrival);
    const normalizedDeparture = dayjs(values.booking.departure);
    if (!normalizedArrival.isValid()) {
      errors.booking.arrival = 'Invalid arrival date!';
    }
    if (!normalizedDeparture.isValid()) {
      errors.booking.departure = 'Invalid departure date!';
    }
    // arrival has to be before departure
    if (normalizedArrival.isValid()
        && normalizedDeparture.isValid()
        && normalizedArrival.isAfter(normalizedDeparture)) {
      errors.booking.arrival = 'Arrival has to be before departure!';
    }
    return errors;
  };

  const doSubmit = (values) => {
    const result = Object.assign({}, values, {
      hotelId: hotel.id,
      pricing: {
        currency: firstRoomEstimate.price,
        total: firstRoomEstimate.currency,
        cancellationFees,
      },
    });
    // TODO send to bookingApi, save to redux state
    console.log(result);
  };

  return (
    <React.Fragment>
      <div className="row">
        <div className="col-md-12">
          <div className="text-center">
            <h1 className="my-1">
Booking of
              {' '}
              {hotel.name}
            </h1>
          </div>
        </div>
      </div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={doSubmit}
      >
        {({
          isSubmitting, values, errors, touched,
        }) => (
          <Form className="mb-2">
            <div className="row">
              <div className="col-md-12">
                <div className="card">
                  <div className="card-body">
                    <RoomType roomType={hotel.roomTypes[values.booking.rooms[0].id]} />
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="form-row mb-1">
                      <div className="col col-form-label col-md-3">
                        Date of arrival
                      </div>
                      <div className="col">
                        <strong>{values.booking.arrival}</strong>
                      </div>
                    </div>
                    <div className="form-row mb-1">
                      <div className="col col-form-label col-md-3">
                        Date of departure
                      </div>
                      <div className="col">
                        <strong>{values.booking.departure}</strong>
                      </div>
                    </div>
                    <div className="form-row mb-1">
                      <div className="col col-form-label col-md-3">
                        Total price
                      </div>
                      <div className="col">
                        <strong>
                          {firstRoomEstimate.price}
                          {' '}
                          {firstRoomEstimate.currency}
                        </strong>
                      </div>
                    </div>
                    <div className="form-row mb-1">
                      <div className="col col-form-label col-md-3">
                        Cancellation terms
                      </div>
                      <div className="col">
                        <CancellationTerms fees={cancellationFees} price={firstRoomEstimate} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="h4 mb-1">Guest information</h4>
                    <FieldArray
                      name="booking.guestInfo"
                      component={GuestInfoForm}
                    />
                    {errors.booking && errors.booking.guestInfo
                      && touched.booking && touched.booking.guestInfo && (
                      <small className="text-danger ml-1">
                        {errors.booking.guestInfo}
                      </small>
                    )}
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="h4 mb-1">Contact</h4>
                    <CustomerForm errors={errors} touched={touched} />
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <div className="form-row mb-1">
                      <div className="form-group col-md-12">
                        <label htmlFor="note">
                          <h4>Do you have something special to say? Leave us a note:</h4>
                        </label>
                        <Field type="text" className="form-control input-lg" name="note" id="note" component="textarea" rows="6" />
                        {errors.note && touched.note && <small className="text-danger">{errors.note}</small>}
                      </div>
                    </div>
                    <div className="col-md-12 text-center">
                      <button type="submit" disabled={isSubmitting} className="btn btn-primary btn-lg">Book this!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <HotelInfoBox hotel={hotel} />
            </div>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
};

BookingForm.propTypes = {
  hotel: PropTypes.instanceOf(Object).isRequired,
  hotelBookingData: PropTypes.instanceOf(Object).isRequired,
  guestData: PropTypes.instanceOf(Object).isRequired,
  estimates: PropTypes.instanceOf(Object).isRequired,
};

export default BookingForm;
