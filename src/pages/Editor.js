import React from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { useState, useEffect, useRef } from "react";
import { hideContextMenu, wrapText, keepSelection, changeFontSize, createTable } from '../assets/function';
import { onContextMenu, handleChangeCommand } from '../assets/function';
import { options } from '../assets/data'
import Header from '../comps/layout/Header1';
import BtnByVerse2 from '../comps/layout/verse-buttons/BtnByVerse2';
import { BiSave } from 'react-icons/bi'
import { auth } from '../assets/config/firebase';
import { useLocation } from 'react-router-dom';
import { updateDocField } from '../assets/backEndFunctions';
import { editButtons } from '../assets/data';
import { BsPlusSquare,BsFonts, BsCodeSlash } from 'react-icons/bs'
import { FiEdit2 } from 'react-icons/fi'
import { setAnalyticsCollectionEnabled } from 'firebase/analytics';
import DropDownMenu from '../comps/layout/DropDownMenu';
import axios from 'axios'
import PreLoader from '../comps/auth/PreLoader'
const Editor = () => {
  const [saveStatus, setSaveStatus] = useState("hide")
  const location = useLocation()
  const [html, setHtml] = useState("");
  const [editableDivContent, setEditableDivContent] = useState()
  const [book, setBook] = useState(null)
  const [styleDisplay, setStyleDisplay] = useState(false)
  const [settingPanelDisplay, setSettingPanelDisplay] = useState(false)
  const [editorView, setEditorView] = useState("page")
  const [editableDivChange, setEditableDivChange] = useState(0)
  const [dropDownButtonsDisplay, setDropDownButtonsDisplay] = useState(false)
  const [ready, setReady] = useState(false)
  const editableDiv = useRef(null)
  let fontSizes = Array.from({ length: 74 }) // this array will us to display font sizes
  const docId = location.pathname.split("/")[2] // use to store doc id
  const pageNumber = location.pathname.split("=")[1] - 1 // use to store page number
  const savePage = (currentData, page) => { // this function use to save page content to firebase firestore
    setSaveStatus("proccessing")
    axios.post(`${!window.location.href.includes("localhost") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH }/book/update-page/${docId}`,{field: `pages.${pageNumber}.content`,content: html}).then((o)=>{
      fetchBook()
      action()
    })
    // const newBookPages = () => { // this method return new Pages of the book by relpacing spasific page
      // let tempAllPages = book.pages
      // let TempCurrentPage = tempAllPages[pageNumber]
      // const newPage = {
        // visibility: TempCurrentPage.visibility,
        // CreatedAt: TempCurrentPage.CreatedAt,
        // lastEditAt: new Date(),
        // content: currentData,
        // pageType: page === "current" ? TempCurrentPage.pageType : page,
        // otherUsers: TempCurrentPage.otherUsers,
        // pageNumber: TempCurrentPage.pageNumber
      // }
      // tempAllPages[pageNumber] = newPage
      // return tempAllPages
// 
    // } // ends newBookPages methods

    // const obj = {
    //   "pages": newBookPages(),
    //   "lastEditAt": new Date()
    // }
    function action() {
      setSaveStatus("success")
      // getSingleDoc("books_array", docId, setBook)
    }
    // updateDocField("books_array", docId, obj, { action })

  } // ends save page function
  // this function use to fetch or reinitialize book data
  const fetchBook = ()=>{
    axios(`${!window.location.href.includes("localhost") ? process.env.REACT_APP_HOST_PATH : process.env.REACT_APP_LOCAL_PATH}/book/${docId}`).then((o) => {
      setBook(o.data)
    })
  } // ends fetchBook function
  useEffect(() => {
    fetchBook()
    //  getSingleDoc("books_array", docId, setBook)
  }, [])
  useEffect(() => {
    saveStatus == "success" && setTimeout(() => setSaveStatus("hide"), 1000)

  }, [saveStatus])
  useEffect(() => {
    if (book !== null) {
      setHtml(book.pages[pageNumber].content)
      setEditableDivContent(book.pages[pageNumber].content)
      setReady(true)
    }
  }, [book])
  useEffect(() => {
    editableDivChange > 0 && setHtml(editableDiv.current.innerHTML)
  }, [editableDivChange])
  useEffect(() => {
    document.addEventListener('click', function (event) {
      if (!event.target.matches('.context-menu')) {
        hideContextMenu()
      }
    });

    return () => {
      document.removeEventListener('click', function (event) {
        if (!event.target.matches('.context-menu')) {
          hideContextMenu()
        }
      });
    }
  }, [])
  // this function use to update page type
  const pageTypeAction = (option) => {
    if (option === "content page") {
      let obj = {[`pages.${pageNumber}.pageType`]: "content page",[`pages.${pageNumber}.content`]: ""}
      updateDocField(docId,obj,fetchBook)
    } else if (option === "index page") {
      // this is the inithal array that we put to content field
      let myArray = [
        { // this object use as header of the table
          first: "فہرست",
          second: "نمبر"
        },
        {
          first: "",
          second: ""
        }
      ], // ends myArray
      obj = {[`pages.${pageNumber}.pageType`]: "index page",[`pages.${pageNumber}.content`]: myArray}
      updateDocField(docId,obj,fetchBook);
    }
  } // ends pageTypeAction function
  // this array contains options for page type menu
  const pageTypeOptions = [
    {
      value: "content page",
      action: pageTypeAction
    },
    {
      value: "index page",
      action: pageTypeAction
    }
  ]

  if (ready) {
    return (
      auth.currentUser.uid === book.autherId ? <>
        <div className="editor-header">
          <Header />
          <div className="buttons-container">
            <span style={{ display: book.pages[pageNumber].pageType === "index page" ? "inline" : "none" }}></span>
            <div className="left-buttons" style={{ display: book.pages[pageNumber].pageType === "index page" ? "none" : "block" }}>
              <span>Styles</span>
              <button className="style-button" onClick={() => {
                setStyleDisplay(!styleDisplay)
              }
              }>
                <BsFonts />
              </button>
              <span>
                Size
              </span>
              <select
                onChange={(e) => {
                  changeFontSize(e.target.value)
                  setEditableDivChange((y) => y = y + 1)
                }
                }
              >
                {
                  fontSizes.map((_, index) => {
                    let i = index + 1;
                    return <option value={i}>{i}</option>
                  })
                }
              </select>
              {
                editButtons.map((button) => {
                  const { buttonIcon, classes, command } = button
                  return (
                    <>
                      <button class={classes} data-command={command} onClick={(event) => {
                        handleChangeCommand(event)
                        setEditableDivChange((y) => y = y + 1)
                      }}>{buttonIcon}</button>

                    </>
                  )
                })
              }

            </div>
            <div className={styleDisplay ? "slide-panel" : "slide-panel hide"}>
              {
                options.map((item) => {
                  const { id, value, fontName, text } = item
                  return <>
                    <button
                      id={id}
                      className="urdu-marker style" onClick={() => {
                        wrapText(fontName)
                        setEditableDivChange((y) => y = y + 1)
                      }
                      }
                    >
                      {value}
                      <div className={`demo ${fontName}`}>
                        {text}
                      </div>
                    </button>
                  </>
                })
              }
            </div>
            <div className="right-button">
              <div className="dropDownButtons"
                style={{ display: book.pages[pageNumber].pageType === "index page" ? "none" : "block" }}
                onClick={() => setDropDownButtonsDisplay(!dropDownButtonsDisplay)}>
                {
                  editorView === "page" ? <><FiEdit2 />  Compose</> : <><BsCodeSlash /> html</>
                }
                <div className={dropDownButtonsDisplay ? "dropDown" : "dropDown hide"}>
                  <button onClick={() => setEditorView("page")}><FiEdit2 />  Compose</button>
                  <button onClick={() => setEditorView("text")}><BsCodeSlash /> html</button>
                </div>
              </div>
              <BtnByVerse2 text="Save it" icon={<BiSave />} clickAction={() => savePage(html, "current")} />
              {/* this button will toggle setting panel */}
              <span className="inline-center setting-button"
                onClick={() => setSettingPanelDisplay(!settingPanelDisplay)}
              >
                <AiFillSetting />
              </span>

              <div className="saving-msg" style={{ display: saveStatus === "hide" ? "none" : "block" }}>
                {saveStatus === "proccessing" ? "Saving..." : saveStatus === "success" && "Successfull"}

              </div>
            </div>
            <div className={settingPanelDisplay ? "slide-panel setting-panel" : "slide-panel setting-panel hide"}>
              <h4 className='text-secondary'>Page Type</h4>
              <DropDownMenu options={pageTypeOptions} initial={book.pages[pageNumber].pageType} />
            </div>
          </div>

        </div>
        <div className="App">

          <textarea
            className="text-area rtl"
            id={editorView === "page" ? "hiden" : "myTa"}
            value={html}
            onChange={(e) => {
              setHtml(e.target.value)
              setEditableDivContent(e.target.value)

            }}
            onContextMenu={onContextMenu}
            style={{
              display: editorView === "page" ? "none" : "block"
            }}
          ></textarea>



          <div className="single-page"
            style={{
              display: editorView === "page" ? "block" : "none"
            }}
          >
            <div className="page-div-container">
              <div
                style={{ display: ready && book.pages[pageNumber].pageType === "index page" ? "none" : "inline-block" }}
                ref={editableDiv}
                id={editorView === "page" ? "myTa" : "hiden"}
                onContextMenu={(event) => onContextMenu(event)}
                className="page"
                dangerouslySetInnerHTML={{
                  __html: editableDivContent
                }}
                contentEditable={true}
                onInput={(e) => setHtml(e.target.innerHTML)}
                onKeyDown={(event) => {
                  if (event.ctrlKey && event.key === "s") {
                    event.preventDefault();
                    // your custom save logic goes here
                  }
                }}
              ></div>
              <div className="page" style={{ display: ready && book.pages[pageNumber].pageType === "index page" ? "inline-block" : "none" }}>
                <table>
                  {
                    Array.from(html).map((obj, index) => {
                      const { first, second } = obj
                      return <>
                        {
                          index < 1 ? <>
                            <thead>
                              <tr>
                                <th><input className='urdu' value={first} onChange={(e)=> setHtml((y)=>{
                                  y = [...html];
                                  y[index].first = e.target.value;
                                  return y
                                })}/></th>
                                <th><input className='urdu' value={second} onChange={(e)=> setHtml((y)=>{
                                  y = [...html];
                                  y[index].second = e.target.value;
                                  return y
                                })}/></th>
                              </tr>
                            </thead>
                          </> : <>
                            <tbody>
                              <tr>
                                <td><input className='urdu' value={first} onChange={(e)=> setHtml((y)=>{
                                  y = [...html];
                                  y[index].first = e.target.value;
                                  return y
                                })}/></td>
                                <td><input className='center urdu' value={second} onChange={(e)=> setHtml((y)=>{
                                  y = [...html];
                                  y[index].second = e.target.value;
                                  return y
                                })}/></td>
                              </tr>
                              {/* this span use to delete row */}
                              <span
                              onClick={()=> setHtml((y)=>{
                                // this function remove a element and return new array
                                y = [...html];
                                y.splice(index,1)
                                return y;
                              })}
                              >Delete</span> 
                            </tbody>
                          </>
                        }
                      </>
                    })
                  }
                </table>
                <h4
                onClick={()=> setHtml((y)=>{
                  y = [...html];
                  y.push({first: "",second: ""})
                  return y
                })}
                className='add-table-field'
                >Add Row <BsPlusSquare/></h4>
              </div>
              <div id="contextMenu" className="context-menu"
                onBlur={() => hideContextMenu()}
              >
                {
                  options.map((item) => {
                    const { id, value, fontName, text } = item
                    return <>
                      <button
                        id={id}
                        className="urdu-marker style" onClick={() => {
                          wrapText(fontName)
                          setEditableDivChange((y) => y = y + 1)
                        }
                        }
                      >
                        {value}
                        <div className={`demo urdu-marker`}>
                          {text}
                        </div>
                      </button>
                    </>
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </> : <><h4>error</h4><p>you are not allowed to access this page</p></>
    )

  } else return <PreLoader />
}

export default Editor