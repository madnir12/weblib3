import React,{useState,useEffect} from 'react'
import MyContext from '../../../context/MyContext'
import SinglePageForFrontend from '../SinglePageForFrontend'
import PreLoader from '../../auth/PreLoader'
import Header from '../Header'
import {useLocation} from 'react-router-dom'
const Book = () => {
  const location = useLocation();
  const [ready, setReady] = useState("checking")
  useEffect(()=>{
    setTimeout(()=>{
      setReady("ready")
    },1000)
  },[])
  if(ready !== "ready") return <PreLoader/>
  else return (
          <MyContext.Consumer>
          {
                    (value)=>{
                              const book = value.bookContent.find(doc=> doc._id === location.pathname.split("book/")[1].split("=")[0]); // this will return a book based on url id
                              return <>
                               {
                                        book !== undefined ? <span className="right-after-header"><SinglePageForFrontend pages={book.pages.length} allPages={book.pages} book={book} /></span> : <h1>Loading</h1>
                               }
                              </>
                    }
          }
          </MyContext.Consumer>
  )
}

export default Book