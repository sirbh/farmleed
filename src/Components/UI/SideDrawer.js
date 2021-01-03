import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cssClasses from "./SideDrawer.module.scss";
import {NavLink, useLocation} from 'react-router-dom'
import * as drawerActions from '../../Store/sideDrawerActions' 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCross, faCut, faTimes } from "@fortawesome/free-solid-svg-icons";
export default (props) => {
  const dispatch = useDispatch();
  const {pathname} = useLocation()
  const isAuth = useSelector(state =>state.auth.isAuth);
  const listNotAuth = [
    {
      to: "/",
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
                return <li>
                <NavLink to = {pathname} onClick={()=>{item.function()}}>{item.title}</NavLink>
             </li>
              }
              return <li>
                 <NavLink to = {item.to}>{item.title}</NavLink>
              </li>
          })}
      </ul>
    </div>
  );
};
