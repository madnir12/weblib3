import React,{useState,useEffect} from 'react'
import {BiSearchAlt2} from 'react-icons/bi'
import {AiOutlineLogout} from 'react-icons/ai';
import {Link, useNavigate} from 'react-router-dom'
import { auth } from '../../assets/config/firebase'
import {HiOutlineArrowLeft} from 'react-icons/hi'
import Profile from './Profile'
import { getSingleDoc } from '../../assets/config/firebase'
import MyContext from '../../context/MyContext';
import {CgProfile} from 'react-icons/cg'
function Header() {
  const [profile, setProfile] = useState(" "),
  [elementsDisplay,setElementsDisplay] = useState(false),
  navigate = useNavigate();
  useEffect(() => {
    if(auth.currentUser) getSingleDoc("users", auth.currentUser.uid, setProfile)
   }, [])
   const searchDisplay = ()=> (window.innerWidth > 944 || elementsDisplay)
  return (
          <div className="header no-print">
            <div className="left" style={{display: elementsDisplay && "none"}}>
              <Link to="/">
              <img src="https://raw.githubusercontent.com/madnir12/showon/main/ISDP14_14_-removebg-preview.png" alt="" />
              </Link>
            </div>
          <MyContext.Consumer>
            
            {
              value=> <div className="search-box-area" style={{display: searchDisplay() && "flex"}}>
              <form onSubmit={(e)=>{
                e.preventDefault()
                setElementsDisplay(false)
                navigate(`/search/?q=${value.mainPageSearchValue}`)
              }}>
              <HiOutlineArrowLeft className='mobile' 
              onClick={()=> setElementsDisplay(false)}
              />
              <BiSearchAlt2 style={{display: elementsDisplay && "none"}}/>
              <input className='urdu' type="text" onChange={(e)=>{
                value.statesSetters.setMainPageSearchValue(e.target.value);
              }} placeholder='Search books' />
              </form>
            </div>
            }
          </MyContext.Consumer>
          <div className="right">
          <div className="profile-container" style={{display: elementsDisplay && "none"}}>
          <h4 className='inline-flex mobile' onClick={()=> setElementsDisplay(true)}><BiSearchAlt2/></h4>
          {
            auth.currentUser ? <>
            <Link to="/dashboard/mybook"><h4 className="menage">
              Manage Books
            </h4></Link>
            
            <Profile {...profile}/>
            </> : <><Link to="/login" className='pc'><h4>Login</h4></Link><Link to="/login" className='mobile' style={{display: elementsDisplay && "none"}}><h4 className='mobile'><CgProfile/></h4></Link></>
          }
          </div>
          </div>
        </div>
  )
}

export default Header