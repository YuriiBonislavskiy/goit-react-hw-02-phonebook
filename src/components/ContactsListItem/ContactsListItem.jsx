import PropTypes from 'prop-types';
import css from './ContactsListItem.module.css';

export const ContactsListItem = ({
  contact,
  onDeleteContact,
  contactKey = contact.id,
}) => {
  const { id, name, number } = contact;
  return (
    <li className={css.contactitem} key={contactKey}>
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
  contactKey: PropTypes.string,
};

export default ContactsListItem;
