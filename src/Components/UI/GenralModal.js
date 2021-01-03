import React,{useState} from 'react'
import cssClasses from './GenralModal.module.scss'
import vege from '../../../src/Images/vegetables.png'
import Input from './Input'
import Button from './Button'
import Loginform from './Forms/Login'
import SignUp from './Forms/SignUp'
import { useDispatch, useSelector } from 'react-redux'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import * as MessageActions from '../../Store/messageActions'

export default (props)=>{
    const header = useSelector(state=>state.message.modalData.header)
    const clickHandler = useSelector(state=>state.message.modalData.clickHandler)
    const points = useSelector(state=>state.message.modalData.points)
    const btnType = useSelector(state=>state.message.modalData.btnType)
    const dispatch = useDispatch();
    const btnStyle = {
        backgroundColor: btnType==='Order Now'?'#e03531':'#faca0f'
    }
    // const header = useSelector(state=>state.message.modalData.header)
    return <div className ={cssClasses.Modal}>
        <div className = {cssClasses.Side}>
        <div className = {cssClasses.Cross}>
                <FontAwesomeIcon
                icon = {faWindowClose} onClick = {()=>{dispatch(MessageActions.hideMessage())}} size = 'lg' color = 'white'>
                </FontAwesomeIcon>
            </div>
            <div className = {cssClasses.Content}>
                <div>
                <h2>{header}</h2>
                {points&&points.map((line,id)=><p key = {id}>{line}</p>)}
                {clickHandler&&<button onClick = {clickHandler} style = {btnStyle}>{btnType}</button>}
                </div>
            </div>
        </div>
        <div className = {cssClasses.Main}>
                    {props.children}
            
            {/* <p onClick={props.formHandler}>New to FarmLeed?Create an account</p> */}
        </div>
    </div>
}