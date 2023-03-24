import React,{useEffect,useState} from 'react';
import PreLoader from './PreLoader';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from '../../assets/config/firebase'

function Protected({LMT}) {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState("checking")
  const auth = getAuth(app);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {

        setIsLogin(true)
  
      } else {
        setIsLogin(false)
      }
    });
  },[])
  useEffect(() => {
    isLogin === false ? navigate("/login") : console.log("")

  },[isLogin])
  
        return(
          <>
          {
            isLogin === "checking" ? <PreLoader/> : <LMT/>
          }
          </>
        )  
           
      
}

export default Protected