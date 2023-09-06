import PropTypes from 'prop-types';
import css from './ContactList.module.css';
import ContactsListItem from '../ContactsListItem';

const ContactsList = ({ contacts, onDeleteContact }) => {
  return (
    <ul className={css.contactlist}>
      {contacts.map(contact => {
        return (
          <ContactsListItem
            contact={contact}
            onDeleteContact={onDeleteContact}
            key={contact.id}
          />
        );
      })}
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
