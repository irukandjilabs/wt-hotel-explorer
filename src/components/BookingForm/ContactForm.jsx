import React from 'react';
import {
  Field,
} from 'formik';


const ContactForm = ({ errors, touched }) => (
  <React.Fragment>
    <div className="form-row mb-1">
      <div className="form-group col-md-6">
        <label htmlFor="contact.name">Name</label>
        <Field type="text" className="form-control" name="contact.name" id="contact.name" />
        {errors.contact && errors.contact.name && touched.contact && touched.contact.name && <small className="text-danger">{errors.contact.name}</small>}
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="contact.surname">Surname</label>
        <Field type="text" className="form-control" name="contact.surname" id="contact.surname" />
        {errors.contact && errors.contact.surname && touched.contact && touched.contact.surname && <small className="text-danger">{errors.contact.surname}</small>}
      </div>
    </div>
    <div className="form-row mb-1">
      <div className="form-group col-md-6">
        <label htmlFor="contact.email">E-mail</label>
        <Field type="text" className="form-control" name="contact.email" id="contact.email" />
        {errors.contact && errors.contact.email && touched.contact && touched.contact.email && <small className="text-danger">{errors.contact.email}</small>}
      </div>
      <div className="form-group col-md-6">
        <label htmlFor="contact.phone">Phone</label>
        <Field type="text" className="form-control" name="contact.phone" id="contact.phone" />
        {errors.contact && errors.contact.phone && touched.contact && touched.contact.phone && <small className="text-danger">{errors.contact.phone}</small>}
      </div>
    </div>
    <div className="form-row mb-1">
      <h5>Invoicing address</h5>
    </div>
    <div className="form-row mb-1">
      <div className="col col-form-label">
        <label htmlFor="contact.address.line1">Line 1</label>
      </div>
      <div className="col">
        <Field type="text" className="form-control" name="contact.address.line1" id="contact.address.line1" />
        {errors.contact && errors.contact.address && errors.contact.address.line1 && touched.contact && touched.contact.address && touched.contact.address.line1 && <small className="text-danger">{errors.contact.address.line1}</small>}
      </div>
    </div>
    <div className="form-row mb-1">
      <div className="col col-form-label">
        <label htmlFor="contact.address.line2">Line 2</label>
      </div>
      <div className="col">
        <Field type="text" className="form-control" name="contact.address.line2" id="contact.address.line2" />
        {errors.contact && errors.contact.address && errors.contact.address.line2 && touched.contact && touched.contact.address && touched.contact.address.line2 && <small className="text-danger">{errors.contact.address.line2}</small>}
      </div>
    </div>
    <div className="form-row mb-1">
      <div className="col col-form-label">
        <label htmlFor="contact.address.postalCode">Postal code</label>
      </div>
      <div className="col">
        <Field type="text" className="form-control" name="contact.address.postalCode" id="contact.address.postalCode" />
        {errors.contact && errors.contact.address && errors.contact.address.postalCode && touched.contact && touched.contact.address && touched.contact.address.postalCode && <small className="text-danger">{errors.contact.address.postalCode}</small>}
      </div>
    </div>
    <div className="form-row mb-1">
      <div className="col col-form-label">
        <label htmlFor="contact.address.city">City</label>
      </div>
      <div className="col">
        <Field type="text" className="form-control" name="contact.address.city" id="contact.address.city" />
        {errors.contact && errors.contact.address && errors.contact.address.city && touched.contact && touched.contact.address && touched.contact.address.city && <small className="text-danger">{errors.contact.address.city}</small>}
      </div>
    </div>
    <div className="form-row mb-1">
      <div className="col col-form-label">
        <label htmlFor="contact.address.state">State</label>
      </div>
      <div className="col">
        <Field type="text" className="form-control" name="contact.address.state" id="contact.address.state" />
        {errors.contact && errors.contact.address && errors.contact.address.state && touched.contact && touched.contact.address && touched.contact.address.state && <small className="text-danger">{errors.contact.address.state}</small>}
      </div>
    </div>
    <div className="form-row mb-1">
      <div className="col col-form-label">
        <label htmlFor="contact.address.country">Country</label>
      </div>
      <div className="col">
        <Field type="text" className="form-control" name="contact.address.country" id="contact.address.country" />
        {errors.contact && errors.contact.address && errors.contact.address.country && touched.contact && touched.contact.address && touched.contact.address.country && <small className="text-danger">{errors.contact.address.country}</small>}
      </div>
    </div>
    <div className="form-row mb-1">
      <div className="form-group col-md-12">
        <label htmlFor="contact.note">
          <h5>Do you have something special to say? Leave us a note:</h5>
        </label>
        <Field type="text" className="form-control input-lg" name="contact.note" id="contact.note" component="textarea" rows="6" />
        {errors.contact && errors.contact.phone && touched.contact && touched.contact.note && <small className="text-danger">{errors.contact.note}</small>}
      </div>
    </div>
  </React.Fragment>);

export default ContactForm;
