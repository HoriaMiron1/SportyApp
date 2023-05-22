export const initialState = {
  user: {},
};

export const actionTypes = {
  SET_USER: 'SET_USER',
};

function reducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

export default reducer;
