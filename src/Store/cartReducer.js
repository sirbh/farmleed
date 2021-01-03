import * as actions from "./actions";

const initialState = {
  cartItems: [], //{productID:'',itemQuantity:''}
  totalItems: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_CART:{
      return {
        cartItems:action.payload.cartItems,
        totalItems:action.payload.totalItems
      }
    }
    case actions.ADD_ITEM: {
      let itemArray = state.cartItems.map((obj) => {
        return { productID: obj.productID, itemQuantity: obj.itemQuantity };
      });
      let totalItems = state.totalItems;
      let currentItemIndex = itemArray.findIndex(
        (item) => item.productID === action.payload.productID
      );
      if (currentItemIndex < 0) {
        itemArray.push({
          productID: action.payload.productID,
          itemQuantity: action.payload.itemQuantity,
        });
        totalItems = totalItems + action.payload.itemQuantity;
        return {
          cartItems: itemArray,
          totalItems,
        };
      } else {
        itemArray[currentItemIndex].itemQuantity =
          itemArray[currentItemIndex].itemQuantity +
          action.payload.itemQuantity;
        totalItems = totalItems + action.payload.itemQuantity;
        return {
          cartItems: itemArray,
          totalItems,
        };
      }
    }
    case actions.DELETE_ITEM: {
      let elementId = action.payload.objectID
      let totalItems = state.totalItems
      let itemArray = state.cartItems.map((obj) => {
        return { productID: obj.productID, itemQuantity: obj.itemQuantity };
      });
      const elementIndex = itemArray.findIndex(ele=>ele.productID.toString()===elementId.toString())
      if(elementIndex>=0)
      {
        totalItems = totalItems-itemArray[elementIndex].itemQuantity
        itemArray.splice(elementIndex,1)
      }
      return {
        cartItems:itemArray,
        totalItems
      };
    }
    case actions.INCR_ITEM:{
      let elementId = action.payload.objectID
      let totalItems = state.totalItems
      let itemArray = state.cartItems.map((obj) => {
        return { productID: obj.productID, itemQuantity: obj.itemQuantity };
      });
      const elementIndex = itemArray.findIndex(ele=>ele.productID.toString()===elementId.toString())
      if(elementIndex>=0)
      {
        totalItems = totalItems+1
        itemArray[elementIndex].itemQuantity = itemArray[elementIndex].itemQuantity+1
      }

      return {
        cartItems:itemArray,
        totalItems
      };

    }

    case actions.DECR_ITEM:{
      let elementId = action.payload.objectID
      let totalItems = state.totalItems
      let itemArray = state.cartItems.map((obj) => {
        return { productID: obj.productID, itemQuantity: obj.itemQuantity };
      });
      const elementIndex = itemArray.findIndex(ele=>ele.productID.toString()===elementId.toString())
      if(elementIndex>=0&&itemArray[elementIndex].itemQuantity>0)
      {
        totalItems = totalItems-1
        itemArray[elementIndex].itemQuantity = itemArray[elementIndex].itemQuantity-1
      }

      return {
        cartItems:itemArray,
        totalItems
      };

    }

    default: {
      return state;
    }
  }
};

export default reducer;
