import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
import { getText } from '../../../assets/function';

const SingleMatch = ({ item, book, query }) => {
       const navigate = useNavigate();
       const [display, setDisplay] = useState(false)
       const { pageNumber, } = item;
       let content = item.content, // page content
              matches = (getText(content).match(new RegExp(query, "gi")) || []).length,
              reg = new RegExp(query, "gi"), // Regular expression object
              result,
              indexes = []; // use to contains all start indexes
       while ((result = reg.exec(getText(content))) !== null) indexes.push(result.index); // push all indexes into indexes array
       return <div className="single-page-container">
              <div className="page-top" onClick={()=> setDisplay(!display)}>
                     <div className="rotate">
                            <h4 className='text-secondary'>
                                   <span>Page</span>

                                   {pageNumber}
                            </h4>
                     </div>
                     <h3 className='text-secondary'>Matches: {matches}</h3>
              </div>
              <div className={display ? "page-bottom-container show" : "page-bottom-container show hide"}>
                     {
                            indexes.map((start,index) => { // this will display all matches in text
                                   let textAtTheEnd = getText(content).substring(start, getText(content).length)
                                   return <div className="page-bottom" 
                                   onClick={()=> navigate(`/book/${book._id}=${pageNumber}`)}
                                   >
                                          <div className="left">
                                                 <h4 className='text-secondary'>{index+1}</h4>
                                          </div>
                                          <div className="right urdu-marker">
                                           {
                                                 textAtTheEnd.length <= 300 ? textAtTheEnd : `${textAtTheEnd.substring(0,300)}...`
                                           }
                                          </div>
                                   </div>
                            })
                     }
              </div>
       </div>
}

export default SingleMatch