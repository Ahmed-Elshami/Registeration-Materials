import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';
import { useForm } from 'react-hook-form';



export default function BusinessInfo({formRef,activeTab, onTabChange,setActiveTab }) {

  let {register,handleSubmit,formState:{errors}}=useForm();
const [error, setError] = useState()
const [loading, setLoading]=useState(false)

let{registrationDropdowns}=useContext(UserContext)
console.log(registrationDropdowns.data.data[2]);
  const onSubmit=async (data)=>{
    console.log(data);
    setActiveTab('profile')
    // setLoading(true)
    try {
      // let response = await axios.post("https://uat-icons.com/Quote2supply/api/register", data)
      // localStorage.setItem('materialsToken', response.data.data.token);
      // setLoading(false)
      // toast.success(response?.data?.meta.message);
      // console.log(response);
      // console.log(response?.data.data.token);
      //  setError(response?.data)
      // setActiveTab('profile')
    }
    catch (errors) {
        // setError(errors?.response?.data?.meta?.errors)
        // setLoading(false)
        // toast.error(errors?.response?.data?.meta?.message)
    }
}
//////////////////////////////////////////////////////////////////


  return (
    <>
     <div>
      <div className="tab-content" id="myTabContent">
        <div className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
          <p className='RegisterationTypep'>Your business, tell us more about you business</p>
          
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)}  className='w-75 m-auto'>
          <div className='d-flex align-items-center justify-content-between'>
          <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleSelect" className="form-label">Classification</label>
              <select
                required
                id="exampleSelect"
                className="form-select py-3"
                {...register("classification_ids", { required: "Classification is required" })}
                defaultValue=""
              >
                <option value="" disabled>Select</option>
                {registrationDropdowns.data.data[1].options.map((item, index) => (
                  <option key={index} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>

                <div className="mb-3 w-50 p-3">
                  <label htmlFor="approvedBy" className="form-label">Approved by</label>
                  <div className="dropdown">
                    <button
                      className="btn btn-light border form-select py-3 w-100 text-start"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select
                    </button>
                    <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                      {registrationDropdowns.data.data[2].options.map((item, index) => (
                        <li key={index} className="dropdown-item">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id={`approvedBy_${item.id}`}
                              value={item.id}
                              {...register("approved_by_ids")}
                              className="form-check-input"
                            />
                            <label htmlFor={`approvedBy_${item.id}`} className="form-check-label">
                              {item.title}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
                <div className="mb-3 w-50 p-3">
                  <label htmlFor="segment" className="form-label">Segment</label>
                  <div className="dropdown">
                    <button
                      className="btn btn-light border form-select py-3 w-100 text-start"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select
                    </button>
                    <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                      {registrationDropdowns.data.data[3].options.map((item, index) => (
                        <li key={index} className="dropdown-item">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id={`segment_${item.id}`}
                              value={item.id}
                              {...register("segment_ids")}
                              className="form-check-input"
                            />
                            <label htmlFor={`segment_${item.id}`} className="form-check-label">
                              {item.title}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mb-3 w-50 p-3">
                  <label htmlFor="targetProjectSize" className="form-label">Target project size you can do</label>
                  <div className="dropdown">
                    <button
                      className="btn btn-light border form-select py-3 w-100 text-start"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Select
                    </button>
                    <ul className="dropdown-menu w-100" aria-labelledby="dropdownMenuButton">
                      {registrationDropdowns.data.data[4].options.map((item, index) => (
                        <li key={index} className="dropdown-item">
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id={`targetProjectSize_${item.id}`}
                              value={item.id}
                              {...register("target_ids")}
                              className="form-check-input"
                            />
                            <label htmlFor={`targetProjectSize_${item.id}`} className="form-check-label">
                              {item.title}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
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

////////////////////////////////////////////////////////////////////////

// import React, { useContext, useState } from 'react';
// import { useForm, Controller } from 'react-hook-form'; // Ensure correct import
// import Select from 'react-select';
// import toast from 'react-hot-toast';
// import { UserContext } from '../../Context/UserContext';
// import axiosInstance from '../../hooks/axiosInstance';
// import { ColorRing } from 'react-loader-spinner'


// export default function BusinessInfo({ formRef, activeTab, setActiveTab }) {
//   // Destructure control from useForm
//   const { register, handleSubmit, control, formState: { errors } } = useForm(); // Ensure control is included
//   const [error, setError] = useState();
//   const [loading, setLoading] = useState(false);

//   const { registrationDropdowns } = useContext(UserContext);
//   const approvedByOptions = registrationDropdowns.data.data[2].options.map(item => ({
//     value: item.id,
//     label: item.title
//   }));

//   const approvedByOptions2 = registrationDropdowns.data.data[3].options.map(item => ({
//     value: item.id,
//     label: item.title
//   }));
//   const approvedByOptions3 = registrationDropdowns.data.data[4].options.map(item => ({
//     value: item.id,
//     label: item.title
//   }));
  

//   const onSubmit = async (data) => {
//     const dataWithStep = {
//       classification_ids: data.classification_ids, // Directly send the classification ID
//       approved_by_ids: data.approved_by_ids.map(item => item.value), // Extract only the ID
//       segment_ids: data.segment_ids.map(item => item.value), // Extract only the ID
//       target_ids: data.target_ids.map(item => item.value), // Extract only the ID
//       step: '4'
//     };
//     console.log(data);
//     // setActiveTab('profile');
//     try {
//       let response = await axiosInstance.post("compelete-business-info", dataWithStep)
//       setLoading(false)
//       toast.success(response?.data?.meta.message);
//       console.log(response);
//       console.log(response?.data.data.token);
//       //  setError(response?.data)
//     } catch (errors) {
//       toast.error(errors?.response?.data?.meta?.message);
//     }
//   };

//   return (
//     <div>
//       <div className="tab-content" id="myTabContent">
//         <div className={`tab-pane fade ${activeTab === 'home' ? 'show active' : ''}`} id="home" role="tabpanel" aria-labelledby="home-tab">
//           <p className='RegisterationTypep'>Your business, tell us more about your business</p>
//           <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className='w-75 m-auto'>
//             <div className='d-flex align-items-center justify-content-between'>
//               <div className="mb-3 w-50 p-3">
//                 <label htmlFor="exampleSelect" className="form-label">Classification</label>
//                 <select
//                   required
//                   id="exampleSelect"
//                   className="form-select py-2"
//                   {...register("classification_ids", { required: "Classification is required" })}
//                   defaultValue=""
//                 >
//                   <option value="" disabled>Select</option>
//                   {registrationDropdowns.data.data[1].options.map((item, index) => (
//                     <option key={index} value={item.id}>{item.title}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="mb-3 w-50 p-3">
//                 <label htmlFor="approvedBySelect" className="form-label">Approved by</label>
//                 <Controller
//                   name="approved_by_ids" // Field name
//                   control={control} // Pass control here
//                   defaultValue={[]} // Default value for the field
//                   rules={{ required: "Approved by is required" }} // Validation rules
//                   render={({ field }) => (
//                     <Select
//                       {...field} // Spread field props to Select
//                       isMulti
//                       options={approvedByOptions}
//                       className="basic-multi-select"
//                       classNamePrefix="select"
//                       placeholder="Select Approvers"
//                     />
//                   )}
//                 />
//                 {errors.approved_by_ids && <p className="text-danger">{errors.approved_by_ids.message}</p>}
//               </div>
//             </div>


//             <div className='d-flex align-items-center justify-content-between'>
//             <div className="mb-3 w-50 p-3">
//                 <label htmlFor="approvedBySelect" className="form-label">Segment</label>
//                 <Controller
//                   name="segment_ids" // Field name
//                   control={control} // Pass control here
//                   defaultValue={[]} // Default value for the field
//                   rules={{ required: "segment is required" }} // Validation rules
//                   render={({ field }) => (
//                     <Select
//                       {...field} // Spread field props to Select
//                       isMulti
//                       options={approvedByOptions2}
//                       className="basic-multi-select"
//                       classNamePrefix="select"
//                       placeholder="Select Approvers"
//                     />
//                   )}
//                 />
//                 {errors.approved_by_ids && <p className="text-danger">{errors.approved_by_ids.message}</p>}
//               </div>

//               <div className="mb-3 w-50 p-3">
//                 <label htmlFor="approvedBySelect" className="form-label">Target project size you can do</label>
//                 <Controller
//                   name="target_ids" // Field name
//                   control={control} // Pass control here
//                   defaultValue={[]} // Default value for the field
//                   rules={{ required: "segment is required" }} // Validation rules
//                   render={({ field }) => (
//                     <Select
//                       {...field} // Spread field props to Select
//                       isMulti
//                       options={approvedByOptions3}
//                       className="basic-multi-select"
//                       classNamePrefix="select"
//                       placeholder="Select Approvers"
//                     />
//                   )}
//                 />
//                 {errors.approved_by_ids && <p className="text-danger">{errors.approved_by_ids.message}</p>}
//               </div>
//             </div>
//           </form>
//           {loading== true? 
//               <div className='m-auto text-center loading'>
//                 <ColorRing
//                 className="text-center m-auto"
//                 visible={true}
//                 height="100"
//                 width="180"
//                 ariaLabel="color-ring-loading"
//                 wrapperStyle={{}}
//                 wrapperClass="color-ring-wrapper"
//                 colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
//                 />
//               </div>
//               : ''}
//         </div>

//         <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
//           Step 2
//         </div>
//         <div className={`tab-pane fade ${activeTab === 'contact' ? 'show active' : ''}`} id="contact" role="tabpanel" aria-labelledby="contact-tab">
//           Step 3
//         </div>
//       </div>
//     </div>
//   );
// }
