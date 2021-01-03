import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../Utility/axios'
import cssClasses from './Order.module.scss'
import Order from './Order/Order'
import * as MessageActions from '../../../Store/messageActions'
import * as AuthActions from '../../../Store/authActions'
import Loader from '../../UI/loader'

export default (props)=>{
   const [orders,setOrders] = useState([])
   const [loading,setLoading] = useState(false)
   const token = useSelector(state=>state.auth.token)
   const dispatch = useDispatch();

   const detailsHandler = (orders)=>{
      dispatch(MessageActions.setModal('ID: '+orders._id,orders.orderDetails.products,orders.orderDetails.totalPrice,'Order Details',()=>{dispatch(MessageActions.hideMessage())},'Close',['Cart Total Rs.'+orders.orderDetails.totalPrice]))
   } 
   
   useEffect(()=>{
        setLoading(true)
        axios.get('/getorders',{headers:{
            Authorization:"Bearer "+token}})
             .then(data=>{
                setLoading(false)
                console.log('data',data)
                setOrders(data.data.orders)
               
             })
             .catch(err=>{
                setLoading(false)
                console.log(err.response)
                dispatch(MessageActions.showMessage('Somenthing Went Wrong please try agian later'))
                dispatch(AuthActions.logout())
                
             })
   },[token,dispatch])

   return  <div className = {cssClasses.Content}>
       <h2>Orders</h2>
       <hr></hr>
       {loading?<Loader></Loader>:orders.length>0&&orders.map((order,id)=>{
           return <Order Id = {order._id} key={id} status = {order.status} totalPrice = {order.orderDetails.totalPrice} date = {new Date(order.createdAt).toDateString()} clicked = {()=>{detailsHandler(order)}} ></Order>
       })}
       
       </div>
}