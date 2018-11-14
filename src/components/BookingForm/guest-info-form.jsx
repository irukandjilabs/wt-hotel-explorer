import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
} from 'formik';

const GuestInfoForm = ({
  form,
}) => (
  <React.Fragment>
    {form.values.booking.guestInfo && form.values.booking.guestInfo.map((guest, index) => (
      <div className="form-row mb-1" key={`guest.${guest.id}`}>
        <div className="col-md-3">
          <label htmlFor={`booking.guestInfo.${index}.name`} className="col-form-label">
            Guest #
            {index + 1}
          </label>
        </div>
        <div className="col-md-3">
          <Field
            placeholder="Name"
            aria-label="Name"
            type="text"
            className="form-control"
            name={`booking.guestInfo.${index}.name`}
            id={`booking.guestInfo.${index}.name`}
            min="0"
          />
        </div>
        <div className="col-md-3">
          <Field
            placeholder="Surname"
            aria-label="Surname"
            type="text"
            className="form-control"
            name={`booking.guestInfo.${index}.surname`}
            id={`booking.guestInfo.${index}.surname`}
            min="0"
          />
        </div>
        <div className="col-md-3">
          <Field
            placeholder="Age"
            aria-label="Age"
            type="number"
            className="form-control"
            name={`booking.guestInfo.${index}.age`}
            id={`booking.guestInfo.${index}.age`}
            min="0"
          />
        </div>
      </div>
    ))}
  </React.Fragment>
);

GuestInfoForm.propTypes = {
  form: PropTypes.instanceOf(Object).isRequired,
};

export default GuestInfoForm;
