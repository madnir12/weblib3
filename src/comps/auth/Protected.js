import React,{useEffect,useState} from 'react';
import PreLoader from './PreLoader';
import { useNavigate,useLocation } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {app} from '../../assets/config/firebase'

function Protected({LMT}) {
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState("checking")
  const location = useLocation();
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
    isLogin === false ? navigate("/login",{state: {from: location.pathname}}) : console.log("")

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