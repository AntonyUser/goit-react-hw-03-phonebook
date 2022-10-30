import styled from 'styled-components';
import { Form as FormikForm, Field as FormField } from 'formik';

export const Form = styled(FormikForm)`
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  padding: 12px;
`;
export const Field = styled(FormField)`
  display: block;
  padding: 10px;
  border-radius: 4px;
  font-size: 22px;
`;
export const Button = styled.button`
  width: 150px;
  font-size: 18px;
`;
