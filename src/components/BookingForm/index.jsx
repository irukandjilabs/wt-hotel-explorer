import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import {
  Formik, Form, Field, FieldArray,
} from 'formik';

import HotelInfoBox from '../HotelInfoBox';
import GuestInfoForm from './guest-info-form';
import ContactForm from './contact-form';
import RoomType from './room-type';

// TODO on change reflect to state guestData
const BookingForm = ({ hotel, guestData, hotelBookingData }) => {
  // TODO refactor booking state into a similar shape
  const initialValues = {
    dates: {
      arrival: guestData.arrival,
      departure: guestData.departure,
    },
    people: [],
    rooms: [],
    note: '',
    contact: {
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
  initialValues.people = guestData.guestAges.map((age, i) => ({
    id: `guest-${i}`,
    name: '',
    surname: '',
    age,
  }));
  /* eslint-disable-next-line array-callback-return */
  Object.keys(hotelBookingData.roomTypes).map((roomTypeId) => {
    if (!hotelBookingData.roomTypes[roomTypeId].quantity) {
      initialValues.rooms.push({
        id: roomTypeId,
        guests: [],
      });
    } else {
      for (let i = 0; i < hotelBookingData.roomTypes[roomTypeId].quantity; i += 1) {
        initialValues.rooms.push({
          id: roomTypeId,
          guests: [],
        });
      }
    }
  });

  // TODO
  const validate = (values) => {
    // TODO move this into a component, common code with GuestForm
    const errors = {
      dates: {},
    };
    const normalizedArrival = dayjs(values.dates.arrival);
    const normalizedDeparture = dayjs(values.dates.departure);
    if (!normalizedArrival.isValid()) {
      errors.dates.arrival = 'Invalid arrival date!';
    }
    if (!normalizedDeparture.isValid()) {
      errors.dates.departure = 'Invalid departure date!';
    }
    // arrival has to be before departure
    if (normalizedArrival.isValid()
        && normalizedDeparture.isValid()
        && normalizedArrival.isAfter(normalizedDeparture)) {
      errors.dates.arrival = 'Arrival has to be before departure!';
    }
    return errors;
  };

  // TODO
  const doSubmit = (values) => {
    console.log(values);
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
                    <RoomType roomType={hotel.roomTypes[values.rooms[0].id]} />
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="h4 mb-1">Guest information</h4>
                    <FieldArray
                      name="people"
                      component={GuestInfoForm}
                    />
                    {errors.people && touched.people
                    && (
                    <small className="text-danger ml-1">
                      {errors.people}
                    </small>
                    )}
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="h4 mb-1">Contact</h4>
                    <ContactForm errors={errors} touched={touched} />
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
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <h4 className="h4 mb-1">Summary</h4>
                    <div className="form-row mb-1">
                      <div className="col col-form-label">
                        Date of arrival
                      </div>
                      <div className="col">
                        <strong>{values.dates.arrival}</strong>
                      </div>
                    </div>
                    <div className="form-row mb-1">
                      <div className="col col-form-label">
                        Date of departure
                      </div>
                      <div className="col">
                        <strong>{values.dates.departure}</strong>
                      </div>
                    </div>
                    <div className="form-row mb-1">
                      <div className="col col-form-label">
                        Total price
                      </div>
                      <div className="col">
                        <strong>TODO total price + currency</strong>
                      </div>
                    </div>
                    <div className="form-row mb-1">
                      <div className="col col-form-label">
                        Cancellation terms
                      </div>
                      <div className="col">
                        <strong>TODO cancellation fees</strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
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
};

export default BookingForm;
