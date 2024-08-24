import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axiosInstance from '../../hooks/axiosInstance';


export default function RegisterationCompanyInfo({formRef,setActiveStep,onCompanySelected}) {

  let {register,handleSubmit,formState:{errors}}=useForm();

  const onSubmit=async (data)=>{
    console.log(data);
    alert("done RegisterationCompanyInfo")
    setActiveStep(4)  
}
//////////////////////////////////////////////////

//قائمة الشركات من  API.
const [companyNameSuggestions, setCompanyNameSuggestions] = useState([]);
console.log(companyNameSuggestions);
//النص الذي يدخله المستخدم في حقل البحث.
const [searchKey, setSearchKey] = useState('');
//اسم الشركة المحددة.
const [selectedCompany, setSelectedCompany] = useState('');
// حالة لتتبع ما إذا تم اختيار شركة أم لا.
const [isCompanySelected, setIsCompanySelected] = useState(false);

const getCompanyName= async (searchKey)=>{
  try {
    let response = await axiosInstance.get(`companies-search?search_key=${searchKey}`);
    
    console.log('Data received:', response?.data);
    let data = response?.data.data;
    
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      data = Object.values(data);
    }
    setCompanyNameSuggestions(data || []);

  } catch (error) {
    console.error('Error fetching company names:', error);
  }
}

const debounce = (func, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

//يتم استدعاءها عند تغيير نص حقل الإدخال. تقوم بتحديث searchKey
const handleInputChange = (e) => {
  const value = e.target.value;
  setSearchKey(value);
  if (value.length >= 3) {
    debounceSearch(value);
  } else {
    setCompanyNameSuggestions([]); // Clear suggestions if input is less than 3 characters
    setSelectedCompany(''); // Clear selection
    setIsCompanySelected(false); // Re-enable fields
  }
  
};

// Debounce search with a delay of 300ms
const debounceSearch = debounce((value) => getCompanyName(value), 300);

useEffect(() => {
  if (searchKey.length >= 3) {
    getCompanyName(searchKey);
  }
}, [searchKey]);

 useEffect(() => {
    // Notify MyStepper when the company is selected or cleared
    onCompanySelected(isCompanySelected);
  }, [isCompanySelected, onCompanySelected]);

const filteredCompanies = companyNameSuggestions.filter(company =>
  company?.company_name?.en?.toLowerCase().includes(searchKey.toLowerCase())
);

console.log(filteredCompanies);

////////////////////////////////////////////
// Handle company selection
  const handleCompanySelect = (e) => {
    const selectedValue = e.target.value;
    setSelectedCompany(selectedValue);
    setSearchKey(selectedValue); // Update search key with the selected company name
    setIsCompanySelected(true); // Mark company as selected
    setCompanyNameSuggestions([]);
    onCompanySelected(true); // Update MyStepper when a company is selected
  };

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
                onChange={handleInputChange}
                value={searchKey}
              />
              {/* Show select dropdown if there are suggestions */}
              {filteredCompanies.length > 0 && (
                <select
                  className="form-select mt-2"
                  onChange={handleCompanySelect}
                  value={selectedCompany}
                >
                  <option value="">Select a company...</option>
                  {filteredCompanies.map((company, index) => (
                    <option key={index} value={company.company_name.en}>
                      {company.company_name.en}
                    </option>
                  ))}
                </select>
              )}
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
                disabled={isCompanySelected}
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
                disabled={isCompanySelected}
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
                disabled={isCompanySelected}
              />
            </div>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleSelect" className="form-label">Company size</label>
              <select required  id="exampleSelect" className="form-select py-3" disabled={isCompanySelected}>
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
                disabled={isCompanySelected}
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
                disabled={isCompanySelected}
              />
            </div>
          </div>




        </form>
             
    </div>
   </>
  )
}
