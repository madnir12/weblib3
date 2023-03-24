import React,{useState} from 'react'

const Input = ({label,type,setter}) => {
          return (
                    <span>

                              <label htmlFor={label}>{label}</label>
                              <input type={type} id={label} onChange={(e) => setter(e.target.value)}/>
                    </span>
          )
}

export default Input