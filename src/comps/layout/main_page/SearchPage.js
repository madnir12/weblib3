import React from 'react'
import { useLocation } from 'react-router-dom'
import { getText } from '../../../assets/function';
import MyContext from '../../../context/MyContext';
import AllMatch from './AllMatch';
function SearchPage() {
  // to get search query
  const location = useLocation(),
    searchParams = new URLSearchParams(location.search),
    query = decodeURIComponent(searchParams.get("q"));
  return (
    <MyContext.Consumer>
      {
        value => {
          let contentArray = value.bookContent.filter((item)=>{
            return item.name.includes(query) || item.pages.some((item)=>{
              return getText(item.content).includes(query) && item 
            })
          }) // this will create an arry of matches
          
          return <>
            <div className="container right-after-header">
              <div className="inner-container">
                {
                  contentArray.length === 0 ? <h4>Not Found</h4> : contentArray.map(item => {
                    return <AllMatch item={item} query={query} />
                  })
                }
              </div>
            </div>
          </>
        }
      }
    </MyContext.Consumer>
  )
}

export default SearchPage