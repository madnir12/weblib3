import React, {useState} from 'react'
import InputByVerse from './InputByVerse/InputByVerse'
import axios from 'axios'
import Select from './Select'
import { addNewDoc } from '../../assets/config/firebase'
import { newBook } from '../../assets/firebaseStucture'
import {useNavigate} from 'react-router-dom'
import MiniLoader from './MiniLoader'
const Popup = ({modelActive,cancel}) => {
  const [bookName, setBookName] = useState("")
  const [miniLoader, setMiniLoader] = useState(false)
  const [visibility, setVisibility] = useState("")
  const navigate = useNavigate()
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
        navigate(`/dashboard/mybook/${id}`)
  } // ends afterbookcreated method
  return (
<div className={modelActive ? "model-background show" : "model-background hide"}>
  <div className="model-container">
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
        axios.post(`${window.location.pathname.includes("weblib3") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book/add`,newBook(bookName,visibility))
        .then((o)=>{
          afterBookCreated(o.data.result._id);
        })
        // addNewDoc("books_array",newBook(bookName,visibility),afterBookCreated)
        
      }
    }
      } className={bookName !== "" && visibility !== "" ? "active" : "disable" }
      >{miniLoader === false ? "Add" : <MiniLoader/>}</button>
    </div>
  </div>
</div>
  )
}

export default Popup