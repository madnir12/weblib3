import { getDownloadURL } from "firebase/storage";

import { updateDocField } from "../../../../assets/backEndFunctions";
import { uploadImageFile, auth } from "../../../../assets/config/firebase";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoMdCloudUpload } from "react-icons/io";
import axios from "axios";
const EditDetails = () => {
  const [details, setDetails] = useState(null),
    [inputValue, setInputValue] = useState(""),
    [contentChanged, setContentChanged] = useState(false),
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
  const handleImageSelection = (event) => {
      const file = event.target.files[0], // Get the selected file
        fileExtension = file.name.split(".").pop(),
        newFileName = `${auth.currentUser.uid}/${id}/cover.${fileExtension}`,
        actionFunction = (snapshot) => {
          const downloadURLPromise = getDownloadURL(snapshot.ref);
          downloadURLPromise.then((downloadURL) => {
            setDetails((y) => {
              let newData = { ...y };
              newData.image = downloadURL;
              return newData;
            });
            setContentChanged(true);
            // You can use the download URL in an img src attribute to display the uploaded image
          });
        };
      uploadImageFile(newFileName, file, actionFunction);
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
    handleInputKeyDown = (event) => {
      if (event.key === "Enter" || event.key === ",") {
        event.preventDefault();

        const category = inputValue.trim();

        if (category && !details.categories.includes(category)) {
          setDetails((y)=>{
            let newData = {...y};
            if(!details.categories.includes(category)){
              newData.categories.push(category);
            }
            return newData;
          }) // ends setDetails
          setInputValue("");
        }
      }
    },
    // this method use to save data
    handleSaveDetails = (action) => {
      let obj = {
        name: details.name,
        bookCover: details.image,
        visibility: details.visibility,
        categories: details.categories,
      };
      updateDocField(id, obj, action);
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
        <div className="flex mt-10 flex-col">
          <label htmlFor="">Name</label>
          <input
            onChange={(e) => {
              setDetails((y) => {
                let newData = { ...y };
                newData.name = e.target.value;
                return newData;
              });
              setContentChanged(true);
            }}
            className="outline-none bg-transparent border-b-2 border-blue-500 border-solid px-1"
            type="text"
            value={details.name}
          />
        </div>
        <div className="px-1 pb-2 flex mt-10 flex-col border-b-2 border-blue-500 border-solid">
          <label htmlFor="">Categories</label>
            <div className="flex flex-wrap gap-2">
          {
              details.categories.map((category,index)=>{
              return <span className="mr-2 rounded-full bg-slate-300 px-4 py-1" key={index}>{category}<span className="ml-4 cursor-pointer" onClick={()=>{
                setDetails((y)=>{
                  let newData = {...y};
                  newData.categories.splice(index,1);
                  return newData;
                })
              }}>x</span></span>
            })
          }
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="outline-none bg-transparent border-none min-w-3"
            type="text"
            placeholder="Press ',' to separate"
          />
            </div>
        </div>
        <button
          onClick={() => {
            if (contentChanged) {
              let action = (o) => {
                console.log(o);
                setContentChanged(false);
              };
              handleSaveDetails(action);
            }
          }}
          className={`mt-20 text-center ${
            contentChanged
              ? "bg-blue-500 cursor-pointer"
              : " bg-transparent cursor-not-allowed"
          } text-white rounded-md px-8 py-2`}
        >
          Save
        </button>
      </div>
    )
  );
};

export default EditDetails;
