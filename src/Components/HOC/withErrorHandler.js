import React from 'react'

export default (Comp)=>{
    return (props)=>{
         return props.error?<p>There was some error</p>:<Comp {...props}></Comp>
    }
} 
