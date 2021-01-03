import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "../../../UI/Button";
import cssClasses from "./Order.module.scss";


export default (props) => {

  const history = useHistory()

  return (
    <div className={cssClasses.Order}>
      <h4>Order Date: {props.date}</h4>
      <h3>ID: {props.Id}</h3>
      <p>Price : {props.totalPrice}</p>
      <div>
        <button style={{ backgroundColor: "#97bc62ff" }} onClick = {props.clicked}>Details</button>
        {props.status.category==='Pending' ? (
          <button style={{ backgroundColor: "#faca0f" }} onClick ={()=>{history.push('/dashboard/track')}}>Track</button>
        ) : <p>Order {props.status.category}</p>}
      </div>
    </div>
  );
};
