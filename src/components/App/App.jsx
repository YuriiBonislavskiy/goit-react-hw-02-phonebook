import React, { Component } from 'react';
import ContactForm from '../ContactForm';
import Filter from '../Filter';
import ContactList from '../ContactList';
import contacts from '../../data/contacts.json';
import css from './App.module.css';


class App extends Component {
  state = {
    contacts: contacts,
    filter: '',
  };

  addContact = newContact => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, newContact],
      };
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

  deleteContact = id => {
    this.setState( ({contacts}) => {
      return {contacts: contacts.filter( contact => contact.id !== id),}
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
            onAddContact={this.addContact}
          />

          <h2>Contacts</h2>
          <Filter
            filter={this.state.filter}
            onChangeFilter={this.changeFilter}
          />

          <ContactList
            contacts={filteredContacts}
            onDeleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
