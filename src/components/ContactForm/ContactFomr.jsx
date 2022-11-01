import { Formik, Field } from 'formik';
import PropTypes from 'prop-types';
import {
  Form,
  Button,
  ErrorMessage,
  Label,
  Input,
} from '../ContactForm/ContactForm.styled';

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
          <Field as={Label}>
            <span>Name</span>
            <Field
              as={Input}
              type="text"
              name="name"
              value={name}
              onChange={onChange}
            />
            <ErrorMessage name="name" component="div" />
          </Field>
          <Field as={Label}>
            <span>Number</span>
            <Field
              as={Input}
              type="tel"
              name="number"
              value={number}
              onChange={onChange}
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
