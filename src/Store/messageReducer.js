import * as actions from "./actions";

const initialState = {
  message:'',
  showMessage:false,
  isModal:true,
  modalData :{}
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SHOWMESSAGE: {
      return {
        message: action.payload.message,
        showMessage:true,
        isModal:false,
        modalData:{}
      };
    }
    case actions.HIDEMESSAGE:{
      return {
        message:'',
        showMessage:false,
        isModal:false,
        modalData:{}
      }
    }
    case actions.SET_MODAL:{
      return {
        message:'',
        isModal:true,
        showMessage:true,
        modalData:{
          heading:action.payload.heading,
          productList:action.payload.products,
          totalPrice:action.payload.totalPrice,
          header:action.payload.header,
          btnType:action.payload.btnType,
          clickHandler:action.payload.clickHandler,
          points:action.payload.points
        }
      }
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default reducer
