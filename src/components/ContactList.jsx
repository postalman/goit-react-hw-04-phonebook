import React from 'react';
import { PropTypes } from 'prop-types';
import { LiCSS, UlCSS } from 'components/Styles.styles';

const ContactList = ({ contacts, deleteContact}) => {
  const handleDelete = (contactId) => {
    deleteContact(contactId);
  };

  return (
    <UlCSS>
      {contacts.map((contact) => (
        <LiCSS key={contact.id}>
          <span>{contact.name}: </span>
          <span>{contact.number} </span>
          <button onClick={() => handleDelete(contact.id)}>Delete</button>
        </LiCSS>
      ))}
    </UlCSS>
  );

}


 

  export default ContactList;

  ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
      })
    ).isRequired,
    deleteContact: PropTypes.func.isRequired
  };