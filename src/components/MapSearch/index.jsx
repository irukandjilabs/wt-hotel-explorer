import React from 'react';
import PropTypes from 'prop-types';
import HotelsMap from './hotels-map';
import SearchForm from './search-form';

class MapSearch extends React.PureComponent {
  state = {
    submittedCenterCoords: null,
    submittedBboxSide: null,
    submittedCenterPoint: null,
  };

  constructor(props) {
    super(props);
    this.performSearch = this.performSearch.bind(this);
  }

  performSearch(centerPoint, centerCoords, bboxSide) {
    const { handleSearchFormSubmit } = this.props;
    this.setState({
      submittedCenterCoords: centerCoords,
      submittedBboxSide: parseInt(bboxSide, 10),
      submittedCenterPoint: centerPoint,
    });
    return handleSearchFormSubmit({ centerCoords, bboxSide });
  }

  render() {
    const { submittedCenterCoords, submittedBboxSide, submittedCenterPoint } = this.state;
    const { results } = this.props;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            <SearchForm onSubmit={this.performSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 map-container-lg">
            {(submittedBboxSide && (
            <h3>
Showing hotels from
              {' '}
              {submittedBboxSide}
              {' '}
KM around
              {' '}
              {submittedCenterPoint}
            </h3>
            ))}
            <HotelsMap
              centerpoint={submittedCenterCoords}
              bboxSide={submittedBboxSide}
              hotels={results}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

MapSearch.defaultProps = {
  results: [],
};

MapSearch.propTypes = {
  handleSearchFormSubmit: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
};

export default MapSearch;
