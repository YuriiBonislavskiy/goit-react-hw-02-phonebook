import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';

export const ContactForm = ({ contacts, onAddContact }) => {
  const initialValues = {
    name: '',
    number: '',
  };

  const schema = yup.object().shape({
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

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    // const { contacts } = this.props;
    if (contacts.findIndex(contact => contact.name === name) >= 0) {
      alert(`${name} is already in contacts`);
      return;
    }
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    onAddContact(contact);
    resetForm();
  };

  const FormError = ({ name }) => {
    return (
      <ErrorMessage
        name={name}
        render={message => <div className={css.error}>{message}</div>}
      />
    );
  };

  const nameInputId = nanoid();
  const phoneInputId = nanoid();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={handleSubmit}
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
          <FormError name="name" />
        </label>
        <label htmlFor={phoneInputId}>
          Number
          <Field
            id={phoneInputId}
            className={css.formInput}
            type="tel"
            name="number"
          />
          <FormError name="number" />
        </label>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
};

ContactForm.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onAddContact: PropTypes.func.isRequired,
};

export default ContactForm;
