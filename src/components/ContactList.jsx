import React from 'react';
import { PropTypes } from 'prop-types';
import { LiCSS, UlCSS } from 'components/Styles.styles';

class ContactList extends React.Component {
    handleDelete = (contactId) => {
      this.props.deleteContact(contactId);
    };
  
    render() {
      const { contacts } = this.props;
  
      return (
        <UlCSS>
          {contacts.map((contact) => (
            <LiCSS key={contact.id}>
              <span>{contact.name}: </span>
              <span>{contact.number} </span>
              <button onClick={() => this.handleDelete(contact.id)}>Delete</button>
            </LiCSS>
          ))}
        </UlCSS>
      );
    }
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