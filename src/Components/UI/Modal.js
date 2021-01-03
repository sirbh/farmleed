import React,{useState} from 'react'
import cssClasses from './Modal.module.scss'
import vege from '../../../src/Images/vegetables.png'
import Input from './Input'
import Button from './Button'
import Loginform from '../UI/Forms/Login'
import SignUp from '../UI/Forms/SignUp'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCut, faWindowClose } from '@fortawesome/free-solid-svg-icons'

export default (props)=>{
    const [isLoginForm,setLoginForm]=useState(true);
    const formHandler = ()=>{
        setLoginForm(prev=>!prev)
    }
    return <div className ={cssClasses.Modal}>
        <div className = {cssClasses.Side}>
            <div className = {cssClasses.Cross}>
                <FontAwesomeIcon
                icon = {faWindowClose} onClick = {()=>{props.closeFunction()}} size = 'lg' color = 'white'>
                </FontAwesomeIcon>
            </div>
            <div className = {cssClasses.Content}>
                {isLoginForm?<div>
                    <h2>Login</h2>
                    <p>Get access to your Orders, Wishlist and Recommendations</p>
                </div>:<div>
                    <h2>Looks Like You Are Visiting Us First Time?</h2>
                </div>} 
            </div>
        </div>
        {isLoginForm?<div className = {cssClasses.Main}>
            <div className = {cssClasses.Content}>
                    <Loginform></Loginform>
            </div>
            <p onClick={formHandler}>New to FarmLeed?Create an account</p>
        </div>: <div className = {cssClasses.MainSignUp}>
            <div className = {cssClasses.Content}>
                    <SignUp></SignUp>
            </div>
            <p onClick = {formHandler}>Go To Login</p>
        </div>}
       
       
    </div>
}