import React,{useEffect} from 'react'
import MyContext from '../../../context/MyContext'
import { IoMdCloudDownload } from 'react-icons/io'
import { downloadFile } from '../../../assets/function'
import { auth } from '../../../assets/config/firebase'
import {useNavigate} from 'react-router-dom'
const AdminControls = () => {
  const navigate = useNavigate();
  useEffect(()=>{
    auth.currentUser !== null && auth.currentUser.email !== "aneesriaz984@gmail.com" && navigate("/login")
  })
  return (
    <div>
      <MyContext.Consumer>
        {

          value => <>
            <div className="admin-books-container">
              {
                value.bookContent.length > 0 && value.bookContent.map((doc) => {
                  const { bookCover, name } = doc
                  return <div className="book">
                    <div className="left">
                      <img src={bookCover} alt={name} />
                      <div>
                        <h4 className='urdu center'>{name}</h4>
                        <h4
                          onClick={()=> downloadFile(doc)}
                          className='download center'><IoMdCloudDownload /> Download</h4>
                      </div>
                    </div>
                  </div>
                })
              }
            </div>
          </>
        }
      </MyContext.Consumer>
    </div>
  )
}

export default AdminControls