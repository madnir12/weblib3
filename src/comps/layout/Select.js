import React from 'react'

const Select = ({options, currentSelection}) => {
  return (
    <div>
         {
                              options.map((item)=>{
                                        const {name,value,setValue} = item
                                       return <>
                                       <div className="single-option">
                                       <input type="radio" id={value} value={value} name={name} checked={ 
                                        currentSelection === value ? true : false
                                        } onClick={(e)=> setValue(e.target.value)}/>
                                        <label htmlFor={value}>{value}</label>
                                       </div>
                                       </>

                              })
                    }
    </div>
  )
}

export default Select