import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import css from './ContactForm.module.css';
import { nameVerification } from 'utils';
import { phoneVerification } from 'utils';
import { мaskPattern, textPattern, symbolsPattern } from 'constans';

class ContactForm extends Component {
  stats = {
    name: '',
    number: '',
  };

  maskLength = '';

  handeSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;

    if (name.split(" ").length < 2) {
          Notiflix.Notify.failure(
            `Contact name must contain at least first and last name`,
            {
              timeout: 2000,
            }
          );
          return;
        }


    if (number.length < мaskPattern.length) {
      Notiflix.Notify.failure(`${number} Incomplete digits in phone number`, {
        timeout: 2000,
      });
    return;}
    
    if (
      this.props.contacts.findIndex(contact => contact.name === name) >=
      0
    ) {
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

    this.props.onSubmit(contact);

    this.setState(preState => {
      return { name: '', number: '' };
    });

    event.target.reset();
  };

  contactValueVerification = event => {
    const { target } = event;
    const { name, value, title, dataset } = event.target;
    switch (name) {
      case 'name':
        const verifiedName = nameVerification(
          // Повертається об'єкт {"Значення поля", "Текст помилки", "Позиція курсора"}
          value, // Значення Input
          dataset.pattern, // Дозволені літери і знаки
          dataset.patternadd, // Дозволені знаки для перевірки що знак
          title, // Стандартне повідомлення про помилку
          dataset.prevalue, // Попереднє значення Input
          target // Елемент DOM
        );
        target.value = verifiedName.value;
        verifiedName.errorMassage &&
          Notiflix.Notify.failure(verifiedName.errorMassage, {
            timeout: 2000,
          });
        target.dataset.prevalue = target.value;
        target.setSelectionRange(
          verifiedName.cursorPos,
          verifiedName.cursorPos
        );
        break;

      case 'number':
        const verifiedNumber = phoneVerification(
          // Повертається об'єкт {"Значення поля", "Текст помилки", "Позиція курсора"}
          value, // Значення Input
          dataset.mask, // Маска вводу
          title, // Стандартне повідомлення про помилку
          dataset.prevalue, // Попереднє значення Input
          target // Елемент DOM
        );

        target.value = verifiedNumber.value;
        target.value === target.dataset.prevalue &&
          verifiedNumber.errorMassage &&
          Notiflix.Notify.failure(verifiedNumber.errorMassage, {
            timeout: 2000,
          });
        target.dataset.prevalue = target.value;
        target.setSelectionRange(
          verifiedNumber.cursorPos,
          verifiedNumber.cursorPos
        );
        break;

      default:
    }
  };

  saveInputValue = ({ target }) => {
    const { name } = target;
    this.setState(() => {
      return { [name]: target.value };
    });
  };

  render() {
    const nameInputId = nanoid();
    const phoneInputId = nanoid();

    return (
      <form className={css.form} onSubmit={this.handeSubmit}>
        <label htmlFor={nameInputId}>
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
            id={nameInputId}
            onChange={this.contactValueVerification}
            onBlur={this.saveInputValue}
            // onKeyDown={this.contactValueVerification}
          />
        </label>
        <label htmlFor={phoneInputId}>
          Number
          <input
            type="tel"
            name="number"
            // pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits only"
            id={phoneInputId}
            required
            // data-mask="+38 (___) ___-__-__"
            data-mask={мaskPattern}
            data-prevalue=""
            placeholder={мaskPattern}
            onChange={this.contactValueVerification}
            onBlur={this.saveInputValue}
            // onKeyDown={this.contactValueVerification}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}

export default ContactForm;
