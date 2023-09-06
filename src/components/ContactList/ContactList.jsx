import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import ContactsListItem from '../ContactsListItem';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactlist}>
      {contacts.map( ({ id, name, number }) => (
        <li className={css.contactitem} key={id}>
          <ContactsListItem
            name={name}
            number={number}
            onDeleteContact={() => onDeleteContact(id)}
          />
        </li>
      ))}
    </ul>
  );
};

ContactsList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsList;
