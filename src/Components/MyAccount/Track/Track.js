import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../Utility/axios';
import cssClasses from './Track.module.scss'
import Tracker from './Tracker/Tracker'
import * as MessageActions from '../../../Store/messageActions'
import TLoader from  '../../UI/TLoader'
import Loader from '../../UI/loader'


export default (props)=>{
   
   const [pendingOrders, setPendingOrders] = useState([]);
   const [loading,setLoading] = useState(false);
   const [requestLoader,setRequestLoader] = useState(false);
   const token = useSelector(state=>state.auth.token)
   const dispatch = useDispatch()

   const detailsHandler = (orders)=>{
     dispatch(MessageActions.setModal('ID: '+orders._id,orders.orderDetails.products,orders.orderDetails.totalPrice,'Order Details',()=>{dispatch(MessageActions.hideMessage())},'Close',['Cart Total Rs.'+orders.orderDetails.totalPrice]))
  }

  const cancalHandler = (orders,index)=>{
     dispatch(MessageActions.setModal('ID: '+orders._id,orders.orderDetails.products,orders.orderDetails.totalPrice,'Cancal Order',()=>{cancalOrder(orders._id,index)},'Confirm',['Cart Total Rs.'+orders.orderDetails.totalPrice]))
  }

  const cancalOrder = (id,index)=>{
      
       setRequestLoader(true)
       axios.post('/updateorder',{
            id
       },{
            headers:{
               Authorization:"Bearer "+token
            }
       }).then(data=>{
            setRequestLoader(false)
            setPendingOrders(prevOrders=> {
                  const orders = [...prevOrders]
                  orders[index].status.flag = -1;
                  return orders
            })
            dispatch(MessageActions.showMessage('Order Cancaled Successfully'))
           
       }).catch(err=>{
            setRequestLoader(false)
          
       })
  }

   useEffect(()=>{
        setLoading(true)
        axios.get('/getpendingorders',{headers:{
          Authorization:"Bearer "+token}})
          .then(data=>{
               setLoading(false)
               setPendingOrders(data.data.pendingOrders)

          })
          .catch(err=>{
               setLoading(false)
              
          })
   },[token])
   
   return  <>
   {requestLoader&&<TLoader></TLoader>}
   <div className = {cssClasses.Content}>
       <h2>Track Orders</h2>
       <hr></hr>
       <div>
            {pendingOrders.length===0&&!loading?<h1 style = {{marginTop:'100px'}}>No Active Orders</h1>:null}
            {loading?<Loader></Loader>:pendingOrders.map((order,id)=>{
                 return <Tracker key = {id} Id = {order._id} totalPrice = {order.orderDetails.totalPrice} statusFlag = {order.status.flag} clicked = {()=>{detailsHandler(order)}} cancaled = {()=>{cancalHandler(order,id)}}></Tracker>
            })}
            
       </div>
       </div>
   </>
    
}