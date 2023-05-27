import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { BodyDivCSS, DivCSS } from 'components/Styles.styles';
import { useState } from 'react';

const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      if (parsedContacts.length > 0) {
        setContacts(parsedContacts);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <BodyDivCSS>
      <DivCSS>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} addContact={addContact} />
        <h2>Contacts</h2>
        <Filter filter={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={deleteContact}
        />
      </DivCSS>
    </BodyDivCSS>
  );
};

export default App;

