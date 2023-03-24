import React from 'react'
import {useLocation,Link} from 'react-router-dom'
const BottomButton = ({path,icon,text}) => {
  const location = useLocation();
console.log(location.pathname)
  return (
    <Link to={path}>
    <div className={location.pathname === path ?                        
      "bottom-button-container active" : "bottom-button-container"  }>
          <span>{icon}</span>
          <span>{text}</span>
    </div>
    </Link>
  )
}

export default BottomButton