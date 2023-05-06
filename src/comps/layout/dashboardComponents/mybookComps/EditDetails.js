import { getDownloadURL } from 'firebase/storage';

import { updateDocField } from '../../../../assets/backEndFunctions';
import { uploadImageFile, auth } from "../../../../assets/config/firebase";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
const EditDetails = () => {
  const [details, setDetails] = useState(null),
  [contentChanged,setContentChanged] = useState(false),  
  location = useLocation(),
  id = location.pathname.split("/dashboard/mybook/e/")[1];
  useEffect(() => {
    axios(
      `${
        !window.location.href.includes("localhost")
          ? process.env.REACT_APP_HOST_PATH
          : process.env.REACT_APP_LOCAL_PATH
      }/book/${id}`
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

  // this function use to select image file
  const handleImageSelection = (event)=> {
    const file = event.target.files[0],// Get the selected file
    fileExtension =  file.name.split('.').pop(),
    newFileName = `${auth.currentUser.uid}/${id}/cover.${fileExtension}`,
    actionFunction = (snapshot)=>{
      const downloadURLPromise = getDownloadURL(snapshot.ref);
  downloadURLPromise.then((downloadURL) => {
    setDetails((y)=>{
      let newData = {...y};
      newData.image = downloadURL;
      return newData;
    });
    setContentChanged(true);
    // You can use the download URL in an img src attribute to display the uploaded image
  });
    };
    uploadImageFile(newFileName,file,actionFunction);
    // const reader = new FileReader(); // Create a new FileReader instance

    // // Set up a function to be called when the FileReader finishes loading the file
    // reader.onload = function () {
    //   // Set the details.image property to the uploaded image URL
    //   setDetails((y) => {
    //     let newData = { ...y };
    //     newData.image = reader.result;
    //     return newData;
    //   });
    //   setContentChanged(true);
    // };

    // if (file) {
    //   // Read the selected file as a data URL
    //   reader.readAsDataURL(file);
    // }
  }, // ends handleImageSelection function 
  handleSaveDetails = (action)=>{
    let obj = {
      name: details.name,
      bookCover: details.image,
      visibility: details.visibility,
      categories: details.categories
    }
    updateDocField(id,obj,action)
  };
  return (
    details !== null && (
      <div className="p-6">
        <div className=" overflow-hidden group img-container relative w-40 h-fit">
          <img src={details.image} alt="" className="w-40" />
          <div className=" overflow-hidden bg-black bg-opacity-70 w-full h-0 top-0 absolute group-hover:h-full flex items-center justify-center ">
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
        onClick={()=>{
          if(contentChanged){
            let action = (o)=>{
              console.log(o)
              setContentChanged(false);
            };
            handleSaveDetails(action);
          };
        }}
          className={`mt-20 text-center ${contentChanged ? "bg-blue-500 cursor-pointer" : " bg-transparent cursor-not-allowed"} text-white rounded-md px-8 py-2`}
        >
          Save
        </button>
      </div>
    )
  );
};

export default EditDetails;
