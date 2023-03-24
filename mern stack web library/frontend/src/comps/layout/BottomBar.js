import React from 'react'
import BottomButton from './main_page/BottomButton'
import { bottomButtonsArray } from '../../assets/data'
const BottomBar = () => {
  
  return (
    <div className='bottom-bar'>
      {
        bottomButtonsArray.map((item)=>{
          return <BottomButton {...item}/>
        })// ends map
      }
    </div>
  )
}

export default BottomBar