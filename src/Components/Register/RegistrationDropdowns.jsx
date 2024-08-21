import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Context/UserContext';



export default function RegistrationDropdowns({formRef,setActiveStep}) {

let {specialities}=useContext(UserContext)
///////////
let {register,handleSubmit,formState:{errors}}=useForm();
  const onSubmit=async (data)=>{
    console.log(data);
    alert("done RegistrationDropdowns")
    setActiveStep(2)  
}

/////////
const [Countries,setCountries] = useState([]);
const getCountries= async ()=>{
  try{
      let response=await axios.get(`https://uat-icons.com/Quote2supply/api/countries`)
      setCountries(response.data.data);                  
  }catch(error){
      console.log(error);
  }
}
console.log(Countries);

useEffect(()=>{
  getCountries()
},[])
/////////////////////
const [selectedCountry, setSelectedCountry] = useState('');
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
  };

  return (
    <>
    <div className="container">
    <p className='RegisterationTypep'>Personal information, Tell us about yourself</p>

              <form ref={formRef} onSubmit={handleSubmit(onSubmit)}  className='w-75 m-auto'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className="mb-3 w-50 p-3">
                        <label htmlFor="exampleInputFull Name" className="form-label">Full Name *</label>
                        <input required type="text" placeholder='full name' className="form-control py-3" id="exampleInputFull Name" aria-describedby="emailHelp"
                             {...register("full_name",{
                                required:"full_name is required",
                                // pattern:{
                                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                //   message:'Invalid Full Name'
                                // }
                              })}
                         />
                    </div>
                    {errors.full_name && <p className='alert alert-danger'>{errors.full_name.message}</p> }

                    <div className="mb-3 w-50 p-3">
                        <label htmlFor="exampleInputEmailAddress" className="form-label">Email Address *</label>
                        <input required type="email" placeholder='Business Email if Available' className="form-control py-3" id="exampleInputEmailAddress" 
                           {...register("email",{
                            required:"Email is required",
                            // pattern:{
                            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //   message:'Invalid Mail'
                            // }
                          })}
                        />
                    </div>
                    {errors.email && <p className='alert alert-danger'>{errors.email.message}</p> }
                </div>

                <div className='d-flex align-items-center justify-content-between'>
                    <div className="mb-3 w-50 p-3">
                        <label htmlFor="exampleInputPhoneNumber" className="form-label">Phone Number *</label>
                        <div className="d-flex">
                            <select className="form-select w-auto" id="countryCode">
                                <option value="+966">+966 (SA)</option>
                                <option value="+1">+1 (US)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+20">+20 (EG)</option>
                            </select>
                            <input required type="tel" placeholder='Enter your phone number' className="form-control py-3 ms-2" id="exampleInputPhoneNumber"
                               {...register("phone",{
                                required:"phone is required",
                                // pattern:{
                                //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                //   message:'Invalid Mail'
                                // }
                              })}
                            />
                        </div>
                    </div>
                    {errors.phone && <p className='alert alert-danger'>{errors.phone.message}</p> }

                    
                    <div className="mb-3 w-50 p-3">
                      <label htmlFor="exampleSelect" className="form-label">
                        What would you like to register as (Speciality)
                      </label>
                      <select required id="exampleSelect" className="form-select py-3"
                       {...register("speciality_id",{
                        required:"The speciality id is required",
                        // pattern:{
                        //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        //   message:'Invalid Mail'
                        // }
                      })}
                      >
                        <option value="" disabled selected>Select</option>
                        {specialities && specialities.map((speciality, index) => (
                          <option key={index} value={speciality.user_type}>
                            {speciality.name} 
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.speciality_id && <p className='alert alert-danger'>{errors.speciality_id.message}</p> }

                </div>

                    {/* Country and city  */}
                <div className='d-flex align-items-center justify-content-between'>

                  <div className="mb-3 w-50 p-3">
                    <label htmlFor="Countries" className="form-label">
                      Countries *
                    </label>
                    <select required id="Countries" className="form-select py-3"
                      {...register("country_id", {
                        required: "country id is required",
                        // pattern:{
                        //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        //   message:'Invalid Mail'
                        // }
                      })}
                      onChange={handleCountryChange}
                    >
                      <option value="" disabled selected>Select</option>
                      {Countries && Countries.map((Countrie, index) => (
                        <option key={index} >
                          {Countrie.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.country_id && <p className='alert alert-danger'>{errors.country_id.message}</p>}
                  <div className="mb-3 w-50 p-3">
                    {selectedCountry ==='Saudi Arabia' && (
                      <>
                        {Countries[0].cities && Countries[0].cities.length > 0 ? (
                          <>
                            <label htmlFor="cities" className="form-label">Personal City</label>
                            <select id="cities" className="form-select py-3">
                              {Countries[0].cities.map((city, index) => (
                                <>
                                  <option key={index} >
                                    {city.name}
                                  </option>
                                </>

                              ))}
                            </select>
                          </>
                        ) : ""}
                      </>
                    )}
                      {selectedCountry ==='Egypt' && (
                      <>
                        {Countries[1].cities && Countries[1].cities.length > 0 ? (
                          <>
                            <label htmlFor="cities" className="form-label">Personal City</label>
                            <select id="cities" className="form-select py-3">
                              {Countries[1].cities.map((city, index) => (
                                <>
                                  <option key={index} >
                                    {city.name}
                                  </option>
                                </>

                              ))}
                            </select>
                          </>
                        ) : ""}
                      </>
                    )}
                         {selectedCountry ==='Qatar' && (
                      <>
                        {Countries[2].cities && Countries[2].cities.length > 0 ? (
                          <>
                            <label htmlFor="cities" className="form-label">Personal City</label>
                            <select id="cities" className="form-select py-3">
                              {Countries[2].cities.map((city, index) => (
                                <>
                                  <option key={index} >
                                    {city.name}
                                  </option>
                                </>

                              ))}
                            </select>
                          </>
                        ) : ""}
                      </>
                    )}
                  </div>
                </div>

                {/* end */}

                <div className='d-flex align-items-center justify-content-between'>
                    <div className="mb-3 w-50 p-3">
                        <label htmlFor="exampleInputPassword" className="form-label">Password *</label>
                        <input required type="password" placeholder='*****' className="form-control py-3" id="exampleInputPassword" aria-describedby="emailHelp"
                           {...register("password",{
                            required:"password is required",
                            // pattern:{
                            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //   message:'Invalid Mail'
                            // }
                          })}
                        />
                    </div>
                    {errors.password && <p className='alert alert-danger'>{errors.password.message}</p> }

                    <div className="mb-3 w-50 p-3">
                        <label htmlFor="exampleInputConfirmPassword" className="form-label">Confirm Password *</label>
                        <input required type="password" placeholder='*****' className="form-control py-3" id="exampleInputConfirmPassword"
                           {...register("ConfirmPassword",{
                            required:"ConfirmPassword is required",
                            // pattern:{
                            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //   message:'Invalid Mail'
                            // }
                          })}
                        />
                    </div>
                </div>

            
                <div className="mb-3 form-check d-flex align-items-center justify-content-center">
                      <input required type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label  ms-2" htmlFor="exampleCheck1">I agree to the <a>terms</a> of services and <a>privacy policy</a> </label>
                </div>
                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
              </form>
    </div>
    
    </>
  )
}
