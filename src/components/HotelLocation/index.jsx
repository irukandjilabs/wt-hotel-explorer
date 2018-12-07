import React from 'react';
import PropTypes from 'prop-types';

import {
  Map, TileLayer, Marker, Popup,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import countryList from '../../assets/country-list.json';

const indexedCountryList = countryList.reduce((acc, c) => {
  acc[c.code] = c.name;
  return acc;
}, {});

const Address = ({ name, address }) => (
  <React.Fragment>
    <h4>{name}</h4>
    <p>
      {address.line1 && (
      <span>
        {address.line1}
        <br />
      </span>
      )}
      {address.line2 && (
      <span>
        {address.line2}
        <br />
      </span>
      )}
      {address.city && (
      <span>
        {address.city}
        {address.state || address.postalCode ? ',' : ''}
        {address.state && (
          <React.Fragment>
            {' '}
            {address.state}
          </React.Fragment>
        )}
        {address.postalCode && (
          <React.Fragment>
            {' '}
            {address.postalCode}
          </React.Fragment>
        )}
        <br />
      </span>
      )}
      {address.country && (
      <span>
        {indexedCountryList[address.country]
          ? indexedCountryList[address.country]
          : address.country}
        <br />
      </span>
      )}
    </p>
  </React.Fragment>
);

Address.propTypes = {
  name: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(Object),
  ]).isRequired,
  address: PropTypes.instanceOf(Object).isRequired,
};


class LocationMap extends React.PureComponent {
  state = {
    zoom: 19,
  };

  render() {
    const { location, name, address } = this.props;
    const { zoom } = this.state;
    const position = [location.latitude, location.longitude]; // TEST [52.531015, 13.384402];

    // Set path to marker icon
    delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    return (
      <Map center={position} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            <div className="map-popup">
              <Address name={name} address={address} />
            </div>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

LocationMap.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.instanceOf(Object).isRequired,
};

const HotelLocation = ({ name, location, address }) => (
  <div>
    <LocationMap location={location} address={address} name={name} />
    <Address address={address} name={name} />
  </div>
);

HotelLocation.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.instanceOf(Object).isRequired,
  address: PropTypes.instanceOf(Object).isRequired,
};

export default HotelLocation;

export {
  Address,
  LocationMap,
};
