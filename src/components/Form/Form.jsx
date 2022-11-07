import { Component } from 'react';
import PT from 'prop-types';

import css from './Form.module.css';

export class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = e => {
    const { name, value } = e.currentTarget;

    this.setState({ [name]: value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    const { handleInputChange, handleFormSubmit } = this;

    return (
      <form className={css.phonebook} onSubmit={handleFormSubmit}>
        <label className={css.label}>
          Name
          <input
            className={css.field}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label className={css.label}>
          Phone number
          <input
            className={css.field}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleInputChange}
            required
          />
        </label>
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  onSubmit: PT.func.isRequired,
};

export default Form;
