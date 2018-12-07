import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
} from 'formik';
import countryList from '../../assets/country-list.json';

const CustomerForm = ({ errors, touched }) => {
  const countries = countryList.map(c => (<option value={c.code} key={c.code}>{c.name}</option>));
  return (
    <React.Fragment>
      <div className="form-row mb-1">
        <div className="col col-form-label required col-md-3">
          <label htmlFor="customer.name">Name</label>
        </div>
        <div className="col">
          <Field
            required
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.name && touched.customer && touched.customer.name && 'is-invalid'}`
          }
            name="customer.name"
            id="customer.name"
          />
          {errors.customer && errors.customer.name && touched.customer && touched.customer.name && <small className="text-danger">{errors.customer.name}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label required col-md-3">
          <label htmlFor="customer.surname">Surname</label>
        </div>
        <div className="col">
          <Field
            required
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.surname && touched.customer && touched.customer.surname && 'is-invalid'}`
          }
            name="customer.surname"
            id="customer.surname"
          />
          {errors.customer && errors.customer.surname && touched.customer && touched.customer.surname && <small className="text-danger">{errors.customer.surname}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label required col-md-3">
          <label htmlFor="customer.email">E-mail</label>
        </div>
        <div className="col">
          <Field
            required
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.email && touched.customer && touched.customer.email && 'is-invalid'}`
          }
            name="customer.email"
            id="customer.email"
          />
          {errors.customer && errors.customer.email && touched.customer && touched.customer.email && <small className="text-danger">{errors.customer.email}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label col-md-3">
          <label htmlFor="customer.phone">Phone</label>
        </div>
        <div className="col">
          <Field
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.phone && touched.customer && touched.customer.phone && 'is-invalid'}`
          }
            name="customer.phone"
            id="customer.phone"
          />
          {errors.customer && errors.customer.phone && touched.customer && touched.customer.phone && <small className="text-danger">{errors.customer.phone}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <h5>Invoicing address</h5>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label required col-md-3">
          <label htmlFor="customer.address.line1">Line 1</label>
        </div>
        <div className="col">
          <Field
            required
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.address && errors.customer.address.line1 && touched.customer && touched.customer.address && touched.customer.address.line1 && 'is-invalid'}`
          }
            name="customer.address.line1"
            id="customer.address.line1"
          />
          {errors.customer && errors.customer.address && errors.customer.address.line1 && touched.customer && touched.customer.address && touched.customer.address.line1 && <small className="text-danger">{errors.customer.address.line1}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label col-md-3">
          <label htmlFor="customer.address.line2">Line 2</label>
        </div>
        <div className="col">
          <Field
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.address && errors.customer.address.line2 && touched.customer && touched.customer.address && touched.customer.address.line2 && 'is-invalid'}`
          }
            name="customer.address.line2"
            id="customer.address.line2"
          />
          {errors.customer && errors.customer.address && errors.customer.address.line2 && touched.customer && touched.customer.address && touched.customer.address.line2 && <small className="text-danger">{errors.customer.address.line2}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label col-md-3">
          <label htmlFor="customer.address.postalCode">Postal code</label>
        </div>
        <div className="col">
          <Field
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.address && errors.customer.address.postalCode && touched.customer && touched.customer.address && touched.customer.address.postalCode && 'is-invalid'}`
          }
            name="customer.address.postalCode"
            id="customer.address.postalCode"
          />
          {errors.customer && errors.customer.address && errors.customer.address.postalCode && touched.customer && touched.customer.address && touched.customer.address.postalCode && <small className="text-danger">{errors.customer.address.postalCode}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label required col-md-3">
          <label htmlFor="customer.address.city">City</label>
        </div>
        <div className="col">
          <Field
            required
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.address && errors.customer.address.city && touched.customer && touched.customer.address && touched.customer.address.city && 'is-invalid'}`
          }
            name="customer.address.city"
            id="customer.address.city"
          />
          {errors.customer && errors.customer.address && errors.customer.address.city && touched.customer && touched.customer.address && touched.customer.address.city && <small className="text-danger">{errors.customer.address.city}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label col-md-3">
          <label htmlFor="customer.address.state">State</label>
        </div>
        <div className="col">
          <Field
            type="text"
            className={
            `form-control ${
              errors.customer && errors.customer.address && errors.customer.address.state && touched.customer && touched.customer.address && touched.customer.address.state && 'is-invalid'}`
          }
            name="customer.address.state"
            id="customer.address.state"
          />
          {errors.customer && errors.customer.address && errors.customer.address.state && touched.customer && touched.customer.address && touched.customer.address.state && <small className="text-danger">{errors.customer.address.state}</small>}
        </div>
      </div>
      <div className="form-row mb-1">
        <div className="col col-form-label required col-md-3">
          <label htmlFor="customer.address.country">Country</label>
        </div>
        <div className="col">
          <Field
            required
            component="select"
            className={
            `custom-select form-control ${
              errors.customer && errors.customer.address && errors.customer.address.country && touched.customer && touched.customer.address && touched.customer.address.country && 'is-invalid'}`
          }
            name="customer.address.country"
            id="customer.address.country"
          >
            {countries}
          </Field>
          {errors.customer && errors.customer.address && errors.customer.address.country && touched.customer && touched.customer.address && touched.customer.address.country && <small className="text-danger">{errors.customer.address.country}</small>}
        </div>
      </div>
    </React.Fragment>
  );
};

CustomerForm.propTypes = {
  errors: PropTypes.instanceOf(Object).isRequired,
  touched: PropTypes.instanceOf(Object).isRequired,
};

export default CustomerForm;
