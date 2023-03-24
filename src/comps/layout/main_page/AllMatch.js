import { collectionGroup } from 'firebase/firestore';
import React, { useState } from 'react'
import { getText, timeSince } from '../../../assets/function'
import SingleMatch from './SingleMatch';

const AllMatch = ({ item, query }) => {
       const [pagesDisplay, setPagesDisplay] = useState(false)
       const totalFounds = item.pages.filter((item) => getText(item.content).includes(query)).length;
       const { autherName, autherPhoto, name, bookCover, bookCreatedAt } = item
       return (
              <div className="single-match-container">
                     <div className="book-row" onClick={() => setPagesDisplay(!pagesDisplay)}>
                            <div className="img">
                                   <img src={bookCover} alt="" />
                            </div>
                            <div className="details">
                                   <h4 className='text urdu-marker'>{name}</h4>
                                   <h4 className='text-secondary'>Total pages found: {totalFounds}</h4>
                                   <h4 className='text-secondary'>Created At: {timeSince(bookCreatedAt)}</h4>
                                   <h4 className='text-secondary'>Publisher: someone</h4>
                                   <div className="profile">
                                          <img src={autherPhoto} alt="" />
                                          <span className='text-secondary'>{autherName}</span>
                                   </div>

                            </div>
                     </div>
                     <div className={!pagesDisplay ? "pages-container show hide" : "pages-container"}>
                            {
                                   item.pages.map((singleItem) => {
                                          if (getText(singleItem.content).includes(query)) {
                                                 return <SingleMatch item={singleItem} book={item} query={query}/>
                                          }
                                   })
                            }
                     </div>
              </div>
       )
}

export default AllMatch