import React from 'react'
import cssClasses from './BackDrop.module.scss'

export default (props)=>{
    return  <> 
    <div className ={cssClasses.BackDrop} style={{zIndex:props.zValue}}onClick = {props.backDropHandler}>
    </div>
        {props.children}
    </>
}