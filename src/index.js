import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore,compose,combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux' 
import cartReducer from './Store/cartReducer'
import itemReducer from './Store/itemReducer'
import authReducer from './Store/authReducer'
import messageReducer from './Store/messageReducer'
import sideDrawerReducer from './Store/sideDrawerReducer'
import thunk from 'redux-thunk'
import {loadState,saveState} from '../src/Components/Utility/localStorage'
import axios from './Components/Utility/axios'
import * as MessageActions from './Store/messageActions'
import * as AuthActions from './Store/authActions'
import * as CartActions from './Store/cartActions'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState();

const rootReducer = combineReducers({
  cart:cartReducer,
  items:itemReducer,
  auth:authReducer,
  message:messageReducer,
  sideDrawer:sideDrawerReducer
})


const store = createStore(rootReducer,persistedState,composeEnhancers(applyMiddleware(thunk)));
store.subscribe(()=>{saveState({
  cart:store.getState().cart,
  auth:store.getState().auth
})})

let currentState ;
store.subscribe(()=>{
  let prevState = currentState;
  currentState = store.getState()


  if(prevState)
  {
    if(currentState.auth.isAuth)
    {
      if(JSON.stringify(prevState.cart)!==JSON.stringify(currentState.cart))
      {
        axios.post('/setcart',{cart:currentState.cart},{headers:{
          Authorization:'Bearer '+currentState.auth.token
        }}).then(data=>{
        
        }).catch(err=>{
            store.dispatch(AuthActions.logout())
            store.dispatch(CartActions.setCart(prevState.cart))
            store.dispatch(MessageActions.showMessage('Something went wrong'))
        })
      }
    }
  }
})
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
