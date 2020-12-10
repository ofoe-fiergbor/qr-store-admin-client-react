const initialState = {
  merchants: null,
  userMerchants: null,
};

const merchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ALL_MERCHANTS":
      return {
        ...state,
        merchants: action.payload,
      };
    case "USER_MERCHANTS":
      return {
        ...state,
        userMerchants: action.payload,
      };
    default:
      return state;
  }
};

export default merchReducer;
