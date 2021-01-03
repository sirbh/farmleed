import React from 'react'
import Styled from 'styled-components'

const StyledInput = Styled.button`
   width:${props=>props.width};
   height:${props=>props.height};
   margin-top:30px;
   border: none;
   font-size: 20px;
   background-color:#97BC62FF;
   color:white;

   &:focus
   {
       outline:none;
   }

   &:active
   {
       background-color: #8c9e7e;
   }
`

export default (props)=>{
return <StyledInput {...props} onClick = {props.clicked}>{props.btnname}</StyledInput>
}