import React,{useState} from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Input from "../Input";
import Button from "../Button";
import axios from '../../Utility/axios'
import { useDispatch, useSelector } from "react-redux";
import * as AuthActions from '../../../Store/authActions'
import cartSeter from '../../Utility/cartSetter'
import * as MessageActions from '../../../Store/messageActions'
import Loader from '../../UI/loader'

const SignupForm = () => {
  const dispatch = useDispatch();
  const [loading,setloading] = useState(false)
  const cart = useSelector(state=>state.cart)
  const form = <Form>
  <Input
    width="100%"
    height="35px"
    placeholder="Enter Your FullName"
    type="text"
    name="username"
  ></Input>
  <Input
    width="100%"
    height="35px"
    placeholder="Enter Email Address"
    type="text"
    name="email"
  ></Input>
  <Input
    width="100%"
    height="35px"
    placeholder="Enter Password"
    type="password"
    name="password"
  ></Input>
  <Input
    width="100%"
    height="35px"
    placeholder="Confirm Password"
    type="password"
    name="confirmPassword"
  ></Input>
  <Input
    width="100%"
    height="35px"
    placeholder="Enter Phonenumber"
    type="text"
    name="phone"
  ></Input>
  <Button width="100%" height="40px" btnname="SignUp"></Button>
</Form>
  return (
    <>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          username:'',
          email:'',
          password: "",
          confirmPassword: "",
          phone:''
        }}
        validationSchema={Yup.object({
          username: Yup.string()
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum."),
          confirmPassword: Yup.string()
            .required("No password provided.")
            .min(8, "Password is too short - should be 8 chars minimum."),
          phone: Yup.string()
            .min(8)
            .required('A phone number is required'),
        })}
        onSubmit={(values, { setSubmitting,setErrors }) => {
            setloading(true)
            axios.post('/signup',
                values
            ).then(data=>{
              setSubmitting(false)
              console.log(data)
  
              cartSeter(cart,data.data.cart,dispatch,data.data.token).then(result=>{
                dispatch(AuthActions.login(data.data.token))
                dispatch(AuthActions.checkAuthTimeOut(data.data.expirationTime))
                dispatch(MessageActions.showMessage('You have successfully logged in. Go to MyAccount for more options'))
              }).catch(err=>{
                console.log(err.response)
              }) 
  
          }).catch(err=>{
            console.log(err.response)
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
