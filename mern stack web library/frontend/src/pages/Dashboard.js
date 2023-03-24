import React, { useState, useEffect } from 'react'
import Header1 from '../comps/layout/Header1'
import Sidebar from '../comps/layout/Sidebar'
import { getSingleDoc, auth } from '../assets/config/firebase'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
          const [profile, setProfile] = useState()
          

          useEffect(() => {
                   auth.currentUser !== null && getSingleDoc("users", auth.currentUser.uid, setProfile) 
          }, [])
          return (
                    <>
                              <Header1/>
                              <Sidebar {...profile} />
                              <div className="content">
                                        <Outlet />
                              </div>
                    </>
          )
}

export default Dashboard