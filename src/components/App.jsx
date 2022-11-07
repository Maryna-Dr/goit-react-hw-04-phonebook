import { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactsList, Form, Filter } from 'components';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts.length !== prevState.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onAddContact = ({ name, number }) => {
    const checkName = this.state.contacts.find(contact => {
      const nameFound = contact.name.toLowerCase().includes(name.toLowerCase());
      if (!!nameFound) {
        alert(`${name} is already in contacts`);
      }
      return nameFound;
    });

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: !!checkName
        ? [...prevState.contacts]
        : [newContact, ...prevState.contacts],
    }));
  };

  onDeleteContact = idx => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== idx),
    }));
  };

  handleFilterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  render() {
    const { filter, contacts } = this.state;
    const { onAddContact, handleFilterChange, onDeleteContact } = this;
    const normalizedFilterValue = filter.toLowerCase();

    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilterValue)
    );

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <Form onSubmit={onAddContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />
        <ContactsList contacts={visibleContacts} onDelete={onDeleteContact} />
      </div>
    );
  }
}

export default App;
