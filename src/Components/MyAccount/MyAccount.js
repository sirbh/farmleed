import React from 'react'
import cssClasses from './MyAccount.module.scss'
import {NavLink,Switch,Route,useRouteMatch} from 'react-router-dom'
import Orders from './Orders/Order'
import UserDetails from './UserDetails/UserDetails'
import Track from './Track/Track'
import Button from '../UI/Button'
import { useDispatch } from 'react-redux'
import * as CartActions from '../../Store/cartActions'
import * as AuthActions from '../../Store/authActions'


export default (props)=>{
    const {path,url} = useRouteMatch()
    const dispatch = useDispatch()
   return <div className = {cssClasses.Main}>
       <div className = {cssClasses.Side}>
       <h2>User Dashboard</h2>
       <NavLink to={`${url}`} exact activeClassName={cssClasses.Active} className = {cssClasses.Link}>Account Details</NavLink>
       <NavLink to={`${url}/track`} activeClassName={cssClasses.Active} className = {cssClasses.Link}>Track</NavLink>
       <NavLink to={`${url}/orders`} activeClassName={cssClasses.Active} className = {cssClasses.Link}>Orders</NavLink>
       <Button width="110px" height="40px" btnname="LOGOUT" clicked={()=>{dispatch(AuthActions.logout());dispatch(CartActions.setCart({cartItems:[],totalItems:0}))}}></Button>
       </div>
       <Switch>
        <Route path={`${path}`} exact>
        <UserDetails></UserDetails>
        </Route>
        <Route path={`${path}/orders`}>
          <Orders></Orders>
        </Route>
        <Route path={`${path}/track`}>
          <Track></Track>
        </Route>
      </Switch>
       
   </div>
}