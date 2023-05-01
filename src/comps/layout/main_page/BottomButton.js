import React from 'react'
import {useLocation,Link} from 'react-router-dom'
const BottomButton = ({path,icon,text}) => {
  const location = useLocation();
  return (
    <Link to={path}>
    <div className={location.pathname === path ?                        
      "bottom-button-container active" : path === "dashboard" && location.pathname.includes("dashboard") ? "bottom-button-container active" : path === "/" && location.pathname.includes("/book") ? "bottom-button-container active" : "bottom-button-container"  }>
          <span>{icon}</span>
          <span>{text}</span>
    </div>
    </Link>
  )
}

export default BottomButton