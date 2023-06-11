import React,{useState} from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { BsPlusLg } from 'react-icons/bs'
import BtnByVerse2 from '../../verse-buttons/BtnByVerse2'
import { updateDocField } from '../../../../assets/config/firebase'
import {useLocation,useNavigate} from 'react-router-dom'
import { increment,arrayUnion, setLogLevel} from 'firebase/firestore'
import axios from 'axios';
import {AiOutlineEdit} from 'react-icons/ai'
// ...
const SinglePage = ({ pages,allPages }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inputValue, setInputValue] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const docId = location.pathname.split("/dashboard/mybook/b/")[1] // to get doc id

  
  // this function parform all steps to create a new page
  const createNewPage = ()=>{
    axios.post(`${!window.location.href.includes("localhost") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book/add-custom-page/${docId}`,{pageNumber: pages+1,content: ""}).then((o)=>{navigate(`/editor/${docId}/page=${pages+1}`)}).catch((error)=>{console.log(error)
    })
    // const obj = {
    //   "pages": arrayUnion({
    //     visibility: "private",
    //     pageType: "content page",
    //     CreatedAt: new Date(),
    //     lastEditAt: new Date(),
    //     content: "",
    //     otherUsers: [],
    //     pageNumber: pages+1
    //   }),
    //   "lastEditAt": new Date(),
    //   "numberOfPages": increment(1)
    // }; // use to create an initial page
    // function action(){
    //   navigate(`/editor/${docId}/page=${pages+1}`)
    // }
    // updateDocField("books_array",docId,obj,{action})
  } // ends create new page function
  const changeCurrentIndex = (event)=>{
    event.preventDefault()
    if(inputValue <= allPages.length){
      setCurrentIndex((y)=> y = inputValue-1)
    }
  } // ends change current index
  const incrementPageNumber = ()=>{// this will handle next page functionality
    if(currentIndex < allPages.length-1){
      setCurrentIndex((y)=> y = y+1)
      setInputValue((y)=> y = y+1)
    }
  } // ends incrementPageNumber method
  const decrementPageNumber = ()=>{// this will handle prev page functionality
    if(currentIndex > 0){
      setCurrentIndex((y)=> y = y-1)
      setInputValue((y)=> y = y-1)
    }
  } // ends decrementPageNumber method
  return (
    <div className="single-page">
      {
        pages === 0 ? <div className="top-bar">
        <h4>No Page Added</h4>
        
        <BtnByVerse2 text="Add Page" icon={<BsPlusLg />} clickAction={createNewPage}/>
        
      </div> : <>
      <div className="top-bar">
        <div className="search-pages">
        <form action="" onSubmit={(event)=>changeCurrentIndex(event)}>
        <input type="number" value={inputValue} onChange={(e)=> setInputValue(e.target.value)}/>
        </form>
        <span>/{pages}</span>
        </div>
        <div className="navigate">
        <span className="prev" onClick={()=> decrementPageNumber()}><MdNavigateBefore /></span>
        <span className="next" onClick={()=> incrementPageNumber()}>
          <MdNavigateNext />
        </span>
        </div>
        <div className="buttons">
        <span className='edit-button' onClick={()=>{
          navigate(`/editor/${docId}/page=${inputValue}`)
        }}><AiOutlineEdit/>  Edit Page</span>
        <BtnByVerse2 text="Add Page" icon={<BsPlusLg />} clickAction={createNewPage}/>
        </div>

      </div>
      <div className="page-div-container">
        {
          allPages[currentIndex].pageType === "content page" ? <div className="page"
          dangerouslySetInnerHTML={{
            __html: allPages[currentIndex].content,
          }}
          >
            
          </div> : <div className="page">
            {
              allPages[currentIndex].content.map((doc,index)=>{
                return <>
                  <table>
                    {
                      index < 1 ? <thead>
                      <tr>
                        <th className='urdu'>{doc.first}</th>
                        <th className='urdu'>{doc.second}</th>
                      </tr>
                    </thead> : <tbody>
                       <tr onClick={()=>{
                        if(doc.second < allPages.length){
                          setCurrentIndex((y)=> y = doc.second - 1)
                          setInputValue((y)=> y = doc.second - 1)
                        }
                       }}>
                       <td className='urdu'>{doc.first}</td>
                       <td className='urdu center'>{doc.second}</td>
                       </tr>
                    </tbody>
                    }
                  </table>
                </>
              })
            }
          </div>
        }
      </div>
      </>
      }
      
    </div>
  )
}

export default SinglePage