import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { BtnCSS, ParagraphCSS } from 'components/Styles.styles';

const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const isNameAlreadyExists = contacts.some(contact => contact.name === name);

    if (isNameAlreadyExists) {
      alert(`${name} is already in contacts.`);
    } else {
      addContact(name, number);
      setName('');
      setNumber('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <ParagraphCSS>Name</ParagraphCSS>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <ParagraphCSS>Phone Number</ParagraphCSS>
      <input
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <BtnCSS>
        <button type="submit" onClick={handleSubmit}>
          Add contact
        </button>
      </BtnCSS>
    </form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  addContact: PropTypes.func.isRequired,
};
