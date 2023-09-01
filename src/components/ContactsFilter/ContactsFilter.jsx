import css from './ContactsFilter.module.css';

const contactsFilter = ({ filter, onChange }) => {
  return (
      <input className={css.filter}
      type="text"
      name="contactsFilter"
      pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
      title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
      onChange={onChange}
    >
      {filter}
    </input>
  );
};

export default contactsFilter;
