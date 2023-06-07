import React, {useEffect, useState} from 'react'
import InputByVerse from './InputByVerse/InputByVerse'
import axios from 'axios'
import Select from './Select'
import { addNewDoc, auth, getSingleDoc, handleLogout } from '../../assets/config/firebase'
import { newBook } from '../../assets/firebaseStucture'
import {useNavigate} from 'react-router-dom'
import MiniLoader from './MiniLoader'
const Popup = ({modelActive,cancel}) => {
  const [bookName, setBookName] = useState("")
  const [miniLoader, setMiniLoader] = useState(false)
  const [visibility, setVisibility] = useState("")
  const [accountPermission, setAccountPermission] = useState(null);
  const navigate = useNavigate()
  useEffect(()=>{
     auth.currentUser &&  getSingleDoc("users",auth.currentUser.uid,(data)=>{
      setAccountPermission(data.permissionStatus);
     })
  },[])
  
  const options = [
    {
      name: "visibility",
      value: "public",
      setValue: setVisibility
    },
    {
      name: "visibility",
      value: "private",
      setValue: setVisibility
    }
  ]
  // this method will run when the book been created successfully
  const afterBookCreated = (id)=>{
    setVisibility("")
        setBookName("")
        cancel(false) // this will hide popup
        navigate(`/dashboard/mybook/b/${id}`)
  } // ends afterbookcreated method
  console.log(accountPermission)
  return (
<>
 <div className={modelActive ? "model-background show" : "model-background hide"}>
  <div className="model-container">
  {accountPermission !== null && accountPermission === "allowed" ? <>
  <h3>Add A New Book</h3>
    <br />
    <InputByVerse labelText="Book Name" setInputValue={setBookName} inputValue={bookName}/>
    <br /><br /><br />
    <h4>Visibility</h4>
    <Select currentSelection={visibility} options={options}/>
    <div className="button-container">
    <button onClick={()=> cancel(false)} className="cancel">Cancel</button>
    <button onClick={()=> {
      if(bookName !== "" && visibility !== "" && miniLoader === false) {
        setMiniLoader(true)
        axios.post(`${!window.location.pathname.includes("localhost") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book/add`,newBook(bookName,visibility))
        .then((o)=>{
          afterBookCreated(o.data.result._id);
        })
        // addNewDoc("books_array",newBook(bookName,visibility),afterBookCreated)
        
      }
    }
      } className={bookName !== "" && visibility !== "" ? "active" : "disable" }
      >{miniLoader === false ? "Add" : <MiniLoader/>}</button>
    </div>
  </> : <>
  <h5 className=' text-slate-800 text-center font-serif text-2xl 
   uppercase'>your account is not varified </h5>
   <p className='mt-5 text-justify px-10 font-serif text-slate-500'>
   "Account Verification Required: We regret to inform you that your account is currently not verified, preventing you from publishing your book. To proceed, we kindly request you to navigate to the settings section and complete the account verification process.

Account verification is essential for ensuring the trust and authenticity of our literary community. By verifying your account, you demonstrate your commitment to maintaining a high standard of quality and credibility. It also provides readers worldwide with the assurance that they are engaging with legitimate and trustworthy content.

We understand that account verification may seem like an additional step, but we assure you that it is a necessary measure to protect the integrity of our platform and provide a secure environment for authors and readers alike.

Once your account is verified, you will have the freedom to confidently share your literary masterpiece with readers across the globe. We appreciate your understanding and cooperation in this matter.

If you require any assistance during the verification process, our dedicated support team is readily available to assist you. We apologize for any inconvenience caused and appreciate your patience and continued support as we work together to maintain the integrity of our vibrant literary community.


   </p>
   <div className="button-container">
    <button onClick={()=> cancel(false)} className="cancel text-blue-500">Close</button>
   
    </div>
  </> }
    
  </div>
</div>

</>
  )
}

export default Popup