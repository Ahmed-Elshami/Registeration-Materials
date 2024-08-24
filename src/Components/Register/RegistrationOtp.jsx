import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../hooks/axiosInstance';
import { ColorRing } from 'react-loader-spinner'
import toast from 'react-hot-toast';



export default function RegistrationOtp({formRef,setActiveStep}) {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState()
    const [loading, setLoading]=useState(false)

  let {register,handleSubmit,formState:{errors},setValue}=useForm();
  const onSubmit=async (data)=>{
    setLoading(true)
    try {
      let response = await axiosInstance.post(`verify-otp`, data)
      setLoading(false)
      console.log(response);
      toast.success(response?.data?.meta?.message);
      setActiveStep(3) 
    }
    catch (errors) {
        setError(errors?.response?.data?.meta?.message)
        setLoading(false)
        toast.error(errors?.response?.data?.meta?.message)
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

        </div>
            {error && <p className='w-50 m-auto text-center alert text-danger mt-2'>{error}</p>}

      </form>
          {loading== true? 
          <div className='m-auto text-center'>
            <ColorRing
            className="text-center m-auto"
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
            />
          </div>
          : ''}

    </>
  )
}

