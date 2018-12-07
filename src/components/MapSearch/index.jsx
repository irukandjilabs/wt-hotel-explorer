import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

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
    // Photon and Leaflet use lng,lat and lat,lng :(
    // We need to do a copy to prevent reversing back and forth
    const revertedCoords = [].concat(centerCoords).reverse();
    this.setState({
      submittedCenterCoords: revertedCoords,
      submittedBboxSide: parseInt(bboxSide, 10),
      submittedCenterPoint: centerPoint,
    });
    return handleSearchFormSubmit({
      centerCoords: revertedCoords,
      bboxSide,
    });
  }

  render() {
    const { submittedCenterCoords, submittedBboxSide, submittedCenterPoint } = this.state;
    const { results, sortedResults } = this.props;
    const sortedResultsRows = sortedResults.map(s => (
      <tr key={s.id}>
        <td><Link to={`hotels/${s.id}`}>{s.hotel.name}</Link></td>
        <td>
          {`${s.score.value.toFixed(2)} KM`}
        </td>
      </tr>
    ));

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
              <h3>{`Showing hotels from ${submittedBboxSide} KM around ${submittedCenterPoint}`}</h3>
            ))}
            <HotelsMap
              centerpoint={submittedCenterCoords}
              centerpointName={submittedCenterPoint}
              bboxSide={submittedBboxSide}
              hotels={results}
            />
          </div>
        </div>
        {!!sortedResults.length && (
        <div className="row mt-2">
          <div className="col-md-12">
            <table className="table table-striped table-responsive-sm">
              <thead>
                <tr>
                  <th>Hotel name</th>
                  <th>{`Distance from ${submittedCenterPoint}`}</th>
                </tr>
              </thead>
              <tbody>
                {sortedResultsRows}
              </tbody>
            </table>
          </div>
        </div>
        )}
      </React.Fragment>
    );
  }
}

MapSearch.defaultProps = {
  results: [],
  sortedResults: [],
};

MapSearch.propTypes = {
  handleSearchFormSubmit: PropTypes.func.isRequired,
  results: PropTypes.instanceOf(Array),
  sortedResults: PropTypes.instanceOf(Array),
};

export default MapSearch;
