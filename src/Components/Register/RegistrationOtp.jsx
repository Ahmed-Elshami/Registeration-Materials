import React, { useState } from 'react'
import OtpInput from 'react-otp-input';
import { useForm } from 'react-hook-form';


export default function RegistrationOtp({formRef,setActiveStep}) {
    const [otp, setOtp] = useState('');

  let {register,handleSubmit,formState:{errors},setValue}=useForm();
  const onSubmit=async (data)=>{
    console.log(data);
    alert("done otp")
    setActiveStep(3)  
}


  return (
    <>
    <p className='RegisterationTypep'>Please insert OTP that Sent to email address to complete your Registration</p>
 
    {/* <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <div className="otp">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span>-</span>}
          renderInput={(props) => <input  required {...props}
          {...register("otp",{
            required:"otp is required",
            // pattern:{
            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            //   message:'Invalid Full Name'
            // }
          })}
           />}
        />
      </div>
      <button type="submit">Submit</button>
    </form> */}


    <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
  <div className="otp">
    <OtpInput
      value={otp}
      onChange={(value) => {
        setOtp(value);
        setValue("otp", value); // تحديث قيمة الحقل في react-hook-form
      }}
      numInputs={6}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input required {...props} />}
    />
  </div>
  {/* <button type="submit">Submit</button> */}
</form>
    
    </>
  )
}
