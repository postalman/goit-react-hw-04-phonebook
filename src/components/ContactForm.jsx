import React from 'react';
import { PropTypes } from 'prop-types';
import { BtnCSS, ParagraphCSS } from 'components/Styles.styles';

class ContactForm extends React.Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, number } = this.state;

    const isNameAlreadyExists = this.props.contacts.some(
      contact => contact.name === name
    );

    if (isNameAlreadyExists) {
      alert(`${name} is already in contacts.`);
    } else {
      this.props.addContact(name, number);
      this.setState({ name: '', number: '' });
    }
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <ParagraphCSS>Name</ParagraphCSS>
        <input
          type="text"
          name="name"
          value={name}
          onChange={this.handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <ParagraphCSS>Phone Number</ParagraphCSS>
        <input
          type="tel"
          name="number"
          value={number}
          onChange={this.handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <BtnCSS>
          <button type="submit" onClick={this.handleSubmit}>
            Add contact
          </button>
        </BtnCSS>
      </form>
    );
  }
}

export default ContactForm;

ContactForm.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired
    })
  ).isRequired,
  addContact: PropTypes.func.isRequired
};
