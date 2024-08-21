import React from 'react'
import img from '../../Image/Group.png'

export default function Finish() {
  return (
    <>
    <p className='RegisterationTypep'>Your Registration is completed</p>
    <div className="container mt-5">
        <div className="caption m-auto text-center ">
            <img src={img} alt='img' />
            <h3 className='finishCaption'>Your Registration is Completed</h3>
            <p className='finishCaption'>Thank you. We will verify your information to activate your account.</p>
            
        </div>
    </div>
    
    </>
  )
}
