import React from 'react'
import { useForm } from 'react-hook-form';

export default function RegisterationCompanyInfo({formRef,setActiveStep}) {

  let {register,handleSubmit,formState:{errors}}=useForm();

  const onSubmit=async (data)=>{
    console.log(data);
    alert("done RegisterationCompanyInfo")
    setActiveStep(4)  
}
 
  return (
   <>
      <div className="container">
    <p className='RegisterationTypep'>Company information, Tell Us about your company</p>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='w-75 m-auto'>
          <div className='d-flex align-items-center justify-content-between'>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleInputCompanyName" className="form-label">Company Name *</label>
              <input required type="text" placeholder='Company Name' className="form-control py-3" id="exampleInputCompanyName" aria-describedby="emailHelp"
                {...register("Company Name", {
                  required: "Company Name is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Full Name'
                  // }
                })}
              />
            </div>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleInputCompanyNameinArabicAddress" className="form-label">Company Name in Arabic *</label>
              <input required type="text" placeholder='Company Name in Arabic' className="form-control py-3" id="exampleInputCompanyNameinArabicAddress"
                {...register("CompanyNameArabic", {
                  required: "Company Name Arabic is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
              />
            </div>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleLocation" className="form-label">Location *</label>
              <input required type="text" placeholder='Location' className="form-control py-3" id="exampleLocation" aria-describedby="emailHelp"
                {...register("exampleLocation", {
                  required: "exampleLocation is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
              />
            </div>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleInputWhatsApp" className="form-label">Whats App</label>
              <input  type="number" placeholder='WhatsApp Number' className="form-control py-3" id="exampleInputWhatsApp"
                {...register("WhatsAppNumber", {
                  // required: "ConfirmPassword is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
              />
            </div>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleSelect" className="form-label">Company size</label>
              <select required  id="exampleSelect" className="form-select py-3">
                <option value="" disabled selected>Select</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleWebsite" className="form-label">Website</label>
              <input  type="text" placeholder='Website' className="form-control py-3" id="exampleWebsite"
                {...register("Website", {
                  // required: "Website is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
              />
            </div>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleLandLineNumber" className="form-label">Land Line Number</label>
              <input required type="number" placeholder='Land Line Number' className="form-control py-3" id="exampleLandLineNumber"
                {...register("LandLineNumber", {
                  required: "LandLineNumber is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
              />
            </div>
          </div>




        </form>
             
    </div>
   </>
  )
}
