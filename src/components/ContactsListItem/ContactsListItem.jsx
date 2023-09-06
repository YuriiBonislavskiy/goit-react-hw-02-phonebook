import PropTypes from 'prop-types';
import css from './ContactsListItem.module.css';

export const ContactsListItem = ({ name, number, onDeleteContact }) => {
  return  <span>
      {name}: {number}
      <button
        className={css.deletebutton}
        type="button"
        onClick={onDeleteContact}
      >
        Delete
      </button>
    </span>
};

ContactsListItem.prototype = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactsListItem;
