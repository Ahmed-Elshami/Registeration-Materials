import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { UserContext } from '../../Context/UserContext';
import { ColorRing } from 'react-loader-spinner'
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber, getPhoneNumberType } from 'react-phone-number-input';


export default function RegistrationDropdowns({formRef,setActiveStep}) {
let {specialities}=useContext(UserContext)
const [phoneNumber, setPhoneNumber] = useState('');
const [errorNumber, setErrorNumber] = useState('');

const handlePhoneChange = (value) => {
  setPhoneNumber(value);

  if (value && isValidPhoneNumber(value)) {
    setErrorNumber(''); // No error if the phone number is valid
  } else {
    setErrorNumber('The phone number is invalid for the selected country.');
  }
};

///////////
let {register,handleSubmit,formState:{errors}}=useForm();
const [error, setError] = useState()
const [loading, setLoading]=useState(false)

  const onSubmit=async (data)=>{
    console.log(data);
    
    setLoading(true)
    try {
      let response = await axios.post("https://uat-icons.com/Quote2supply/api/register", data)
      console.log(response);
      
      localStorage.setItem('materialsToken', response.data.data.token);
      setLoading(false)
      toast.success(response?.data?.meta.message);
      console.log(response);
      console.log(response?.data.data.token);
       setError(response?.data)
      setActiveStep(2)
    }
    catch (errors) {
        setError(errors?.response?.data?.meta?.errors)
        setLoading(false)
        toast.error(errors?.response?.data?.meta?.message)
    }
}

/////////
const [Countries,setCountries] = useState([]);
console.log(Countries);

const getCountries= async ()=>{
  try{
      let response=await axios.get(`https://uat-icons.com/Quote2supply/api/countries`)
      setCountries(response.data.data);              
  }catch(error){
      console.log(error);
  }
}

useEffect(()=>{
  getCountries()
},[])
/////////////////////
let{setCountriesUseInInfo}=useContext(UserContext)
const [selectedCountry, setSelectedCountry] = useState('');
  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setCountriesUseInInfo(event.target.value)
  };

  console.log("selectCountry",selectedCountry);
  

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
                        {error?.full_name && <p className='alert text-danger'>{error?.full_name}</p>}
                    </div>

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
                        {error?.email && <p className='alert  text-danger p-0 m-0'>{error?.email}</p>}
                    </div>
                </div>

                <div className='d-flex align-items-center justify-content-between'>
                    {/* <div className="mb-3 w-50 p-3">
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
                        {error?.phone && <p className='alert  text-danger p-0 m-0'>{error?.phone}</p>}
                    </div> */}

        <div className="mb-3 w-50 p-3">
              <label htmlFor="phoneNumberInput" className="form-label">Phone Number *</label>
              <PhoneInput
                international
                countryCallingCodeEditable={false}
                defaultCountry="SA"
                value={phoneNumber}
                onChange={handlePhoneChange}
                className="form-control py-3"
              />
              {errorNumber && <p className='alert text-danger'>{errorNumber}</p>}
              {error?.phone && <p className='alert text-danger p-0 m-0'>{error?.phone}</p>}
            </div>
                    
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
                          <option key={index} value={speciality.id}>
                            {speciality.name} 
                          </option>
                        ))}
                      </select>
                      {error?.speciality_id && <p className='alert  text-danger p-0 m-0'>{error?.speciality_id}</p>}
                    </div>
                </div>

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
                        {error?.password && <p className='alert  text-danger p-0 m-0'>{error?.password}</p>}
                    </div>
                    
                    <div className="mb-3 w-50 p-3">
                        <label htmlFor="exampleInputConfirmPassword" className="form-label">Confirm Password *</label>
                        <input required type="password" placeholder='*****' className="form-control py-3" id="exampleInputConfirmPassword"
                           {...register("password_confirmation",{
                            required:"password confirmation is required",
                            // pattern:{
                            //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            //   message:'Invalid Mail'
                            // }
                          })}
                        />
                        {error?.password_confirmation && <p className='alert  text-danger p-0 m-0'>{error?.password_confirmation}</p>}
                    </div>
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
                        <option key={index} value={Countrie.id} >
                          {Countrie.name}
                        </option>
                      ))}
                    </select>
                    {error?.country_id && <p className='alert  text-danger p-0 m-0'>{error?.country_id}</p>}
                  </div>
                  
                  <div className="mb-3 w-50 p-3">
                    {selectedCountry ==='1' && (
                      <>
                        {Countries[0].cities && Countries[0].cities.length > 0 ? (
                          <>
                            <label htmlFor="cities" className="form-label">Personal City</label>
                            <select required id="cities" className="form-select py-3"
                            {...register("city_id", { required: "city  is required" } 
              
                            )}
                            defaultValue=""
                            >
                              <option value="" disabled>Select</option>
                              {Countries[0].cities.map((city, index) => (
                                <>
                                  <option key={index} value={city.id} >
                                    {city.name}
                                  </option>
                                </>

                              ))}
                            </select>
                          </>
                        ) : ""}
                      </>
                    )}
                      {selectedCountry ==='2' && (
                      <>
                        {Countries[1].cities && Countries[1].cities.length > 0 ? (
                          <>
                            <label htmlFor="cities" className="form-label">Personal City</label>
                            <select id="cities" className="form-select py-3"
                            {...register("city_id", {
              
                            })}
                            >
                              {Countries[1].cities.map((city, index) => (
                                <>
                                  <option key={index} value={city.id} >
                                    {city.name}
                                  </option>
                                </>

                              ))}
                            </select>
                          </>
                        ) : ""}
                      </>
                    )}
                         {selectedCountry ==='3' && (
                      <>
                        {Countries[2].cities && Countries[2].cities.length > 0 ? (
                          <>
                            <label htmlFor="cities" className="form-label">Personal City</label>
                            <select id="cities" className="form-select py-3"
                            {...register("city_id", {
              
                            })}
                            >
                              {Countries[2].cities.map((city, index) => (
                                <>
                                  <option key={index} value={city.id} >
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

                <div className="mb-3 form-check d-flex align-items-center justify-content-center">
                      <input required type="checkbox" className="form-check-input" id="exampleCheck1" />
                      <label className="form-check-label  ms-2" htmlFor="exampleCheck1">I agree to the <a>terms</a> of services and <a>privacy policy</a> </label>
                </div>
              </form>

              {loading== true? 
              <div className='m-auto text-center loading'>
                <ColorRing
                className="text-center m-auto"
                visible={true}
                height="100"
                width="180"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                />
              </div>
              : ''}
    </div>
    </>
  )
}
