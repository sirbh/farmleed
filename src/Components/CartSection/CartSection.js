import React, { useEffect, useState } from "react";
import Product from "./CartItem/CartItem";
import pic1 from "../../Images/photo.jpg";
import pic2 from "../../Images/photo1.jpg";
import pic3 from "../../Images/photo2.jpg";
import pic4 from "../../Images/photo3.jpg";
import pic5 from "../../Images/photo4.jpg";
import cssClasses from "./CartSection.module.scss";
import { useDispatch, useSelector } from "react-redux";
import * as MessageActions from '../../Store/messageActions'
import * as AuthActions from '../../Store/authActions'
import axios from "../Utility/axios";
import TLoader from '../UI/TLoader'
import { useHistory } from "react-router-dom";


export default (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isAuth = useSelector(state=>state.auth.isAuth)
  const token = useSelector(state=>state.auth.token)
  const [productList, setProductList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const dispatch = useDispatch()
  const [loading,setLoading] = useState(false)
  const history = useHistory();

 




  const confrimOrder = ()=>{
    setLoading(true)
    axios.get('/confirmorder',{headers:{
      Authorization:"Bearer "+token}})
      .then(resp=>{
        setLoading(false)
        dispatch(MessageActions.setModal('Order Id: '+resp.data.orderId,resp.data.cartDetails,resp.data.totalPrice,'Order Recieved',()=>{history.push('/dashboard/track');dispatch(MessageActions.hideMessage())},'Track Order',['Cart Total Rs.'+resp.data.totalPrice]))
      })
      .catch(err=>{
        setLoading(false)
        if(err.response.status===401)
        {
          dispatch(AuthActions.logout())
        }
        dispatch(MessageActions.showMessage('Something Went Wrong Try to Login Again!!'))
      })

  }

  const clickHandler = ()=>{
    setLoading(true)
    if(isAuth)
    {

      axios.get('/currentorder',{headers:{
        Authorization: 'Bearer '+token
      }})
      .then(resp=>{
        setLoading(false)
    
        dispatch(MessageActions.setModal('Order Details',resp.data.cartDetails,resp.data.totalPrice,'Confirm Order',confrimOrder,'Order Now',['Cart Total Rs.'+resp.data.totalPrice]))
      })
      .catch(err=>{
        setLoading(false)
      
        if(err.response.status===401)
        {
          dispatch(AuthActions.logout())
        }
        dispatch(MessageActions.showMessage('Something Went Wrong Try to Login Again!!'))
      })
    }
    else
    {
      setLoading(false)
      props.clickHandler()
    }
  }

  useEffect(() => {
    setLoading(true)
    axios
      .post("/cart", cartItems)
      .then((data) => {
        setLoading(false)
     
        setProductList(data.data.cartDetails);
        setTotalPrice(data.data.totalPrice);
      })
      .catch((err) => {
        setLoading(false)
     
      });
  }, [cartItems, setProductList]);
  return (
    
    <div className={cssClasses.Container}>
      {loading&&<TLoader></TLoader>}
      {/* {productList.length===0&&!loading&&<h3>No products in your cart</h3>} */}
     <div className={cssClasses.ProductSection}>
        <h3>Cart Items</h3>
        <hr></hr>
        {productList.length===0&&!loading&&<h2 style = {{marginTop:'150px'}}>No products in your cart</h2>}
        {productList.length!==0&&<><table>
          <thead>
            <tr>
              <th>ITEM</th>
              <th>UNIT PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL PRICE</th>
              <th>REMOVE</th>
            </tr>
          </thead>
          <tbody>
            {productList &&
              productList.map((item, i) => (
                <Product {...item} key={i}></Product>
              ))}
          </tbody>
        </table>
        <hr></hr>
        <div className = {cssClasses.cartTotal}>
          <h3>Cart Total</h3>
              <h3>Rs.{totalPrice}</h3>
        </div>
        <hr></hr>
        <button onClick = {clickHandler}>Order Now</button></>}
      </div>
      
    </div>
  );
};
