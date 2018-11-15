import dayjs from 'dayjs';

const baseDate = dayjs().day() <= 3 ? dayjs() : dayjs().set('day', 0).add(7, 'days');
const defaultArrival = dayjs(baseDate).set('day', 5).startOf('day');
const defaultDeparture = dayjs(baseDate).set('day', 7).startOf('day');


const defaultState = {
  guest: {
    arrival: defaultArrival.format('YYYY-MM-DD'),
    departure: defaultDeparture.format('YYYY-MM-DD'),
    guests: [],
    helpers: {
      numberOfGuests: 0,
      lengthOfStay: defaultDeparture.diff(defaultArrival, 'days'),
      arrivalDateDayjs: defaultArrival,
      departureDateDayjs: defaultDeparture,
    },
  },
  hotel: {}, // rooms, cancellationFees
};

const reducer = (state = defaultState, action) => {
  let arrivalDateDayjs;
  let departureDateDayjs;
  let lengthOfStay;
  let numberOfGuests;
  let updatedHotel;
  let guests;
  switch (action.type) {
    case 'SET_GUEST_DATA':
      arrivalDateDayjs = dayjs(action.payload.arrival);
      departureDateDayjs = dayjs(action.payload.departure);
      lengthOfStay = departureDateDayjs.diff(arrivalDateDayjs, 'days');
      guests = action.payload.guests ? action.payload.guests.map((g, i) => Object.assign(g, { id: `guest-${i}` })) : [];
      numberOfGuests = guests.length;
      return Object.assign({}, state, {
        guest: {
          ...action.payload,
          guests,
          helpers: {
            numberOfGuests,
            lengthOfStay,
            arrivalDateDayjs,
            departureDateDayjs,
          },
        },
      });
    case 'ADD_ROOM_TYPE':
      updatedHotel = state.hotel && state.hotel.id === action.payload.hotelId ? state.hotel : {
        id: action.payload.hotelId,
        rooms: [],
        cancellationFees: [],
      };
      updatedHotel.rooms.push({
        id: action.payload.roomTypeId,
        guestInfoIds: [],
      });
      return Object.assign({}, state, {
        hotel: updatedHotel,
      });
    case 'SET_CANCELLATION_FEES':
      updatedHotel = state.hotel && state.hotel.id === action.payload.hotelId ? state.hotel : {
        id: action.payload.hotelId,
        rooms: [],
        cancellationFees: [],
      };
      return Object.assign({}, state, {
        hotel: Object.assign({}, updatedHotel, {
          cancellationFees: action.payload.fees,
        }),
      });
    default:
      return state;
  }
};

export default reducer;
