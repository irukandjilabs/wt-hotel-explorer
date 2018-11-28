import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import AddressTypeahead from './address-typeahead';
import HotelsMap from './hotels-map';

class MapSearch extends React.PureComponent {
  state = {
    isSubmitting: false,
    centerCoords: null,
    radius: 20,
  };

  examples = {
    cluj: {
      centerpoint: 'Cluj-Napoca, Romania',
      centerCoords: [46.770066, 23.600819],
      radius: 30,
    },
    sebes: {
      centerpoint: 'Sebeș, Romania',
      centerCoords: [45.955686, 23.565040],
      radius: 50,
    },
  }

  constructor(props) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.setExample = this.setExample.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  setExample(ex) {
    if (this.examples[ex]) {
      this.performSearch(this.examples[ex].centerCoords, this.examples[ex].radius);
    }
  }

  performSearch(centerCoords, radius) {
    const { handleSearchFormSubmit } = this.props;
    this.setState({
      submittedCenterCoords: centerCoords,
      submittedRadius: parseInt(radius, 10),
    });
    return handleSearchFormSubmit({ centerCoords, radius });
  }

  doSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
    });

    const { centerCoords, radius } = this.state;
    this.performSearch(centerCoords, radius)
      .then(() => {
        this.setState({
          isSubmitting: false,
        });
      });
  }

  handleRadiusChange(e) {
    this.setState({
      radius: e.target.value,
    });
  }

  render() {
    const {
      isSubmitting, submittedCenterCoords, submittedRadius, radius, centerCoords,
    } = this.state;
    const examples = Object.keys(this.examples).map(e => (<button type="button" key={e} className="btn btn-dark btn-sm mr-1" onClick={() => this.setExample(e)}>{`${this.examples[e].radius} km around ${this.examples[e].centerpoint}`}</button>));
    const { results } = this.props;

    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-12">
            {isSubmitting && <Loader block={100} label="Submitting..." />}
            {!isSubmitting && (
            <form className="mb-2" onSubmit={this.doSubmit}>
              <div className="form-row">
                <div className="col-md-6">
                  <label htmlFor="centerpoint">Hotels near</label>
                  <AddressTypeahead
                    onChange={(val) => {
                      if (val.length && val[0].geometry && val[0].geometry.coordinates) {
                        this.setState({
                          centerCoords: val[0].geometry.coordinates.reverse(),
                        });
                      }
                    }}
                    inputProps={{ name: 'centerpoint', id: 'centerpoint' }}
                  />
                </div>
                <div className="col-md-3">
                  <label htmlFor="radius">Radius (km)</label>
                  <input
                    type="number"
                    min="5"
                    className="form-control"
                    name="radius"
                    id="radius"
                    value={radius}
                    onChange={this.handleRadiusChange}
                    placeholder="20"
                  />
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary form-control my-1"
                    disabled={!radius || !centerCoords}
                  >
Search
                  </button>
                </div>
              </div>
              <p>
                <strong className="mr-1">Examples:</strong>
                {examples}
              </p>
            </form>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 map-container-lg">
            <HotelsMap
              centerpoint={submittedCenterCoords}
              radius={submittedRadius}
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
