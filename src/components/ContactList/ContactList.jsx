import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const contactsList = ({ contacts, onClick }) => {
  return (
    <ul className={css.contactlist}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li className={css.contactitem} key={id}>
            {name}: {number}
            <button
              className={css.deletebutton}
              type="button"
              data-id={id}
              onClick={onClick}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

contactsList.prototype = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onClick: PropTypes.func.isRequired,
};

export default contactsList;
