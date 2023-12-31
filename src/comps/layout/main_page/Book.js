import React, { useState, useEffect } from "react";
import SinglePageForFrontend from "../SinglePageForFrontend";
import PreLoader from "../../auth/PreLoader";
import { useLocation } from "react-router-dom";
import axios from 'axios';
const Book = () => {
  const location = useLocation();
  const [ready, setReady] = useState("checking");
  const [book, setBook] = useState(null);
  const [url, setUrl] = useState(location.pathname.split("book/")[1].split("="))
  // getting site raeady 
  useEffect(() => {
    setTimeout(() => {
      setReady("ready");
    }, 1000);
  }, []);
  // getting whole book
  useEffect(()=>{
    axios(`${!window.location.href.includes("localhost") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book/${url[0]}`).then((o)=>{setBook(o.data)})
  },[]);
  
  if (ready !== "ready") return <PreLoader />;
  else
    return (
      <>
        {book !== null ? <><span className="right-after-header">
            <SinglePageForFrontend
              pages={book.pages.length}
              allPages={book.pages}
              book={book}
              setUrl={setUrl}
              setBook={setBook}
            />
          </span></> : <><h3 className="right-after-header center">Loading...</h3></>}
      </>
    );
};

export default Book;
