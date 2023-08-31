import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './App.module.css';
import { nameVerification } from 'utils';
import { phoneVerification } from 'utils';
// import { getCaretPos } from 'utils';
import { мaskPattern, textPattern, symbolsPattern } from 'constans';
import Contacts from '../data/contacts.json';
import { initContacts } from 'utils';

class App extends Component {
  state = {
    contacts: initContacts(Contacts),
    filter: '',
    name: '',
    number: '',
  };

  nameInputId = nanoid();
  phoneInputId = nanoid();

  addContactSubmit = event => {
    event.preventDefault();
    const { contacts, name, number } = this.state;
    // console.log(contacts);
    if (contacts.findIndex(contact => contact.name === name) >= 0) {
      Notiflix.Notify.failure(`${name} is already in contacts`, {
        timeout: 2000,
      });
      return;
    }

    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    // console.log(contact);
    // const Contacts = [contact, ...contacts];
    this.setState({
      contacts: [...contacts, contact],
      name: '',
      number: '',
    });

    event.target.reset();
    setInterval(this.sortContacts, 20);
    // console.log(this.state.contacts);
    // alert('Pause');
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
    // const { value, pattern, title } = event.target;
    // target.value = nameVerification(value, pattern, title);
    // event.target.value = value;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    // if (this.firstStart) {
    //   this.sortContacts();
    //   this.firstStart = false;
    // }

    const { filter, contacts } = this.state;

    // console.log(contacts);
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  contactValueVerification = event => {
    // console.log(this.state.name, "  ", this.state.number);

    const { target } = event;
    const { name, value, title, dataset } = event.target;
    // const cursorPos = getCaretPos(target);

    switch (name) {
      case 'name':
        const verifiedName = nameVerification(
          value,
          dataset.pattern,
          dataset.patternadd,
          title,
          dataset.prevalue,
          target
        );
        target.value = verifiedName.value;
        verifiedName.errorMassage &&
          Notiflix.Notify.failure(verifiedName.errorMassage, {
            timeout: 2000,
          });
        target.dataset.prevalue = target.value;
        this.setState({ name: target.value });
        target.setSelectionRange(verifiedName.cursorPos, verifiedName.cursorPos);
        break;

      case 'number':
        const verifiedNumber = phoneVerification(
          value, // Значення Input
          dataset.mask, // Маска вводу
          title, // Стандартне повідомлення про помилку
          dataset.prevalue, // Попереднє значення Input
          target
        );

        target.value = verifiedNumber.value;

        target.value === target.dataset.prevalue &&
          // console.log('!!!!!!!!!!!');
          verifiedNumber.errorMassage &&
          Notiflix.Notify.failure(verifiedNumber.errorMassage, {
            timeout: 2000,
          });
        target.dataset.prevalue = target.value;
        this.setState({ number: target.value });
        target.setSelectionRange(verifiedNumber.cursorPos, verifiedNumber.cursorPos);
    // console.log(verifiedNumber.cursorPos);
        break;

      default:
    }

  };

  render() {
    const contacts = this.getVisibleContacts();
    // console.log(contacts);
    return (
      <div>
        <h2>Phonebook</h2>
        <div>
          <form className={css.addContactForm} onSubmit={this.addContactSubmit}>
            <label htmlFor={this.nameInputId}>
              Name
              <input
                type="text"
                name="name"
                // pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                data-pattern={textPattern}
                data-patternadd={symbolsPattern}
                data-prevalue=""
                id={this.nameInputId}
                onChange={this.contactValueVerification}
                // onKeyDown={this.contactValueVerification}
              />
            </label>
            <label htmlFor={this.phoneInputId}>
              Number
              <input
                type="tel"
                name="number"
                // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits only"
                id={this.phoneInputId}
                required
                // data-mask="+38 (___) ___-__-__"
                data-mask={мaskPattern}
                data-prevalue=""
                placeholder={мaskPattern}
                onChange={this.contactValueVerification}
                // onKeyDown={this.contactValueVerification}
              />
            </label>
            <button type="submit">Add contact</button>
          </form>
          <h3>Contacts</h3>
          <p>Find contacts by name</p>
          <input
            type="text"
            name="contactsFilter"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            onChange={this.changeFilter}
          >
            {this.filter}
          </input>
          <ul>
            {contacts.map(({ id, name, number }) => {
              return (
                <li key={id}>
                  {name}: {number}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
