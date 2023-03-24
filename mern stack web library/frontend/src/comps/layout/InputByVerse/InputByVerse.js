import React from 'react'

const InputByVerse = ({labelText,setInputValue,inputValue}) => {
  return (
    <div className="input-container">
           <div class="container">
        <input type="text" value={inputValue} required="required" onChange={(e)=> setInputValue(e.target.value)}/>
        <label>{labelText}</label>
        <i></i>
    </div>
    </div>
  )
}

export default InputByVerse