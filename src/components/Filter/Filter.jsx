import PropTypes from 'prop-types';
import css from './Filter.module.css';

const Filter = ({ filter, onChangeFilter }) => {
  return (
    <span>
      <p>Find contacts by name</p>
      <input
        className={css.filter}
        type="text"
        name="contactsFilter"
        onChange={onChangeFilter}
        value={filter}
      >
      </input>
    </span>
  );
};

Filter.protoType = {
  filter: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
