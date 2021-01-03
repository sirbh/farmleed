import React, { useState } from "react";
import cssClasses from "./MobileHeader.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faBars, faCartPlus, faHamburger, faHome, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as itemAction from '../../../../Store/itemActions'
import * as drawerActions from '../../../../Store/sideDrawerActions'
import Bubble from '../../Bubble/Bubble'

export default (props) => {
  const {pathname} = useLocation()
  const history = useHistory()
  const dispatch = useDispatch()
  const quantity = useSelector(state=>state.cart.totalItems)

  return (
    <div className={cssClasses.Header}>
        {pathname!=='/'? <div className={cssClasses.Nav} > <NavLink to="/" activeStyle={{ color: "#FACA0F" }} exact>
          <FontAwesomeIcon
            className={cssClasses.Icon}
            icon={faArrowLeft}
            size="lg"
          ></FontAwesomeIcon>
        </NavLink> </div>:null}
      <div className={cssClasses.Nav} >
        {" "}
    
          <FontAwesomeIcon
          color = 'white'
          onClick = {()=>{dispatch(drawerActions.showSideDrawer())}}
            className={cssClasses.Icon}
            icon={faBars}
            size="lg"
          ></FontAwesomeIcon>
       
      </div>

      <div className={cssClasses.SearchBar}>
        <input
          type="text"
          placeholder="search vegetables"
          className={cssClasses.Input}
          onClick = {()=>{history.push('/')}}
          onChange = {(e)=>{dispatch(itemAction.fetchItems(e.target.value))}}
        >
        </input>
        <FontAwesomeIcon  className={cssClasses.Search}
              icon={faSearch}
              size="lg">  
        </FontAwesomeIcon>
      </div>
      <div className={cssClasses.Nav} > <NavLink to="/cart" activeStyle={{ color: "#FACA0F"}} exact>
            <FontAwesomeIcon
              className={cssClasses.Icon}
              icon={faCartPlus}
              size="lg"
            ></FontAwesomeIcon>
            {quantity === 0 ? null : <Bubble quantity={quantity}></Bubble>}
          </NavLink></div>
    </div>
  );
};
