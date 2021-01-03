import cssClasses from './Bubble.module.scss'
import React from 'react'

export default (props)=>{
    console.log('render')
return  <div className = {cssClasses.Bubble}>{props.quantity}</div>
}

