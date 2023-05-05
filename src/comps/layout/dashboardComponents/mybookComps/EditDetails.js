import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
const EditDetails = () => {
  const [details, setDetails] = useState(null),
  [count,setCount] = useState(0),  
  location = useLocation();
  useEffect(() => {
    axios(
      `${
        !window.location.href.includes("localhost")
          ? process.env.REACT_APP_HOST_PATH
          : process.env.REACT_APP_LOCAL_PATH
      }/book/${location.pathname.split("/dashboard/mybook/e/")[1]}`
    ).then((o) => {
      setDetails(
        (y) =>
          (y = {
            image: o.data.bookCover,
            name: o.data.name,
            visibility: o.data.visibility,
            categories: o.data.categories,
          })
      );
    });
    // getSingleDoc("books_array",location.pathname.split("/dashboard/mybook/")[1],setSingleBookData)
  }, []);
  useEffect(()=>{
          setCount((y)=> y+1);
  },[details])
  // this function use to select file
  function handleImageSelection(event) {
    const file = event.target.files[0]; // Get the selected file
    const reader = new FileReader(); // Create a new FileReader instance

    // Set up a function to be called when the FileReader finishes loading the file
    reader.onload = function () {
      // Set the details.image property to the uploaded image URL
      setDetails((y) => {
        let newData = { ...y };
        newData.image = reader.result;
        return newData;
      });
    };

    if (file) {
      // Read the selected file as a data URL
      reader.readAsDataURL(file);
    }
  }
  return (
    details !== null && (
      <div className="p-6">
        <div className=" overflow-hidden group img-container relative w-40 h-fit">
          <img src={details.image} alt="" className="w-40" />
          <div className="bg-black bg-opacity-70 w-full h-0 top-0 absolute group-hover:h-full flex items-center justify-center ">
            <label
              htmlFor="upload"
              className="flex flex-col items-center cursor-pointer text-base "
            >
              <IoMdCloudUpload /> Choose File
            </label>
            <input
              type="file"
              id="upload"
              className="hidden"
              onChange={(e) => handleImageSelection(e)}
            />
          </div>
        </div>
        <button
          className={`mt-20 text-center ${count > 4 ? "bg-blue-500 cursor-pointer" : " bg-transparent cursor-not-allowed"} text-white rounded-md px-8 py-2`}
        >
          Save
        </button>
        {count}
      </div>
    )
  );
};

export default EditDetails;
