import React,{useEffect, useState} from "react";
import { auth, getSingleDoc, updateDocField } from "../../../../../../assets/config/firebase";

const RegisterForm = () => {
  const [formFields,setFormFields] = useState({
          Name: "",
          Email: "",
          Number: "",
          Country: "",
          City: ""
  }), 
  fieldsCompleted = ()=>{
    let isEmptyStringPresent = false;
    for (let key in formFields) {
      if (formFields.hasOwnProperty(key) && (formFields[key] === "" || formFields[key] === "null" || formFields[key] === null)) {
        isEmptyStringPresent = true;
        break;
      }
    }
    
    if (isEmptyStringPresent) {
      return false
    } else {
      return true
    }
  }, 
  inputs = [
      {name: "Name",type: "text"},
      {name: "Email",type: "email"},
      {name: "Number",type: "number"},
      {name: "Country",type: "text"},
      {name: "City",type: "text"},

  ]; // ends inputs
  useEffect(()=>{
    getSingleDoc("users",auth.currentUser.uid,(data)=>{
      const {userName,userEmail,phoneNumber,city,country} = data;
      setFormFields({
        Name: userName,
        Email: userEmail,
        Number: phoneNumber,
        City: city,
        Country: country
      })
    })
  },[])
  return (
    <div>
      <form
      onSubmit={(e)=>{
        e.preventDefault()
        if(fieldsCompleted()){
          console.log("submit successfully")
        }
      }}
      action="" className="my-5 ">
        {
        inputs.map((input)=>{
          const {name,type} = input
          return(
                    <div 
        className="
        border-2 border-black mb-5 pt-6 input-fied relative w-full 
        ">
          <label htmlFor={name} className="
          roboto top-2 text-uppercase left-3 absolute "
          >{name}</label>
          <input
          name={name}
          onChange={(e)=> setFormFields({...formFields, [e.target.name]: e.target.value})}
          id={name}
          type={type}
          className=' 
          w-full bg-transparent px-4 py-3 outline-none
          '
          value={formFields[name]}
           />
        </div>
          )
        })
        }
        <button
         className={`text-white  py-2 px-6 rounded-full ${fieldsCompleted() ? "bg-blue-600 hover:bg-blue-500" : "hover:cursor-not-allowed opacity-20"} `}>
          Submit Details
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
