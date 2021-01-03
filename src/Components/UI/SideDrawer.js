import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cssClasses from "./SideDrawer.module.scss";
import {NavLink, useLocation} from 'react-router-dom'
import * as drawerActions from '../../Store/sideDrawerActions' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faCut, faTimes } from "@fortawesome/free-solid-svg-icons";
import * as CartActions from '../../Store/cartActions'
import * as AuthActions from '../../Store/authActions'

export default (props) => {
  const dispatch = useDispatch();
  const {pathname} = useLocation()
  const isAuth = useSelector(state =>state.auth.isAuth);
  const listNotAuth = [
    {
      title: "Login/SignUp",
      function:props.loginHandler
    }
  ];
  const listAuth = [
    {
      to: "/dashboard",
      title: "User Details",
    },
    {
      to: "/dashboard/track",
      title: "Track Orders",
    },
    {
      to: "/dashboard/orders",
      title: "Orders",
    },
    {

      title: "LogOut",
      function:()=>{dispatch(AuthActions.logout());dispatch(CartActions.setCart({cartItems:[],totalItems:0}))}
    }
  ];
  
  const list = isAuth?listAuth:listNotAuth

  return (
    <div
      className={cssClasses.SideDrawer}
      onClick={() => {
        dispatch(drawerActions.hideSideDrawer());
      }}
    >
      <div className={cssClasses.Cross}>
        <FontAwesomeIcon
          icon={faTimes}
          color="gray"
          size="lg"
        ></FontAwesomeIcon>
      </div>
      <ul>
          {list.map((item,i)=>{
              if(item.function)
              {
                return <li key = {i}>
                <NavLink to = {pathname} onClick={()=>{item.function()}}>{item.title}</NavLink>
             </li>
              }
              return <li key = {i}>
                 <NavLink to = {item.to}>{item.title}</NavLink>
              </li>
          })}
      </ul>
    </div>
  );
};
