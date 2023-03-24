import React from 'react'

const BtnByVerse2 = ({icon,text,clickAction}) => {
  return (
          <button className="button" onClick={()=> clickAction()}>
          {icon}
          {text}
      </button>
  )
}

export default BtnByVerse2