import React, { useState } from 'react'
import NotVerified from './accountVerificationComponents/NotVerified'
import Verified from './accountVerificationComponents/Verified'

const AccountVerification = () => {
          const [verified, setVerified] = useState(false)
  return (
    <div>
          {
               !verified ? <NotVerified/> : <Verified/>      
          }
          
    </div>
  )
}

export default AccountVerification