import React,{useState} from "react";
import Layout from "./Components/Layout/Layout";
import "./App.css";
import { BrowserRouter, Route, Switch,Redirect } from "react-router-dom";
import "./Components/ProductSection/ProductSection";
import ProductSection from "./Components/ProductSection/ProductSection";
import CartSection from "./Components/CartSection/CartSection";
import BackDrop from './Components/UI/BackDrop'
import Message from './Components/UI/message'
import Modal from './Components/UI/Modal'
import { useDispatch, useSelector } from "react-redux";
import * as MessageAction from '../src/Store/messageActions'
import MyAccount from '../src/Components/MyAccount/MyAccount'
import GenralModal from './Components/UI/GenralModal'
import OrderDetails from './Components/OrderDetails/OrderDetails'
import message from "./Components/UI/message";
import SideDrawer from './Components/UI/SideDrawer'

function App() {
  const [showBackDrop,openBackDrop] = useState(false);
  const orderProps = useSelector(state=>state.message.modalData)
  const showMessage = useSelector(state=>state.message.showMessage)
  const showModal = useSelector(state=>state.message.isModal)
  const showDrawer = useSelector(state=>state.sideDrawer.showDrawer)
  const isAuth = useSelector(state=>state.auth.isAuth)
  const dispatch = useDispatch();
  const backDropHandler = ()=>{
    openBackDrop(prev=>!prev)
  }

  const messageHandler = ()=>{
    dispatch(MessageAction.hideMessage());
  }

  return (
    <div className="App">
      <BrowserRouter>
      {showBackDrop&&!isAuth&&<BackDrop backDropHandler = {backDropHandler} zValue={100}><Modal closeFunction = {backDropHandler}></Modal></BackDrop>}
  {showMessage?<BackDrop backDropHandler = {messageHandler} zValue={102}>{showModal?<GenralModal><OrderDetails {...orderProps}></OrderDetails></GenralModal>:<Message></Message>}</BackDrop>:null}
  {showDrawer?<BackDrop backDropHandler = {()=>{dispatch({type:'HIDEDRAWER'})} } zValue = {998}><SideDrawer loginHandler = {backDropHandler}></SideDrawer></BackDrop>:null}
      
        <Layout backDropHandler = {backDropHandler}>
          <Switch>
            <Route path="/" exact>
              <ProductSection></ProductSection>
            </Route>
            <Route path="/cart">
              <CartSection clickHandler = {()=>{openBackDrop(true)}}></CartSection>
            </Route>
            <Route path="/dashboard">
              {isAuth?<MyAccount></MyAccount>:<Redirect to='/'></Redirect>}
            </Route>
          </Switch>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
