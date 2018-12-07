export function getResults(state) {
  return state.search.results;
}

export function getSortedResults(state, getHotelById) {
  return state.search.sortingScores.map(s => Object.assign({}, s, {
    hotel: getHotelById(state, s.id),
  })).filter(s => !!s.hotel);
}

export default {
  getResults,
  getSortedResults,
};
