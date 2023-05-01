import React, { useState, useEffect } from "react";
import MyContext from "./MyContext";
import { getDocsInCollection } from "../assets/config/firebase";
import axios from "axios";
const StatesContext = ({ children }) => {
  const [bookContent, setBookContent] = useState([]);
  const [mainPageSearchValue, setMainPageSearchValue] = useState("");
  const [bookMetaContent, setBookMetaContent] = useState([]);
  const basicUrl = !window.location.href.includes("localhost")
  ? process.env.REACT_APP_HOST_PATH
  : process.env.REACT_APP_LOCAL_PATH;
  // this function will use to fetch books
  const fetchBooks = (path,setter) => {
          axios.get(basicUrl+path)
            .then((response) => {
              setter(response.data);
            })
            .catch((error) => {
              console.error(error);
            });
  };
  // this function will usew to delete book
  const deleteBook = (id) => {
    console.log(id)
    axios
      .delete(`${basicUrl}/book/${id}`)
      .then((response) => {
        fetchBooks('/book/meta',setBookMetaContent);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // this use effect will get the all published books and store them into bookContent state
    fetchBooks("/book",setBookContent);
    // getDocsInCollection("books_array", "visibility", "==", "public", setBookContent)
  }, []);
  // this useEffect get meta data for all books
  useEffect(() => {
    // this use effect will get the all published books meta and store them into bookMetaContent state
    fetchBooks("/book/meta",setBookMetaContent)
    // getDocsInCollection("books_array", "visibility", "==", "public", setBookContent)
  }, []);
  // this oject contains all states variables
  const states = {
    bookContent,
    bookMetaContent,
    mainPageSearchValue,
    deleteBook,
    statesSetters: {
      setBookContent,
      setBookMetaContent,
      setMainPageSearchValue,
    }, // ends statesSetters object
  }; // ends states object
  // this object contains all states setters
  return <MyContext.Provider value={states}>{children}</MyContext.Provider>;
};

export default StatesContext;
