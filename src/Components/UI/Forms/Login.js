import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import Button from "../Button";
import axios from '../../Utility/axios'
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from '../../../Store/authActions'
import * as MessageActions from '../../../Store/messageActions'
import cartSeter from '../../Utility/cartSetter'
import Loader from '../loader'

const SignupForm = () => {
  const dispatch = useDispatch()
  const [loading,setloading] = useState(false)
  const form = <Form>
  <Input
    width="100%"
    height="35px"
    placeholder="Enter Email Address"
    type="email"
    name="email"
  ></Input>
  <Input
    width="100%"
    height="35px"
    placeholder="Enter Password"
    btnName="Forget?"
    type="password"
    name="password"
  ></Input>
  <Button width="100%" height="40px" btnname="Login"></Button>
</Form>
  const cart = useSelector(state=>state.cart)
  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum."),
        })}
        onSubmit={(values, { setSubmitting,setErrors }) => {
          setloading(true)
          axios.post('/login',
              values
          ).then(async (data)=>{
            setSubmitting(false)
           

            await cartSeter(cart,data.data.cart,dispatch,data.data.token).then(result=>{
              dispatch(AuthActions.login(data.data.token))
              dispatch(AuthActions.checkAuthTimeOut(data.data.expirationTime))
            }).catch(err=>{
              throw err
            })

        }).catch(err=>{
          
          setloading(false)
          const errors={};
          if(err.response.status===422)
          {
              err.response.data.data.forEach(data=>{errors[data.param]=data.msg})
              setErrors(errors)
          }
          else
          {
              dispatch(MessageActions.showMessage('something went wrong try again later'))
          }
        })
        }}
      >
         {loading?<Loader></Loader>:form}
      </Formik>
    </>
  );
};

export default SignupForm
