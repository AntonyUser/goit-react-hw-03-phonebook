import React, { Component } from 'react';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { ContactForm } from './ContactForm/ContactFomr';
// import { Formik } from 'formik';
import { Container } from './App.styled';

yup.addMethod(yup.string, 'validation', function () {
  return this.matches(
    "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
    "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
  );
});

yup.addMethod(yup.string, 'numeric', function () {
  return this.matches(
    '+?d{1,4}?[-.s]?(?d{1,3}?)?[-.s]?d{1,4}[-.s]?d{1,4}[-.s]?d{1,9}',
    'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
  );
});

const Schema = yup.object().shape({
  name: yup.string().required().validation(),
  number: yup
    .number(
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  onSubmit = ({ name, number }) => {
    const names = this.state.contacts.map(contact => contact.name);
    if (!names.includes(name)) {
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      this.setState(prevState => {
        return {
          contacts: [contact, ...prevState.contacts],
          name: '',
          number: '',
        };
      });
    } else {
      window.alert(`${name} is already in contacts`);
    }
  };
  onChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  onChangeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  toDeleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };
  render() {
    const visiableContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return (
      <Container>
        <h2>Phonebook</h2>
        <ContactForm
          schema={Schema}
          onSubmit={this.onSubmit}
          name={this.state.name}
          number={this.state.number}
          onChange={this.onChange}
        />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.onChangeFilter} />
        <ContactList
          contacts={visiableContacts}
          onClick={this.toDeleteContact}
        />
      </Container>
    );
  }
}

export default App;
