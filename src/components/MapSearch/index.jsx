import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import AddressTypeahead from './address-typeahead';
import HotelsMap from './hotels-map';

class MapSearch extends React.PureComponent {
  state = {
    isSubmitting: false,
    centerCoords: null,
    bboxSide: 20,
  };

  examples = {
    cluj: {
      centerpoint: 'Cluj-Napoca, Romania',
      centerCoords: [46.770066, 23.600819],
      bboxSide: 30,
    },
    sebes: {
      centerpoint: 'Sebeș, Romania',
      centerCoords: [45.955686, 23.565040],
      bboxSide: 50,
    },
  }

  constructor(props) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
    this.handleBboxSideChange = this.handleBboxSideChange.bind(this);
    this.setExample = this.setExample.bind(this);
    this.performSearch = this.performSearch.bind(this);
  }

  setExample(ex) {
    if (this.examples[ex]) {
      this.performSearch(this.examples[ex].centerCoords, this.examples[ex].bboxSide);
    }
  }

  performSearch(centerCoords, bboxSide) {
    const { handleSearchFormSubmit } = this.props;
    this.setState({
      submittedCenterCoords: centerCoords,
      submittedBboxSide: parseInt(bboxSide, 10),
    });
    return handleSearchFormSubmit({ centerCoords, bboxSide });
  }

  doSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
    });

    const { centerCoords, bboxSide } = this.state;
    this.performSearch(centerCoords, bboxSide)
      .then(() => {
        this.setState({
          isSubmitting: false,
        });
      });
  }

  handleBboxSideChange(e) {
    this.setState({
      bboxSide: e.target.value,
    });
  }

  render() {
    const {
      isSubmitting, submittedCenterCoords, submittedBboxSide, bboxSide, centerCoords,
    } = this.state;
    const examples = Object.keys(this.examples).map(e => (<button type="button" key={e} className="btn btn-dark btn-sm mr-1" onClick={() => this.setExample(e)}>{`${this.examples[e].bboxSide} km around ${this.examples[e].centerpoint}`}</button>));
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
                  <label htmlFor="bboxSide">Search box side size (km)</label>
                  <input
                    type="number"
                    min="5"
                    max="200"
                    className="form-control"
                    name="bboxSide"
                    id="bboxSide"
                    value={bboxSide}
                    onChange={this.handleBboxSideChange}
                    placeholder="20"
                  />
                </div>
                <div className="col-md-3">
                  <button
                    type="submit"
                    className="btn btn-primary form-control my-1"
                    disabled={!bboxSide || !centerCoords}
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
