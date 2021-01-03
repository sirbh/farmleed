import React, { useEffect, useState } from "react";
import cssClasses from "./UserDetails.module.scss";
import Input from "../../UI/Input";
import DetailsForm from '../../UI/Forms/details'
import axios from '../../Utility/axios'

export default (props) => {
//   const [initialValues,setInitialValues] = useState();

//   useEffect(()=>{
//       axios.get('/getdetails')
//   },)
  return (
    <div className={cssClasses.Content}>
      <h2>Account Details</h2>
      <hr></hr>
     <DetailsForm></DetailsForm>
    </div>
  );
};
