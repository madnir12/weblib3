import React from 'react'
import { Link } from 'react-router-dom'
const Sidebar = ({userName,userPhoto}) => {
  const navButtons = [
    {
      text: "Dashboard",
      icon: "fa fa-desktop",
      action: "a"
    },
    {
      text: "My Profile",
      icon: "fa fa-user",
      action: "a"
    },
    {
      text: "My Books",
      icon: "fa fa-book",
      action: "/dashboard/mybook"
    
    },
    {
      text: "Setting",
      icon: "fas fa-sliders-h",
      action: "/dashboard/setting"
    },
    {
      text: "About",
      icon: "fa fa-info-circle",
      action: "a"
    },
    {
      text: "Contact Us",
      icon: "fas  fa-address-book",
      action: "a"
    }
  ]
  return (
          <div class="sidebar">
              <div class="profile_info">
                  <img src={userPhoto} class="profile_image" alt=""/>
                  <h4>{userName}</h4>
              </div>
              {
                  navButtons.map((item)=>{
                    const {text, icon,action } = item
                    return <Link to={action}><i className={icon}></i><span>{text}</span></Link>
                  })
              }
          </div>
  )
}

export default Sidebar