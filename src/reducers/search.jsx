const defaultState = {
  results: [],
};

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'SEARCH_HOTELS_BY_LOCATION_SUCCEEDED':
      return Object.assign({}, state, {
        results: action.payload.items.map(h => h.id),
      });
    default:
      return state;
  }
};

export default reducer;
