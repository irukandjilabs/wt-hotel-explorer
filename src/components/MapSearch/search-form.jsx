import React from 'react';
import PropTypes from 'prop-types';
import Loader from '../Loader';
import AddressTypeahead from './address-typeahead';

class SearchForm extends React.PureComponent {
  state = {
    isSubmitting: false,
    centerCoords: null,
    bboxSide: 20,
  };

  examples = {
    cluj: {
      centerPoint: 'Cluj-Napoca, Romania',
      centerCoords: [46.770066, 23.600819],
      bboxSide: 30,
    },
    sebes: {
      centerPoint: 'Sebeș, Romania',
      centerCoords: [45.955686, 23.565040],
      bboxSide: 50,
    },
  }

  constructor(props) {
    super(props);
    this.doSubmit = this.doSubmit.bind(this);
    this.handleBboxSideChange = this.handleBboxSideChange.bind(this);
    this.setExample = this.setExample.bind(this);
  }

  setExample(ex) {
    if (this.examples[ex]) {
      const { onSubmit } = this.props;
      onSubmit(
        this.examples[ex].centerPoint,
        this.examples[ex].centerCoords,
        this.examples[ex].bboxSide,
      );
    }
  }

  doSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmitting: true,
    });
    const { onSubmit } = this.props;
    const { centerCoords, centerPoint, bboxSide } = this.state;
    onSubmit(centerPoint, centerCoords, bboxSide)
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
      isSubmitting, bboxSide, centerCoords,
    } = this.state;
    const examples = Object.keys(this.examples).map(e => (<button type="button" key={e} className="btn btn-dark btn-sm mr-1" onClick={() => this.setExample(e)}>{`${this.examples[e].bboxSide} km around ${this.examples[e].centerPoint}`}</button>));

    return (
      <React.Fragment>
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
                      centerPoint: `${val[0].properties.city || val[0].properties.name}, ${val[0].properties.country} (${val[0].properties.osm_value})`,
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
                style={{ marginTop: '32px' }}
                type="submit"
                className="btn btn-primary form-control"
                disabled={!bboxSide || !centerCoords}
              >
Search
              </button>
            </div>
          </div>
          <p className="mt-1">
            <strong className="mr-1">Examples:</strong>
            {examples}
          </p>
        </form>
        )}
      </React.Fragment>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
