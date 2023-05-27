import React from 'react';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { BodyDivCSS, DivCSS } from 'components/Styles.styles'

export class App extends React.Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    filter: ''
  };

  componentDidMount() {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      const parsedContacts = JSON.parse(storedContacts);
      if (parsedContacts.length > 0) {
        this.setState({ contacts: parsedContacts });
      }
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  addContact = (name, number) => {
      const newContact = {
      id: nanoid(),
      name,
      number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact]
    }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== contactId),
    }));
  };

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <BodyDivCSS>
        <DivCSS>
          <h1>Phonebook</h1>
          <ContactForm contacts={contacts} addContact={this.addContact} />
          <h2>Contacts</h2>
          <Filter filter={filter} onChange={this.handleFilterChange} />
          <ContactList contacts={filteredContacts} deleteContact={this.deleteContact}/>
        </DivCSS>
      </BodyDivCSS>
    );
  }
}
