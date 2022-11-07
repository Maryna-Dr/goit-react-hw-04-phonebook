import PT from 'prop-types';

import css from './ContactsList.module.css';

export default function ContactsList({ contacts, onDelete }) {
  return (
    <ol className={css.list}>
      {contacts.map(contact => (
        <li className={css.item} key={contact.id}>
          <span className={css.text}>
            {contact.name}: {contact.number}
          </span>
          <button
            className={css.btn}
            type="button"
            onClick={() => onDelete(contact.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ol>
  );
}

ContactsList.propTypes = {
  contacts: PT.arrayOf(
    PT.shape({
      id: PT.string.isRequired,
      name: PT.string.isRequired,
      number: PT.string.isRequired,
    })
  ),
};
