import React from 'react';
import PropTypes from 'prop-types';
import {
  Map, TileLayer, Marker, Popup, Circle,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

/*

<Marker position={position}>
  <Popup>
    <div className="map-popup">
      <h4>{name}</h4>
      {address.line2 && <p>{address.line2}</p>}
      {address.postalCode && <p>{address.postalCode}</p>}
      {address.city && <p>{address.city}</p>}
      {address.country && <p>{address.country}</p>}
    </div>
  </Popup>
</Marker>

 */


class HotelsMap extends React.PureComponent {
  state = {
    zoom: 10, // TODO roughly adjust by provided radius
  };

  render() {
    // TODO display hotels
    const { centerpoint, radius } = this.props;
    const { zoom } = this.state;

    // Set path to marker icon
    delete L.Icon.Default.prototype._getIconUrl; // eslint-disable-line
    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });

    if (!centerpoint) {
      // WT's contact address
      return (
        <Map center={[47.174037, 8.517811]} zoom={3}>
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
          />
        </Map>
      );
    }

    return (
      <Map center={centerpoint} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.osm.org/{z}/{x}/{y}.png"
        />
        <Circle
          center={centerpoint}
          radius={radius * 1000}
        />
      </Map>
    );
  }
}

// input - list of pinned hotels
// center position
// distance for search radius

HotelsMap.defaultProps = {
  centerpoint: null,
  radius: null,
};

HotelsMap.propTypes = {
  centerpoint: PropTypes.instanceOf(Array),
  radius: PropTypes.number,
};

export default HotelsMap;
