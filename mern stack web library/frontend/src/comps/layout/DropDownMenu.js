import React,{useState} from 'react'

const DropDownMenu = ({options,initial}) => {
          const [optionDisplay, setOptionDisplay] = useState(false)
          const [labelValue, setLabelValue] = useState(initial)
          const [active, setActive] = useState(initial)
  return (
          <div className='option-container'>
            <div onClick={()=> setOptionDisplay(!optionDisplay)} className="selector">
              {labelValue}
              <span className='arrow' style={{
                borderColor: labelValue === "" ? !optionDisplay ? "black transparent transparent" : "transparent transparent black transparent" : optionDisplay ? "transparent transparent white transparent" : "white transparent transparent",
                top: optionDisplay ? "18px" : "26px"
                }}></span>
            </div>
          <div className="custom-options" style={{display: optionDisplay ? "block " : "none"}}>
              {
          options.map((obj,i)=>{
                  return(
                    <>
           <input type='radio' id={"option"+i} name='answer' value={obj.value} onClick={(e)=>{ 
             obj.action(e.target.value)
             setActive(e.target.value)
           }} />
         <label  for={"option"+i} className="option" onClick={(e)=>{ setLabelValue(e.target.innerHTML)
       setOptionDisplay(false)
         }}>{obj.value}</label>
          </>
                  )
                })
              }
  

</div>
              
              
            
            
          </div>
          
         )
}

export default DropDownMenu