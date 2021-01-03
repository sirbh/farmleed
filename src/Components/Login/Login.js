import React, { Fragment } from 'react'
import Header from './Header/Header'


export default  (props)=>{
    return <Fragment>
        <Header></Header>
        {props.children}
    </Fragment>
}