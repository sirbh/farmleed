import * as actions from "./actions";

const initialState = {
  isAuth: false,
  token:null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN: {
      return {
        isAuth: true,
        token: action.payload.token
      };
    }
    case actions.LOGOUT: {
      return {
        isAuth: false,
        token:null
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer
