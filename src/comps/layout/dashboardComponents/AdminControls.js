import React from 'react'
import Books from './adminControlesComponents/Books'
import { useLocation, useNavigate } from 'react-router-dom'
import {SiBookstack} from 'react-icons/si';
import {FaUsers} from 'react-icons/fa';
import Users from './adminControlesComponents/Users';
const AdminControls = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // this array will use to create routes
  const components = [
    {
      path: "books",
      element: <Books/>
    },
    {
      path: "users",
      element: <Users/>
    }
  ]; // ends components
  // this array will use to create navigation menu
  const nav = [{
    name: "books",
    icon: <SiBookstack/>
},{
  name: "users",
  icon: <FaUsers/>
}] // ends nav
  return (
    <div>
      <div className="
      flex gap-2 py-2 items-center justify-center nav">
        {
          nav.map((item)=>(
            <h4
            onClick={()=> navigate(`/admin-controls/${item.name}`)}
            className={`
            flex gap-2 px-6 py-3 cursor-pointer ${location.pathname.includes(item.name) ? "border-b-2 border-b-green-600 text-slate-800" : " text-slate-600"}
            `}>{item.icon} {item.name}</h4>
          ))
        }
      </div>
    {
      components.map((item)=>(
        location.pathname.includes(item.path) &&
      item.element
     ))
    }
    </div>
  )
}

export default AdminControls