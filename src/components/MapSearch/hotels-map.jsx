import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Map, TileLayer, Marker, Popup, Circle,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

class HotelsMap extends React.PureComponent {
  state = {
    zoom: 10, // TODO roughly adjust by provided radius
  };

  render() {
    const { centerpoint, radius, hotels } = this.props;
    const { zoom } = this.state;
    const pins = hotels.map(h => (
      <Marker key={h.id} position={[h.location.latitude, h.location.longitude]}>
        <Popup>
          <div className="map-popup">
            <h4><Link to={`/hotels/${h.id}`}>{h.name}</Link></h4>
            {h.address && h.address.line2 && <p>{h.address.line2}</p>}
            {h.address && h.address.postalCode && <p>{h.address.postalCode}</p>}
            {h.address && h.address.city && <p>{h.address.city}</p>}
            {h.address && h.address.country && <p>{h.address.country}</p>}
          </div>
        </Popup>
      </Marker>
    ));

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
        {pins}
      </Map>
    );
  }
}

HotelsMap.defaultProps = {
  centerpoint: null,
  radius: null,
  hotels: [],
};

HotelsMap.propTypes = {
  centerpoint: PropTypes.instanceOf(Array),
  radius: PropTypes.number,
  hotels: PropTypes.instanceOf(Array),
};

export default HotelsMap;
