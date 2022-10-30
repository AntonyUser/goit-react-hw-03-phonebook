import { Formik, ErrorMessage, Field } from 'formik';
import PropTypes from 'prop-types';
import { Form, Button } from '../ContactForm/ContactForm.styled';
import css from '../ContactForm/ContactForm.module.css';

export const ContactForm = ({ schema, onSubmit, name, onChange, number }) => {
  return (
    <>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={schema}
        onSubmit={values => {
          onSubmit(values);
        }}
      >
        <Form>
          <Field as="label" className={css.label}>
            <span>Name</span>
            <Field
              as="input"
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              className={css.input}
            />
            <ErrorMessage name="name" component="div" />
          </Field>
          <Field as="label" className={css.label}>
            <span>Number</span>
            <Field
              as="input"
              type="tel"
              name="number"
              value={number}
              onChange={onChange}
              className={css.input}
            />
            <ErrorMessage name="number" component="div" />
          </Field>

          <Button type="submit">Add contact</Button>
        </Form>
      </Formik>
    </>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  number: PropTypes.string.isRequired,
};
