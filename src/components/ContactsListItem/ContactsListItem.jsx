import PropTypes from 'prop-types';
import css from './ContactsListItem.module.css';

export const ContactsListItem = ({ contacts, onDeleteContact }) => {
  return contacts.map(({ id, name, number }) => {
    return (
      <li className={css.contactitem} key={id}>
        {name}: {number}
        <button
          className={css.deletebutton}
          type="button"
          data-id={id}
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    );
  });
};

ContactsListItem.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsListItem;
