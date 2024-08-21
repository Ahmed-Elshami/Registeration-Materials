import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useForm } from 'react-hook-form';
import axios from 'axios';


export default function RegistrationOtp({formRef,setActiveStep}) {
    const [otp, setOtp] = useState('');

  let {register,handleSubmit,formState:{errors},setValue}=useForm();
  const onSubmit=async (data)=>{
   

    try {
      // let response = await axios.post("https://uat-icons.com/Quote2supply/api/verify-otp", data)
      // console.log(response);
      // alert("done otp")
      // setActiveStep(3) 
      console.log(data)
    }
    catch (errors) {
        alert("eror")
    }
}


  return (
    <>
    <p className='RegisterationTypep'>Please insert OTP that Sent to email address to complete your Registration</p>
 
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <div className="otp">
          <OtpInput
            value={otp}
            onChange={(value) => {
              setOtp(value);
              setValue("otp", value); 
            }}
            numInputs={6}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input required {...props}
             />}
          />
          {errors?.full_name && <p className='alert alert-danger mt-2'>{errors?.full_name}</p>}
        </div>
      </form>
    
    </>
  )
}

