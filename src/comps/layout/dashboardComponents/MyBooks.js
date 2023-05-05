import React from 'react'
import { getDocsInCollection, auth } from '../../../assets/config/firebase'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
const MyBooks = ({ setter, singleBook }) => {
  const [adminContent, setAdminContent] = useState([])
  const [ready, setReady] = useState(false);
  const location = useLocation()

  useEffect(() => {
    auth.currentUser !== null && axios(`${!window.location.href.includes("localhost") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book/search/autherId/${auth.currentUser.uid}`).then((o)=>{
      setAdminContent(o.data)
      setReady(true)
    }).catch((err)=>{setReady(true)})
    // auth.currentUser !== null && getDocsInCollection("books_array", "autherId", "==", auth.currentUser.uid, setAdminContent)
  }, [])
  return (
    ready ? <div>
      <Outlet />

      {
        location.pathname === "/dashboard/mybook" && adminContent.length === 0 ? <h5>No Book Added</h5> : location.pathname === "/dashboard/mybook" && adminContent.map((doc) => {
          const { name, bookCover, createdAt } = doc

          return (
            <>
              <div className="bookRaw">
                <img src={bookCover} alt="" />
                <div className="bookData">
                  <Link to={`/dashboard/mybook/b/${doc._id}`}><h4 className='urdu'>{name}</h4></Link>
                  <span className='text-secodary'> Added At: {new Date(createdAt).toDateString()} </span>
                </div>
              </div>
            </>
          )
        }) 
      }
    </div> : <h4>Loading...</h4>
  )
}

export default MyBooks