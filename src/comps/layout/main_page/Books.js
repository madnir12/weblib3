import React from 'react'
import MyContext from '../../../context/MyContext'
import { Link } from 'react-router-dom'
import { timeSince } from '../../../assets/function'
import SharePopup from '../SharePopup'
import { newBook } from '../../../assets/firebaseStucture'
import axios from 'axios';
// import { updateDocField } from '../../../assets/config/firebase'
const Books = () => {
  // this function use to add a field called pageType to all pages of all books
//   const myNewFunction = (pages,id)=>{
//     const newArray = pages.map((obj) => {
//       return {...obj, pageType: 'content page' };
//     });
//     const action = ()=>{console.log("success " + id)}
//     const obj = {
//       pages: newArray
//     }
//     // updateDocField("books_array",id,obj,{action})
//   },// ends myNewFunction function

  return (
    <MyContext.Consumer>
          {
                    value=><>
                    <div className="books-container">
          {
            value.bookMetaContent.length > 0 ? value.bookMetaContent.map((doc) => {
              const { autherName,autherPhoto, name,bookCover,createdAt,pages,visibility,autherId,categories,otherUsers } = doc;
              // this code add all book from firebase to mongodb
              // axios.post("http://localhost:5000/book/add",{name,autherId,autherName,autherPhoto,visibility,otherUsers,categories,bookCover}).then((o)=>{
              //   let bookId = o.data.result._id;
              //   pages.map((page)=>{
              //     const {content,otherUsers,pageNumber,pageType,visibility} = page
              //     axios.post(`http://localhost:5000/book/update/${bookId}`,{content,otherUsers,pageNumber,pageType,visibility}).then((o)=>{console.log(o)}).catch((err)=>{console.log(err)})
              //   })
              // })
              // ends transfaring data
              if(visibility === "public") return (
                <>
                  <div className="bookRaw">
                    <div className="image">
                      <img src={bookCover} alt="" />
                    </div>
                    <div className="book-content">
                      <div className="title urdu-marker">
                      <Link to={`/book/${doc._id}=1`}><h4>{name}</h4></Link>
                      </div>
                      <div className="profile">
                        <div className="left">
                        <img src={autherPhoto} alt="" /><br />
                        </div>
                        <div className="right">
                        <span className='title urdu'>{autherName}</span>
                        <span>{`added: ${timeSince(createdAt)}`}</span>
                        <span>{`Publisher: someone`}</span>

  
                      </div>
                      </div>
                      <span className='share'>
                      <SharePopup url={`${window.location.href}book/${doc._id}=1`}/>
                      
                      </span>
                    </div>
                  </div>
                </>
              )
            }) : <h3>Loading...</h3>
  
          }
        </div>
                    </>
          }
    </MyContext.Consumer>
  )
}

export default Books