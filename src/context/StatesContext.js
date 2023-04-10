import React, { useState, useEffect } from 'react'
import MyContext from './MyContext'
import { getDocsInCollection } from '../assets/config/firebase'
import axios from 'axios'
const StatesContext = ({children}) => {
          const [bookContent, setBookContent] = useState([])
          const [mainPageSearchValue,setMainPageSearchValue] = useState("");
          const [bookMetaContent, setBookMetaContent] = useState([])
          useEffect(() => { // this use effect will get the all published books and store them into bookContent state
                    axios(`${!window.location.href.includes("localhost") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book`).then((o)=>{setBookContent(o.data)})
                    // getDocsInCollection("books_array", "visibility", "==", "public", setBookContent)
          }, [])
          // this useEffect get meta data for all books
          useEffect(() => { // this use effect will get the all published books and store them into bookContent state
                    axios(`${!window.location.href.includes("localhost") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book/meta`).then((o)=>{setBookMetaContent(o.data)})
                    // getDocsInCollection("books_array", "visibility", "==", "public", setBookContent)
          }, [])
          // this oject contains all states variables
          const states = {
                    bookContent,
                    bookMetaContent,
                    mainPageSearchValue,
                    statesSetters: {
                              setBookContent,
                              setBookMetaContent,
                              setMainPageSearchValue,
                    } // ends statesSetters object
          } // ends states object
          // this object contains all states setters 
          return (
                    <MyContext.Provider value={states}>
                              {children}
                    </MyContext.Provider>
          )
}

export default StatesContext