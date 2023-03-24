import { FaShareAlt } from 'react-icons/fa'
import React, { useState, useEffect } from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { AiFillPrinter } from 'react-icons/ai'
import BtnByVerse2 from './verse-buttons/BtnByVerse2'
import { useLocation, useNavigate } from 'react-router-dom'
import { share } from '../../assets/function'
import SharePopup from './SharePopup'
const SinglePageForFrontend = ({ pages, allPages, book }) => {
  const location = useLocation(),
    navigate = useNavigate(),
    pageNumber = +location.pathname.split("=")[1],
    bookId = location.pathname.split("book/")[1].split("=")[0],
    newLocation = (act = "inputValue") => `/book/${bookId}=${act === "+" ? pageNumber + 1 : act === "-" ? pageNumber - 1 : inputValue}`,
    [inputValue, setInputValue] = useState(pageNumber),
    [vw, setVw] = useState(window.innerWidth),
    url = window.location.href;

  useEffect(() => {
    document.addEventListener("resize", updateVw())

    return () => {
      document.removeEventListener("resize", updateVw())
    }
  })
  useEffect(()=>{
    window.addEventListener("keydown",handleKeyDown)
    return ()=>{
      window.removeEventListener("keydown",handleKeyDown)
    }
  })
  // this function will use to set current window size to vw
  const updateVw = () => {
    setVw(window.innerWidth);
  } // ends function updateVw


  // this function will change page index 
  const changeCurrentIndex = (event) => {
    event.preventDefault()
    if (inputValue <= allPages.length) {
      navigate(newLocation())
    }
  } // ends change current index
  const incrementPageNumber = () => {// this will handle next page functionality
    if (pageNumber < allPages.length) {
      setInputValue(pageNumber + 1)
      navigate(newLocation("+"))
    }
  } // ends incrementPageNumber method
  const decrementPageNumber = () => {// this will handle prev page functionality
    if (pageNumber > 1) {
      setInputValue(pageNumber - 1)
      navigate(newLocation("-"))
    }
  } // ends decrementPageNumber method
  const handlePrint = () => { // this function eill use to print page
    window.print()
  } // ends handlePrint function
  const handleKeyDown = (event)=>{
   console.log("event fired")
    if (event.key === 'ArrowRight') {
        incrementPageNumber();
      } else if (event.key === 'ArrowLeft') {
        decrementPageNumber();
      }
  } // ends handleKeyDown
  return (
    <div className="single-page">
      {
        pages === 0 ? <div className="top-bar">
          <h4>No Page Added</h4>

        </div> : <>
          <h4 className='book-title urdu no-print'>{book.name}</h4>
          <div className="frontend">
            <div className="top-bar no-print">
              <div className="search-pages">
                <form action="" onSubmit={(event) => changeCurrentIndex(event)}>
                  <input type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                </form>
                <span>/{pages}</span>
              </div>
              <div className="navigate">
                <span className="prev" onClick={() => decrementPageNumber()}><MdNavigateBefore /></span>
                <span className="next" onClick={() => incrementPageNumber()}>
                  <MdNavigateNext />
                </span>
              </div>
              <div className="buttons">
                <div className="inline-center">
                  <span className="share inline-center">
                    
                    <SharePopup url={url} />
                  </span>
                  <BtnByVerse2 text={vw <= 406 ? "Print" : "Print Page"} icon={<AiFillPrinter />} clickAction={handlePrint} />
                </div>
              </div>

            </div>
          </div>
          <div className="page-div-container">
        {
          allPages[pageNumber-1].pageType === "content page" ? <div className="page"
          dangerouslySetInnerHTML={{
            __html: allPages[pageNumber-1].content,
          }}
          >
            
          </div> : <div className="page">
            {
              allPages[pageNumber-1].content.map((doc,index)=>{
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
                          navigate(`/book/${bookId}=${doc.second}`);
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
} // ends singlepageforfrontend

export default SinglePageForFrontend                                                                       