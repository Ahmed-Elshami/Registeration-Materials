import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function BusinessInfo({activeTab, onTabChange }) {

  let {register,handleSubmit,formState:{errors}}=useForm();
const [error, setError] = useState()
const [loading, setLoading]=useState(false)

  const onSubmit=async (data)=>{
    setLoading(true)
    try {
      // let response = await axios.post("https://uat-icons.com/Quote2supply/api/register", data)
      // localStorage.setItem('materialsToken', response.data.data.token);
      // setLoading(false)
      // toast.success(response?.data?.meta.message);
      // console.log(response);
      // console.log(response?.data.data.token);
      //  setError(response?.data)
      // setActiveStep(2)
    }
    catch (errors) {
        // setError(errors?.response?.data?.meta?.errors)
        // setLoading(false)
        // toast.error(errors?.response?.data?.meta?.message)
    }
}
  return (
    <>
     <div>
      <div className="tab-content" id="myTabContent">
        <div className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
          <p className='RegisterationTypep'>Please insert OTP that Sent to email address to complete your Registration</p>
          <form  onSubmit={handleSubmit(onSubmit)}  className='w-75 m-auto'>
          <div className='d-flex align-items-center justify-content-between'>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleSelect1" className="form-label">Classification</label>
              <select required  id="exampleSelect1" className="form-select py-3">
                <option value="" disabled selected>Select</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleSelect2" className="form-label">Approved by</label>
              <select required  id="exampleSelect2" className="form-select py-3">
                <option value="" disabled selected>Select</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>

          </div>
          </form>
        </div>

        <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
          Step 2
        </div>
        <div className={`tab-pane fade ${activeTab === 'contact' ? 'show active' : ''}`} id="contact" role="tabpanel" aria-labelledby="contact-tab">
          Step 3
        </div>
      </div>
    </div>

      
    
    
    </>
  )
}
