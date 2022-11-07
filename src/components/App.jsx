import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactsList, Form, Filter } from 'components';

import css from './App.module.css';

export default function App() {
  const recordedContacts = JSON.parse(localStorage.getItem('contacts'));

  const [contacts, setContacts] = useState(recordedContacts ?? []);
  const [filtered, setFiltered] = useState('');

  // useEffect(() => {
  //   const receivedContacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(receivedContacts);

  //   if (parsedContacts) {
  //     console.log(parsedContacts);
  //     setContacts(parsedContacts);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = (name, number) => {
    const checkName = contacts.find(contact => {
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

    setContacts(prev => (!!checkName ? [...prev] : [newContact, ...prev]));
  };

  const onDeleteContact = idx => {
    setContacts(prev => prev.filter(contact => contact.id !== idx));
  };

  const handleFilterChange = e => {
    setFiltered(e.currentTarget.value);
  };

  const normalizedFilterValue = filtered.toLowerCase();

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterValue)
  );

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <Form onSubmit={onAddContact} />
      <h2>Contacts</h2>
      <Filter value={filtered} onChange={handleFilterChange} />
      <ContactsList contacts={visibleContacts} onDelete={onDeleteContact} />
    </div>
  );
}
