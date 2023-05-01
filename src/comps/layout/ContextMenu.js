import React,{useEffect,useRef} from 'react'
const ContextMenu = ({options}) => {
  const contextMenuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      // Check if the clicked element is outside the context menu
      if (!event.target.matches("svg")) {
        // Hide the context menu
        contextMenuRef.current.style.display = 'none';
      }
    }

    // Attach the click event listener to the document object
    document.addEventListener('click', handleClickOutside);

    // Detach the click event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenuRef]);
  return (
    <div className='context-menu-container' ref={contextMenuRef}  id='contextMenu'>
      <div className='context-menu'>
        {
          options.map((option,i)=>{
            const {value,icon,action} = option;
            return <span key={i} className='single-option' onClick={()=> option.action()}>{icon} {value}</span>
          })
        }
      </div>
    </div>
  )
}

export default ContextMenu;