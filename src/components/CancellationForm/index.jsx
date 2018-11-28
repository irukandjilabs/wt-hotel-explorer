import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import { Formik, Form, Field } from 'formik';

const CancellationForm = ({ hotel, handleSubmit, initialValues }) => {
  const validate = (values) => {
    const errors = {};
    // formats
    if (!values.bookingId) {
      errors.bookingId = 'We need a booking reference!';
    }
    return errors;
  };

  const doSubmit = (values, formActions) => {
    handleSubmit({
      bookingUri: hotel.bookingUri,
      bookingId: values.bookingId,
      _formActions: {
        setSubmitting: formActions.setSubmitting,
        setErrors: formActions.setErrors,
        finalize: (isOk, code) => {
          if (isOk) {
            formActions.resetForm();
          } else {
            let msg;
            switch (code) {
              case '#notFound':
                msg = 'Unknown booking reference.';
                break;
              case '#forbidden':
                msg = 'Booking cancellation is not allowed.';
                break;
              case '#alreadyCancelled':
                msg = 'Booking has been already cancelled';
                break;
              default:
                msg = 'Booking cannot be cancelled due to an unknown error on the hotel side.'
            }
            formActions.setErrors({
              bookingId: msg,
            })
          }
        }
      },
    });
  };
  return (
    <div className="collapse" id="form-cancellation">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={doSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <React.Fragment>
            {isSubmitting && <Loader block={200} label="Submitting..." />}
            {!isSubmitting && (
            <Form className="border border-light bg-light p-2 mb-2">
              <div className="form-row mb-1">
                <div className="form-group col-md-6">
                  <label htmlFor="bookingId">Booking reference</label>
                  <Field type="text" className="form-control" name="bookingId" id="bookingId" placeholder="Booking reference" />
                  {errors.bookingId && touched.bookingId && <small className="text-danger">{errors.bookingId}</small>}
                </div>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn btn-primary">Cancel booking.</button>
            </Form>
            )}
          </React.Fragment>
        )}
      </Formik>
    </div>
  );
};

CancellationForm.defaultProps = {
  initialValues: {
    bookingId: '',
  },
};

CancellationForm.propTypes = {
  hotel: PropTypes.instanceOf(Object).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.instanceOf(Object),
};

export default CancellationForm;
