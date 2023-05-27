import { PropTypes } from 'prop-types';

const Filter = ({ filter, onChange }) => (
    <input
      type="text"
      value={filter}
      onChange={onChange}
      placeholder="Search contacts"
    />
  );

  export default Filter;

  Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
  };