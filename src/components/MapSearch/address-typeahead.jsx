import React from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';

class AddressTypeahead extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      options: [],
    };
    this.resolveQuery = this.resolveQuery.bind(this);
  }

  resolveQuery(query) {
    fetch(`https://photon.komoot.de/api/?q=${query}`)
      .then(resp => resp.json())
      .then((json) => {
        this.setState({
          isLoading: false,
          options: json.features,
        });
      });
  }

  render() {
    const { isLoading, options } = this.state;
    const { onChange, inputProps } = this.props;
    return (
      <AsyncTypeahead
        isLoading={isLoading}
        onChange={onChange}
        labelKey={opt => `${opt.properties.city || opt.properties.name}, ${opt.properties.country} (${opt.properties.osm_value})`}
        onSearch={(query) => {
          this.setState({ isLoading: true });
          this.resolveQuery(query);
        }}
        options={options}
        inputProps={inputProps}
      />
    );
  }
}

AddressTypeahead.defaultProps = {
  inputProps: {},
};

AddressTypeahead.propTypes = {
  onChange: PropTypes.func.isRequired,
  inputProps: PropTypes.instanceOf(Object),
};

export default AddressTypeahead;
