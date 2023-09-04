import React, { Component } from 'react';
import ContactForm from '../ContactForm';
import ContactsFilter from '../Filter';
import ContactList from '../ContactList';
import contacts from '../../data/contacts.json';
import css from './App.module.css';


class App extends Component {
  state = {
    contacts: contacts,
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

    // setInterval(this.sortContacts, 20);
  };

  // sortContacts = () => {
  //   const { contacts } = this.state;
  //   const Contacts = contacts.sort((firstContact, secondContact) =>
  //     firstContact.name.localeCompare(secondContact.name)
  //   );
  //   this.setState({
  //     contacts: Contacts,
  //   });
  // };

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
            onSubmit={this.addContact}
          />

          <h2>Contacts</h2>
          <ContactsFilter
            filter={this.filter}
            onChangeFilter={this.changeFilter}
            value={this.state.filter}
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
