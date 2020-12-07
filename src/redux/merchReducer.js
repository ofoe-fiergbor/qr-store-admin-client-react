const initialState = {
  merchants: null,
};

const merchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_MERCHANTS":
      return {
        ...state,
        merchants: action.payload,
      };
    default:
      return state;
  }
};

export default merchReducer;
