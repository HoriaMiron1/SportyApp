export const initialState = {
  user: {},
  field: '',
  daysOfTheWeek: '',
  timeInterval: '',
};

export const actionTypes = {
  SET_USER: 'SET_USER',
  SET_FIELD: 'SET_FIELD',
  SET_DAYSOFTHEWEEEK: 'SET_DAYSOFTHEWEEEK',
  SET_TIMEINTERVAL: 'SET_TIMEINTERVAL',
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_FIELD:
      return {
        ...state,
        field: action.field,
      };
    case actionTypes.SET_DAYSOFTHEWEEEK:
      return {
        ...state,
        daysOfTheWeek: action.daysOfTheWeek,
      };
    case actionTypes.SET_TIMEINTERVAL:
      return {
        ...state,
        timeInterval: action.timeInterval,
      };
    default:
      return state;
  }
}

export default reducer;
