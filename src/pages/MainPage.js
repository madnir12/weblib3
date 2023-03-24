import React, { useState, useEffect } from 'react'
import Header from '../comps/layout/Header'
import { Outlet } from 'react-router-dom'
import PreLoader from '../comps/auth/PreLoader'
import Books from '../comps/layout/main_page/Books'
const MainPage = () => {
  const [ready, setReady] = useState("checking")
  useEffect(()=>{
    setTimeout(()=>{
      setReady("ready")
    },3000)
  },[])
  if(ready !== "ready") return <PreLoader/>
  else return (
    <>
        <Header />
        <Outlet/>
        {
          (window.location.pathname === "/" || window.location.pathname === "") && <Books/>
        }
        
      </>
  )
}

export default MainPage