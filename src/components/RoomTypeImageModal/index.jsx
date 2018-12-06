import React from 'react';
import PropTypes from 'prop-types';
import ImageList from '../ImageList';

const RoomTypeImageModal = ({ roomType, index }) => (
  <div className="modal modal--carousel" id={`roomModal-${index + 1}`} tabIndex={`-${index + 1}`} role="dialog" data-backdrop="false">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title animated fadeIn">{roomType.name}</h5>
          <button type="button" className="close animated fadeIn" data-dismiss="modal" aria-label="Close">
            <i className="mdi mdi-close" />
          </button>
        </div>
        <div className="modal-body d-flex align-items-center animated fadeIn">
          <ImageList list={roomType.images} withIndicators />
        </div>
      </div>
    </div>
  </div>
);

RoomTypeImageModal.defaultProps = {
  index: 0,
};

RoomTypeImageModal.propTypes = {
  roomType: PropTypes.instanceOf(Object).isRequired,
  index: PropTypes.number,
};

export default RoomTypeImageModal;
