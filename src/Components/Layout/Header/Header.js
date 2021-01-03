import React,{useEffect, useState} from "react";
import cssClsses from "./Header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faHome, faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink, useHistory } from "react-router-dom";
import Bubble from "../Bubble/Bubble";
import { useDispatch, useSelector } from "react-redux";
import NavDropDown from "../../UI/NavDropDown";
import * as AuthActions from "../../../Store/authActions";
import * as CartActions from "../../../Store/cartActions";
import * as itemAction from '../../../Store/itemActions'

export default (props) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const quantity = useSelector((state) => state.cart.totalItems);
  const [searchedProducts,setSearchedProducts] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(()=>{
  
    dispatch(itemAction.fetchItems(searchedProducts))
  },[dispatch,searchedProducts])
  return (
    <div className={cssClsses.Header}>
      <div className={cssClsses.Holder}>FarmLead</div>
      <div className={cssClsses.Nav}  style = {{width:'10%'}}> <NavLink to="/" activeStyle={{ color: "#FACA0F"}} exact>
            <FontAwesomeIcon
              className={cssClsses.Icon}
              icon={faHome}
              size="lg"
            ></FontAwesomeIcon>
            Home
          </NavLink></div>
      <div className={cssClsses.SearchBar}>
        <input
          type="text"
          placeholder="search vegetables"
          className={cssClsses.Input}
          onClick = {()=>{history.push('/')}}
          onChange = {(e)=>{setSearchedProducts(e.target.value)}}
        ></input>
      </div>
      <div className={cssClsses.Nav}>
        {isAuth ? (
          // <NavLink to="/dashboard" activeStyle={{ color: "#FACA0F" }}>
          //   <FontAwesomeIcon
          //     className={cssClsses.Icon}
          //     icon={faUser}
          //     size="lg"
          //   ></FontAwesomeIcon>
          //   My Account
          // </NavLink>
          <NavDropDown
            to={"/dashboard"}
            links={[
              { to: "/dashboard", title: "Account Details" },
              { to: "/dashboard/track", title: "Track Orders" },
              { to: "/dashboard/orders", title: "All Orders" },
              {
                action: () => {
                  dispatch(AuthActions.logout());
                  dispatch(
                    CartActions.setCart({ cartItems: [], totalItems: 0 })
                  );
                  
                },
                title: "LogOut",
              },
            ]}
          >
            <FontAwesomeIcon
              className={cssClsses.Icon}
              icon={faUser}
              size="lg"
            ></FontAwesomeIcon>
            My Account
          </NavDropDown>
        ) : (
          <NavLink to="#" onClick={props.backDropHandler}>
            <FontAwesomeIcon
              className={cssClsses.Icon}
              icon={faUser}
              size="lg"
            ></FontAwesomeIcon>
            Login
          </NavLink>
        )}

        <NavLink to="/cart" activeStyle={{ color: "#FACA0F" }}>
          <FontAwesomeIcon
            className={cssClsses.Icon}
            icon={faCartPlus}
            size="lg"
          ></FontAwesomeIcon>
          Cart
          {quantity === 0 ? null : <Bubble quantity={quantity}></Bubble>}
        </NavLink>
      </div>
    </div>
  );
};
