import React from 'react'
import cssClasses from './Input.module.scss'
import Styled from 'styled-components'
import {useField} from 'formik'

const StyledInput = Styled.input`
   width:${props=>props.width};
   height:${props=>props.height};
   margin-top:20px;
   border: none;
   border-bottom: 1px gray solid;
   font-size: 20px;
   padding-right: 70px;
   padding-left: 10px;
   &:focus
   {
       outline:none;
       border-bottom: 2px #97BC62FF solid;
   }

   @media only screen and (max-width: 600px) 
   {
    margin-top:5px;
    font-size: 15px;
   }
`
const StyledP = Styled.p`
color: red;
font-size: 12px;
text-align: start;
height: 14px;
margin-top: 2px;
`

export default ({width,height,btnName,...props})=>{

    const [field, meta] = useField(props);
    let btn = null;
    if(btnName)
    {
       
        btn = <p className = {cssClasses.btn}>{btnName}</p>
    }
    return  <div style = {{position:'relative'}}> 
    <StyledInput {...props} width={width} height={height}{...field}></StyledInput>
    <StyledP> {meta.touched && meta.error ?meta.error:null}</StyledP>
    {btn}
    </div>
}