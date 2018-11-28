import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import selectors from '../selectors';
import actions from '../actions';

import ScrollToTopOnMount from '../components/ScrollToTopOnMount';
import MapSearch from '../components/MapSearch';

const SearchOnMap = ({ handleSearchFormSubmit, results }) => (
  <React.Fragment>
    <ScrollToTopOnMount />
    <MapSearch handleSearchFormSubmit={handleSearchFormSubmit} results={results} />
  </React.Fragment>
);

SearchOnMap.defaultProps = {
  results: [],
};

SearchOnMap.propTypes = {
  handleSearchFormSubmit: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
};

export default connect(
  (state) => {
    const filterHotels = selectors.hotels.makeHotelFilterByIds();
    const searchResults = selectors.search.getResults(state);
    return {
      results: filterHotels(state, searchResults),
    };
  },
  dispatch => ({
    handleSearchFormSubmit: values => dispatch(actions.search.byLocation(values)),
  }),
)(SearchOnMap);
