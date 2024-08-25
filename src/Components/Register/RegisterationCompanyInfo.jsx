import React, { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import axiosInstance from '../../hooks/axiosInstance';
import { ColorRing } from 'react-loader-spinner'
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';

export default function RegisterationCompanyInfo({formRef,setActiveStep,onCompanySelected,onCompanyIdSelected}) {


let{registrationDropdowns}=useContext(UserContext)
console.log(registrationDropdowns.data.data[0]);


/////////////////////////////////////////////////////////////
  let {register,handleSubmit,formState:{errors}}=useForm();
  const [error, setError] = useState()
  const [loading, setLoading]=useState(false)
  let{CountriesUseInInfo}=useContext(UserContext)

  const onSubmit=async (data)=>{
    const dataToSend = {
      ...data,
      country_id: CountriesUseInInfo,
    };
     console.log(data);
    setLoading(true)
    try {
      let response = await axiosInstance.post("register-business-info", dataToSend)
      setLoading(false)
      toast.success(response?.data?.meta.message);
      console.log(response);
      setActiveStep(4) 
    }
    catch (errors) {
      console.log(errors);
      
        setError(errors?.response?.data?.meta?.errors)
        setLoading(false)
        toast.error(errors?.response?.data?.meta?.message)
    }
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
const [selectedCompanyId, setSelectedCompanyId] = useState(''); // إضافة حالة لتتبع الـ company_id


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
    const company = companyNameSuggestions.find(c => c.company_name.en === selectedValue);
    setSelectedCompany(selectedValue);
    setSelectedCompanyId(company?.id); // حفظ الـ company_id
    setSearchKey(selectedValue); // Update search key with the selected company name
    setIsCompanySelected(true); // Mark company as selected
    setCompanyNameSuggestions([]);
    onCompanySelected(true); // Update MyStepper when a company is selected
    onCompanyIdSelected(company?.id); // إرسال الـ company_id إلى MyStepper

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
                {...register("company_name.en", {
                  required: "Company Name is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Full Name'
                  // }
                })}
                onChange={handleInputChange}
                value={searchKey}
              />
              {error?.company_name?.en&& <p className='alert text-danger'>{error?.company_name?.en}</p>}

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
                {...register("company_name.ar", {
                  required: "Company Name Arabic is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
                disabled={isCompanySelected}
              />
              {error?.company_name?.ar&& <p className='alert text-danger'>{error?.company_name?.ar}</p>}

            </div>
          </div>
   

          <div className='d-flex align-items-center justify-content-between'>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleLocation" className="form-label">Location *</label>
              <input type="text" placeholder='Location' className="form-control py-3" id="exampleLocation" aria-describedby="emailHelp"
                {...register("Location", {
                  //required: "Location is required",
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
                {...register("whatsapp", {
                  // required: "whatsapp is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
                disabled={isCompanySelected}
              />
              {/* {error?.whatsapp && <p className='alert text-danger'>{error?.whatsapp}</p>} */}

            </div>
          </div>

          <div className='d-flex align-items-center justify-content-between'>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleSelect" className="form-label">Company size</label>
              <select
                required
                id="exampleSelect"
                className="form-select py-3"
                disabled={isCompanySelected}
                {...register("company_size_id", { required: "Company size is required" })}
                defaultValue=""
              >
                <option value="" disabled>Select</option>
                {registrationDropdowns.data.data[0].options.map((item, index) => (
                  <option key={index} value={item.id}>{item.title}</option>
                ))}
              </select>
            </div>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="exampleWebsite" className="form-label">Website</label>
              <input  type="text" placeholder='Website' className="form-control py-3" id="exampleWebsite"
                {...register("website", {
                   //required: "Website is required",
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
              <input  type="number" placeholder='Land Line Number' className="form-control py-3" id="exampleLandLineNumber"
                {...register("land_line", {
                  //required: "LandLineNumber is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
                disabled={isCompanySelected}
              />
            </div>
            <div className="mb-3 w-50 p-3">
              <label htmlFor="examplecr_number" className="form-label">cr_number</label>
              <input required  type="number" placeholder='cr_number' className="form-control py-3" id="examplecr_number"
                {...register("cr_number", {
                  required: "cr_number is required",
                  // pattern:{
                  //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  //   message:'Invalid Mail'
                  // }
                })}
                disabled={isCompanySelected}
              />
              {error?.cr_number && <p className='alert text-danger'>{error?.cr_number}</p>}

            </div>
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
