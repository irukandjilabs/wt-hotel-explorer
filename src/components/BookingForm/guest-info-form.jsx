import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
} from 'formik';


// TODO deal with adding/removing people
const GuestInfoForm = ({
  form,
}) => (
  <React.Fragment>
    {form.values.people && form.values.people.map((person, index) => (
      <div className="form-row mb-1" key={`person.${person.id}`}>
        <div className="col-md-3">
          <label htmlFor={`person.${person.id}.name`} className="col-form-label">
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
            name={`people.${index}.name`}
            id={`people.${index}.name`}
            min="0"
          />
        </div>
        <div className="col-md-3">
          <Field
            placeholder="Surname"
            aria-label="Surname"
            type="text"
            className="form-control"
            name={`people.${index}.surname`}
            id={`people.${index}.surname`}
            min="0"
          />
        </div>
        <div className="col-md-3">
          <Field
            placeholder="Age"
            aria-label="Age"
            type="number"
            className="form-control"
            name={`people.${index}.age`}
            id={`people.${index}.age`}
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
