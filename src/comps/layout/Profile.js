import React,{useState} from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import { handleLogout } from '../../assets/config/firebase'
import { useNavigate,useLocation} from 'react-router-dom'

const Profile = ({userName,userPhoto,userEmail}) => {
  const navigate = useNavigate(null)
  const [profileDisplay, setProfileDisplay] = useState(false)
  const location = useLocation(); // this will help us to get the loation
  console.log(userPhoto)
  return (
          <div className="profile-container">
        
          <img src={userPhoto} onClick={() => setProfileDisplay(!profileDisplay)} alt="" />
          <div className={profileDisplay ? "profile-dropdown-box" : "profile-dropdown-box closed"}>
            <img src={userPhoto} alt="" />
            <h5>{userName}</h5>
            <p>{userEmail}</p>
            <h4 onClick={() =>
              {

                handleLogout()
                setTimeout(()=>{
                  window.location.reload()
                },1)
                
                
              }
            }><AiOutlineLogout /> Logout</h4>
          </div>
        </div>
  )
}

export default Profile