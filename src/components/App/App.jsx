import React, { Component } from 'react';
import ContactForm from '../ContactForm';
import ContactsFilter from '../Filter';
import ContactList from '../ContactList';
import Contacts from '../../data/contacts.json';
import { initContacts } from 'utils';
import css from './App.module.css';


class App extends Component {
  state = {
    contacts: initContacts(Contacts),
    filter: '',
    name: '',
    number: '',
  };

  addContact = newContact => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
    });

    setInterval(this.sortContacts, 20);
  };

  sortContacts = () => {
    const { contacts } = this.state;
    const Contacts = contacts.sort((firstContact, secondContact) =>
      firstContact.name.localeCompare(secondContact.name)
    );
    this.setState({
      contacts: Contacts,
    });
  };

  changeFilter = event => {
    const { value } = event.target;
    this.setState(() => {
      return { filter: value };
    });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = event => {
    this.setState(prevState => {
      return {contacts: prevState.contacts.filter( ({id}) => id !== event.target.dataset.id),}
    });
  }

  render() {
    const filteredContacts = this.getVisibleContacts();
    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <div>
          <ContactForm
            contacts={this.state.contacts}
            onSubmit={this.addContact}
          />

          <h2>Contacts</h2>
          <ContactsFilter filter={this.filter} onChange={this.changeFilter} />
          <ContactList contacts={filteredContacts} onClick={this.deleteContact} />
        </div>
      </div>
    );
  }
}

export default App;
