import React from 'react'
import RegisterForm from './notVerifiedConponents/RegisterForm'

const NotVerified = () => {
  return (
    <>
    <div className='flex flex-col gap-5 px-5 md:flex-row items-center justify-between rounded-md md:px-16 py-5 bg-red-400 mb-4'>
          <div className="message text-white">You are currently unverified, which means you are unable to publish any book at the moment.
          
          </div>
          <button
          className=' text-white bg-blue-600 hover:bg-blue-500 py-2 px-6 rounded-md' 
          >Apply Now</button>
          
    </div>
    <div className="form">
    <h3 className=' mt-10 font-bold'>Provide Your Details</h3>
    <RegisterForm/>
    </div>
    
    </>
  )
}

export default NotVerified