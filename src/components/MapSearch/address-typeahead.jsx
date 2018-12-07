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
    const { isLoading, options, selected } = this.state;
    const { onChange, defaultSelected, inputProps } = this.props;

    let opts = options;
    if (!opts.length && selected && selected.length) {
      opts = selected;
    }
    if (!opts.length && defaultSelected && defaultSelected.length) {
      opts = defaultSelected;
    }

    return (
      <AsyncTypeahead
        isLoading={isLoading}
        onChange={(values) => {
          this.setState({ selected: values });
          onChange(values);
        }}
        labelKey={opt => `${opt.properties.city || opt.properties.name}, ${opt.properties.country} (${opt.properties.osm_value})`}
        onSearch={(query) => {
          this.setState({ isLoading: true });
          this.resolveQuery(query);
        }}
        options={opts}
        selected={selected || defaultSelected}
        defaultSelected={defaultSelected}
        inputProps={inputProps}
      />
    );
  }
}

AddressTypeahead.defaultProps = {
  inputProps: {},
  defaultSelected: [],
};

AddressTypeahead.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultSelected: PropTypes.instanceOf(Array),
  inputProps: PropTypes.instanceOf(Object),
};

export default AddressTypeahead;
