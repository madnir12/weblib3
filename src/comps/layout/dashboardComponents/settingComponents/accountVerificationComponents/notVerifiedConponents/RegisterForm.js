import React, { useEffect, useState } from "react";
import {
  auth,
  getSingleDoc,
  updateDocField,
} from "../../../../../../assets/config/firebase";

const RegisterForm = ({handleFetch}) => {
  // this state contains all fields regarding register form
  const [formFields, setFormFields] = useState({
      Name: "",
      Email: "",
      Number: "",
      Country: "",
      City: "",
    }),
    // this state will use to controle submit button display
    [visible,setVisible] = useState(false),
    // this function will return true if all fields are completed by user
    fieldsCompleted = () => {
      let isEmptyStringPresent = false;
      for (let key in formFields) {
        if (
          formFields.hasOwnProperty(key) &&
          (formFields[key] === "" ||
            formFields[key] === "null" ||
            formFields[key] === null)
        ) {
          isEmptyStringPresent = true;
          break;
        }
      }

      if (isEmptyStringPresent) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    },
    // this function will run when user submit form
    handleSubmit = () => {
      let { Name, Email, Number, Country, City } = formFields;
      const action = () => {
        setVisible(false);
        handleFetch()
      };
      updateDocField(
        "users",
        auth.currentUser.uid,
        {
          userName: Name,
          userEmail: Email,
          phoneNumber: Number,
          country: Country,
          city: City,
          permissionStatus: "pending"
        },
        {action}
      );
    },
    // this array contains all fields
    inputs = [
      { name: "Name", type: "text" },
      { name: "Email", type: "email" },
      { name: "Number", type: "number" },
      { name: "Country", type: "text" },
      { name: "City", type: "text" },
    ]; // ends inputs
  // this useEffect will get user's details and set it to the state
  useEffect(() => {
    getSingleDoc("users", auth.currentUser.uid, (data) => {
      const { userName, userEmail, phoneNumber, city, country } = data;
      setFormFields({
        Name: userName,
        Email: userEmail,
        Number: phoneNumber,
        City: city,
        Country: country,
      });
    });
  }, []);
  // this will set visible true if all fields will be completed
  useEffect(()=>{
    fieldsCompleted()
  },[formFields])
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (visible) {
            handleSubmit()
            
          }
        }}
        action=""
        className="my-5 "
      >
        {inputs.map((input) => {
          const { name, type } = input;
          return (
            <div
              className="
        border-2 border-black mb-5 pt-6 input-fied relative w-full 
        "
            >
              <label
                htmlFor={name}
                className="
          roboto top-2 text-uppercase left-3 absolute "
              >
                {name}
              </label>
              <input
                name={name}
                onChange={(e) =>
                  setFormFields({
                    ...formFields,
                    [e.target.name]: e.target.value,
                  })
                }
                id={name}
                type={type}
                className=" 
          w-full bg-transparent px-4 py-3 outline-none
          "
                value={formFields[name]}
              />
            </div>
          );
        })}
        <button
          className={`text-white  py-2 px-6 rounded-full ${
            visible
              ? "bg-blue-600 hover:bg-blue-500"
              : "hover:cursor-not-allowed opacity-20"
          } `}
        >
          Submit Details
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
