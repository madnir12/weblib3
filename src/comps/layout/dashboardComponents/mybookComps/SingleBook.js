import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, getSingleDoc } from "../../../../assets/config/firebase";
import SinglePage from "./SinglePage";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { timeSince } from "../../../../assets/function";
const SingleBook = () => {
  const location = useLocation();
  const [singleBookData, setSingleBookData] = useState("");
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const id = location.pathname.split("/dashboard/mybook/b/")[1];
  useEffect(() => {
    axios(
      `${
        !window.location.href.includes("localhost")
          ? process.env.REACT_APP_HOST_PATH
          : process.env.REACT_APP_LOCAL_PATH
      }/book/${id}`
    ).then((o) => {
      if(auth.currentUser.uid !== o.data.autherId){
        navigate("/dashboard/mybook")
      } else
      setSingleBookData(o.data);
    });
    // getSingleDoc("books_array",location.pathname.split("/dashboard/mybook/")[1],setSingleBookData)
  }, []);
  useEffect(() => {
    if (singleBookData !== "") setReady(true);
  }, [singleBookData]);
  const {
    bookCover,
    name,
    createdAt,
    updatedAt,
    visibility,
    categories,
    pages,
  } = singleBookData;
  if (ready)
    return (
      <>
        <div className="dashboard-single-book">
          <img src={bookCover} alt="" />
          <div className="book-content">
            <h3 className="urdu">{name}</h3>
            <span>Created At: {timeSince(createdAt)}</span>
            <br />
            <span>Last Edit At: {timeSince(updatedAt)}</span>
            <br />
            <br />
            <h4>Status: </h4> <span>{visibility}</span>
            <br />
            <h4>categories: </h4>
            <span>{categories.map((item) => item)}</span>
          </div>
        </div>
        <div
          className=" flex items-ce
        justify-center"
        >
          <span 
          onClick={()=> navigate(`/dashboard/mybook/e/${id}`)}
          className=" flex gap-2 items-center cursor-pointer"
          ><BiEdit/> Edit Details</span>
        </div>
        <SinglePage pages={pages.length} allPages={pages} />
      </>
    );
};

export default SingleBook;
