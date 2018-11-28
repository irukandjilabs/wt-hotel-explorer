import { createActionThunk } from 'redux-thunk-actions';

import {
  HttpError,
  Http404Error,
  HttpBadRequestError,
  HttpInternalServerError,
} from '../services/errors';

export const translateNetworkError = (status, code, message) => {
  if (status === 400) {
    return new HttpBadRequestError(code, message);
  }
  if (status === 404) {
    return new Http404Error(code, message);
  }
  if (status === 500) {
    return new HttpInternalServerError(code, message);
  }
  const e = new HttpError(code, message);
  e.status = status;
  return e;
};

export const byLocation = createActionThunk('SEARCH_HOTELS_BY_LOCATION', ({ centerCoords, radius }) => {
  // TODO handle eventual pagination
  const url = `${process.env.WT_SEARCH_API}/hotels/?location=${centerCoords[0]},${centerCoords[1]}:${radius}`;
  return fetch(url)
    .then((response) => {
      if (response.status > 299) {
        throw translateNetworkError(response.status, 'Cannot search hotels!');
      }
      return response.json();
    });
});

export default {
  byLocation,
};
