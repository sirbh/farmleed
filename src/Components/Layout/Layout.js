import React, { Fragment } from 'react'
import Header from './Header/Header'
import ModbileHeader from '../Layout/Header/MobileHeader/MobileHeader'
import MobileHeader from '../Layout/Header/MobileHeader/MobileHeader'

export default  (props)=>{
    return <Fragment>
        <MobileHeader></MobileHeader>
        <Header backDropHandler = {props.backDropHandler}></Header>
        {props.children}
    </Fragment>
}