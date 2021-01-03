import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import Button from "../Button";
import axios from '../../Utility/axios'
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from '../../../Store/authActions'
import cartSeter from '../../Utility/cartSetter'
import * as MessageActions from '../../../Store/messageActions'
import cssClasses from './details.module.scss'
import Loader from '../loader'




const SignupForm = () => {
  const dispatch = useDispatch();
  const [email,setEmail] = useState('')
  const [username,setUsername] = useState('')
  const [loader,setLoader] = useState(false)
  const [phone,setPhone] = useState('')
  const token = useSelector(state=>state.auth.token)

  useEffect(()=>{
    setLoader(true)
    axios.get('/getdetails',{headers:{
      Authorization:'Bearer '+token
    }}).then(resp=>{
     
      setLoader(false)
      setEmail(resp.data.email);
      setPhone(resp.data.phone);
      setUsername(resp.data.username);
    }).catch(err=>{
       
       dispatch(MessageActions.showMessage('Somenthing Went Wrong please try agian later'))
       dispatch(AuthActions.logout())
    })
  },[dispatch,token]);

  return (
    <div className = {cssClasses.Form}>
      <Formik
        enableReinitialize = {true}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          username:username,
          email:email,
          phone:phone
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          phone: Yup.string()
            .min(8)
            .required('A phone number is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
            setLoader(true)
            axios.post('/setdetails',
                values,
                {headers:{
                  Authorization:'Bearer '+token
                }}
            ).then(resp=>{
                setLoader(false)
                setSubmitting(false)
                setEmail(resp.data.email);
                setPhone(resp.data.phone);
                setUsername(resp.data.username);
                dispatch(MessageActions.showMessage('Inforamtion updated successfully.'))
                
            }).catch(err=>{
              dispatch(MessageActions.showMessage('Somenthing Went Wrong please try agian later'))
            })
        }}
      >
        {loader?<Loader></Loader>:<Form>
            <label>Full Name</label>
          <Input
            width="100%"
            height="35px"
            type="text"
            name="username"
          ></Input>
                      <label>Email Address</label>

          <Input
            width="100%"
            height="35px"
            type="text"
            name="email"
          ></Input>
                      <label> Phone Number</label>

          <Input
            width="100%"
            height="35px"
            type="text"
            name="phone"
          ></Input>
          <Button width="70%" height="40px" btnname="Update and Save"></Button>
        </Form>}
        
      </Formik>
    </div>
  );
};




export default SignupForm
