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

const paginatedFetchSearchResults = url => fetch(url)
  .then((r) => {
    if (r.status > 299) {
      throw translateNetworkError(r.status, 'Cannot search hotels!');
    }
    return r.json();
  }).then((data) => {
    if (data.next) {
      return paginatedFetchSearchResults(data.next)
        .then(s => ({
          items: data.items ? data.items.concat(s.items) : s.items,
          sortingScores: data.sortingScores
            ? data.sortingScores.concat(s.sortingScores)
            : s.sortingScores,
        }));
    }
    return data;
  });

export const byLocation = createActionThunk('SEARCH_HOTELS_BY_LOCATION', ({ centerCoords, bboxSide }) => {
  const url = `${process.env.WT_SEARCH_API}/hotels/?location=${centerCoords[0]},${centerCoords[1]}:${bboxSide}&sortByDistance=${centerCoords[0]},${centerCoords[1]}`;
  return paginatedFetchSearchResults(url);
});

export default {
  byLocation,
};
