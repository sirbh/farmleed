import React, { useState } from "react";
import { useDispatch } from "react-redux";
import cssClasses from "./Product.module.scss";
import * as cartAction from '../../../Store/cartActions'
import {backEndUrl} from '../../../appConstants'


const Products =  (props) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  const clickHandler = ()=>{
    if(quantity === 0)
    {
      return
    }
    dispatch(cartAction.addItem({productID:props._id,itemQuantity:quantity}));
    setQuantity(0);
    
  }
  return (
    <div className={cssClasses.Product}>
      <img src={backEndUrl+props.imageUrl} alt="img"></img>
      <p className = {cssClasses.title}>{props.title}</p>
      <p style={{ color: "red" }}>Rs. {props.price} /-</p>
      <div className={cssClasses.CartBtn}>
        <button
          onClick={() => {
            setQuantity((prev) => prev + 1);
          }}
        >
          +
        </button>
        <p>{quantity}</p>
        <button
          onClick={() => {
            setQuantity((prev) => (prev <= 0 ? prev : prev - 1));
          }}
        >
          -
        </button>
      </div>
      <button onClick = {clickHandler}>Add to Cart</button>
    </div>
  );
};

export default Products
