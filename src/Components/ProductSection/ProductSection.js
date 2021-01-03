import React, { useEffect, useState} from "react";
import Product from "./Product/Product";
import cssClasses from './ProductSection.module.scss'
import withErrorHandler from '../HOC/withErrorHandler'
import {useDispatch, useSelector} from "react-redux";
import * as itemAction from '../../Store/itemActions'
import Loader from '../UI/loader'
import axios from '../Utility/axios'



const ProductSection =  (props) => {
  const dispatch = useDispatch();
  const loading = useSelector(state=>state.items.loading)
  const products = useSelector(state=>state.items.Items)
  


  // useEffect(()=>{
  //   console.log('effect')
  //   dispatch(itemAction.fetchItems())
  // },[dispatch])

  // useEffect(()=>{
  //    axios.post('/queryproducts',{
  //      query:props.query
  //    })
  //    .then(data=>{
  //      setSearchedProducts(data.data.products)
  //    })
  //    .catch(err=>{
  //      console.log(err)
  //    })
  // })


  return (
    <div className = {cssClasses.ProductSection}>
      {loading?<Loader></Loader>:products.map((item, i) => (
        <Product {...item}  key={i}></Product>
      ))}
    
    </div>
  );
};

export default withErrorHandler(ProductSection)