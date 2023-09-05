import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

class ContactForm extends Component {

  initialValues = {
    name: '',
    number: '',
  };

  schema = yup.object().shape({
    name: yup
      .string()
      .required('Required')
      .trim()
      .matches(
        /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        'Is not in correct format'
      ),
    number: yup
      .string()
      .required('Required')
      .trim()
      .matches(
        /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
        'Is not in correct format'
      ),
  });

  handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    const { contacts } = this.props;
    if (contacts.findIndex(contact => contact.name === name) >= 0) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    this.props.onAddContact(contact);
    resetForm();
  };

  formError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={message => <div className={css.error}>{message}</div>}
      />
    );
  };

  render() {
    const nameInputId = nanoid();
    const phoneInputId = nanoid();

    return (
      <Formik
        initialValues={this.initialValues}
        validationSchema={this.schema}
        onSubmit={this.handleSubmit}
      >
        <Form className={css.form} autoComplete="off">
          <label htmlFor={nameInputId}>
            Name
            <Field
              id={nameInputId}
              className={css.formInput}
              type="text"
              name="name"
            />
            <this.formError name="name"/>
          </label>
          <label htmlFor={phoneInputId}>
            Number
            <Field
              id={phoneInputId}
              className={css.formInput}
              type="tel"
              name="number"
            />
            <this.formError name="number" />
          </label>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    );
  }
}

export default ContactForm;

