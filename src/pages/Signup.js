import { FcGoogle } from 'react-icons/fc'
import { useNavigate, Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import PreLoader from '../comps/auth/PreLoader'
import { auth, signinWidthGoogle } from '../assets/config/firebase';
import { BiError } from 'react-icons/bi'
import Input from '../comps/layout/Input'

function Signup() {
  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [isLogin, setIsLogin] = useState("checking")
  const [errorDisplay, setErrorDisplay] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();
  
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        // const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        setErrorDisplay(true)
      });
  }
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogin(true)

      } else {
        setIsLogin(false)
      }
    });
  }, [])
  if (isLogin === true) { 
    if (location.state && location.state.from) {
      navigate(location.state.from);
    } else {
      // Navigate to a default route
      navigate('/');
    }
   }
  else if (isLogin === false) {
    return (
      <div className="background">
        <div className="front-div">
          <img className='img-abs' src="https://pngimg.com/uploads/book/book_PNG51090.png" alt="" />
          <div className="headings-container">

            <h2>Welcome To ISDP Library</h2>
            <h3>Let's Create An Account  </h3>
            <div className="form-container">
              <div className="error-message" style={{ display: errorDisplay ? "flex" : "none" }}>
                <BiError />
                <h5>There is an issue with email or password</h5>
              </div>
              <form action="" onSubmit={(event) => event.preventDefault()}>
                
                <Input label="Email" type="email" setter={setEmail}/>
                <Input label="Password" type="password" setter={setPassword}/>
                <button onClick={() => handleLogin()} className='login'>Create Account</button>
                <button onClick={() => signinWidthGoogle()}><FcGoogle /> Continue Width Google</button>
                <h4>Or</h4>
                <Link to="/signup"><button>Login With existing Account</button></Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return isLogin === "checking" && <PreLoader />

}

export default Signup