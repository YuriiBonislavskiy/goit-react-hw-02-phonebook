import PropTypes from 'prop-types';
import css from './Filter.module.css';

const ContactsFilter = ({ filter, onChangeFilter }) => {
  return (
    <span>
      <p>Find contacts by name</p>
      <input
        className={css.filter}
        type="text"
        name="contactsFilter"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={onChangeFilter}
      >
        {filter}
      </input>
    </span>
  );
};

ContactsFilter.protoType = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactsFilter;
