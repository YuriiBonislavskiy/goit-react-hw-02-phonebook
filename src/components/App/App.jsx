import React, { Component } from 'react';
import ContactEditor from '../ContactEditor';
import ContactsFilter from '../ContactsFilter';
import ContactList from '../ContactsList';
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

  render() {
    const filteredContacts = this.getVisibleContacts();
    return (
      <div className={css.container}>
        <h2>Phonebook</h2>
        <div>
          <ContactEditor
            contacts={this.state.contacts}
            onSubmit={this.addContact}
          />

          <h3>Contacts</h3>
          <p>Find contacts by name</p>
          <ContactsFilter filter={this.filter} onChange={this.changeFilter} />
          <ContactList contacts={filteredContacts} />
        </div>
      </div>
    );
  }
}

export default App;
