import React, { useEffect, useState } from "react";
import Product from "./Orders/Order";
import pic1 from "../../Images/photo.jpg";
import pic2 from "../../Images/photo1.jpg";
import pic3 from "../../Images/photo2.jpg";
import pic4 from "../../Images/photo3.jpg";
import pic5 from "../../Images/photo4.jpg";
import cssClasses from "./OrderDetails.module.scss";
import { useSelector } from "react-redux";
import axios from "../Utility/axios";

export default (props) => {

  return (
    <div className={cssClasses.Container}>
      <div className={cssClasses.ProductSection}>
  <h3>{props.heading}</h3>
        <hr></hr>
        <table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>UNIT PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL PRICE</th>
            </tr>
          </thead>
          <tbody>
            {props.productList &&
              props.productList.map((item, i) => (
                <Product {...item} key={i}></Product>
              ))}
          </tbody>
        </table>
        <hr></hr>
        <div className = {cssClasses.cartTotal}>
          <h3>Cart Total</h3>
              <h3>Rs.{props.totalPrice}</h3>
        </div>
        <hr></hr>
      </div>
    </div>
  );
};
