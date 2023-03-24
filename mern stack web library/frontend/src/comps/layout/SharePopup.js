import { FacebookShareButton, TwitterShareButton } from 'react-share';
import {AiFillTwitterCircle,AiOutlineWhatsApp} from 'react-icons/ai'
import {BsFacebook} from 'react-icons/bs'

import React, { useState } from 'react'
import { FaShareAlt } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai'
const SharePopup = ({ url }) => {
  const [sharePopupDisplay, setSharePopupDisplay] = useState(false),
  [clicked,setClicked] = useState(false);
  return (
    <div className="share-container">
      <span className='inline-center' onClick={() => setSharePopupDisplay(true)}>
        <FaShareAlt />
      </span>
      <div className={sharePopupDisplay ? 'share-bc' : 'share-bc hide'}>
        <div className="share-popup">
          <div className="top">
            <h4>Share</h4>
            <h4 className='close' onClick={() => setSharePopupDisplay(false)}><AiOutlineCloseCircle /></h4>
          </div>
          <div className="share-button-container">
              <div className="share-button">
              <button onClick={()=>{
                var whatsapp_url = "https://api.whatsapp.com/send/?text=" + encodeURIComponent(url) + "&type=custom_url";

                window.open(whatsapp_url, '_blank')
              }}>
                <AiOutlineWhatsApp/>
                <span>whatsapp</span>
              </button>
              </div>
              <div className="share-button">
                <FacebookShareButton url={url} >
                  <BsFacebook/>
                  <span>facebook</span>
                </FacebookShareButton>
              </div>
              <div className="share-button">
                <TwitterShareButton url={url}>
                  <AiFillTwitterCircle/>
                  <span>twitter</span>
                </TwitterShareButton>
              </div>
              
          </div>
          <h5>Link:</h5>
              <div className="link-container">
                <p>{url}</p>
                <button className="copy" onClick={()=>{
                 navigator.clipboard.writeText(url)
                 .then(() => {
                  setClicked(true)
                 })
                 .catch((error) => {
                   alert("Failed to copy");
                 }); 
                }}>
                  {clicked ? "Copyed" : "Copy Link"}
                </button>
              </div>
        </div>
      </div>
    </div>
  )
}

export default SharePopup