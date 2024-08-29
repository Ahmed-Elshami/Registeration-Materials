import React, { useEffect, useRef } from 'react'
import  { useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import RegisterationType from '../Register/RegisterationType';
import RegistrationDropdowns from '../Register/RegistrationDropdowns';
import RegistrationOtp from '../Register/RegistrationOtp';
import RegisterationCompanyInfo from '../Register/RegisterationCompanyInfo';
import Finish from '../Register/Finish';
import BusinessInfo from '../Register/BusinessInfo';
import axiosInstance from '../../hooks/axiosInstance';
import toast from 'react-hot-toast';
import StepTwoBusiness from '../Register/StepTwoBusiness';



export default function MyStepper() {

    const [activeStep, setActiveStep] = useState(0);
    const [idHash, setidHash] = useState(null);
    // Disable the "Next" button when returning to the first step
    const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [isCompanySelected, setIsCompanySelected] = useState(false);
    const [selectedCompanyId, setSelectedCompanyId] = useState(''); //  company_id 

console.log(selectedCompanyId);

    //  مرجع علشان امسك الفورم 
    const formRef = useRef(null);
    const formRef2 = useRef(null);
    const formRef3 = useRef(null);


  //   const handleNext = () => {
  //     if (activeStep === 4) {
  //       switch (activeTab) {
  //         case 'home':
  //           setActiveTab('profile');
  //           break;
  //         case 'profile':
  //           setActiveTab('contact');
  //           break;
  //         case 'contact':
  //           setActiveStep(prevStep => prevStep + 1);
  //           break;
  //           default:
  //           break;
  //       }
  //     } else if (activeStep === 1 && formRef.current) {
  //       formRef.current.requestSubmit();
  //     } else if (activeStep === 2 && formRef.current) {
  //       formRef.current.requestSubmit();
  //     } else if (activeStep === 3 && formRef.current) {
  //       formRef.current.requestSubmit();
  //     } else {
  //       setActiveStep(prevStep => prevStep + 1);
  //     }
  // };
  const handleNext = async () => {
    if (activeStep === 3) {
      if (isCompanySelected) {
        try {
          let response= await axiosInstance.post('/join-company', { company_id: selectedCompanyId });
          toast.success(response.data.meta.message);
          setActiveStep(5); 
        } catch (error) {
          toast.error(error?.response?.data?.meta?.message)
        }
      } else {
        if (formRef.current) {
          formRef.current.requestSubmit(); // Proceed with the registration of a new company
        }
      }
    }  else if (activeStep === 4) {
      if (formRef.current) {
        if (!formRef.current.checkValidity()) {
          formRef.current.reportValidity();
          return;
        }
      }else if (formRef2.current){
        if (!formRef2.current.checkValidity()) {
          formRef2.current.reportValidity();
          return;
        }
      }else if (formRef3.current){
        if (!formRef3.current.checkValidity()) {
          formRef3.current.reportValidity();
          return;
        }
      }
  
      switch (activeTab) {
        case 'home':
          formRef.current.requestSubmit();
          // setActiveTab('profile');
          break;
        case 'profile':
          formRef2.current.requestSubmit();
          // setActiveTab('contact');
          break;
        case 'contact':
          // Move to the next step after validation
          formRef3.current.requestSubmit();
          // setActiveStep(prevStep => prevStep + 1);
          break;
        default:
          break;
      }
    } else if (activeStep === 1 && formRef.current) {
      formRef.current.requestSubmit();
    } else if (activeStep === 2 && formRef.current) {
      formRef.current.requestSubmit();
    } else {
      setActiveStep(prevStep => prevStep + 1);
    }
  };
  
    const handleBack = () => {
      // setActiveStep(prevStep => {
      //   const newStep = prevStep - 1;
      //   if (newStep === 0) {
      //     // Disable the "Next" button when returning to the first step
      //     setIsNextButtonVisible(false); 
      //   }
      //   return newStep;
      // });
      if (activeStep === 4) {
        switch (activeTab) {
          case 'contact':
            setActiveTab('profile');
            break;
          case 'profile':
            setActiveTab('home');
            break;
          case 'home':
            setActiveStep(prevStep => prevStep - 1);
            break;
          default:
            break;
        }
      } else {
        setActiveStep(prevStep => {
          const newStep = prevStep - 1;
          if (newStep === 0) {
            setIsNextButtonVisible(false);
          }
          return newStep;
        });
      }
    };

    const handleCompanySelected = (isSelected) => {
      setIsCompanySelected(isSelected);
    };
    const handleCompanyIdSelected = (id) => {
      setSelectedCompanyId(id);
    };
    // get id url path
    useEffect(() => {
      const hash = window.location.hash.substring(1);
      setidHash(hash);
    }, []);
    
  return (
    <>
    <div className='mystepper'>
      <Stepper className='w-75 m-auto' activeStep={activeStep}>
        <Step label= "Speciality" />
        <Step label= "Personal Info"/>
        <Step label="OTP" />
        <Step label="Company Info" />
        <Step label="Business Info" />
        <Step label="Finish" />

      </Stepper>
      <div>
        {activeStep === 0 && 
        <div>
          <RegisterationType onOptionSelect={() => setIsNextButtonVisible(true)}/>
        </div>}

        {activeStep === 1 && <div>
          <RegistrationDropdowns formRef={formRef} setActiveStep={setActiveStep} />
        </div>}
        {activeStep === 2 && <div>
          <RegistrationOtp formRef={formRef} setActiveStep={setActiveStep} />
          </div>}
          {activeStep === 3 && <div>
          <RegisterationCompanyInfo formRef={formRef} setActiveStep={setActiveStep} onCompanySelected={handleCompanySelected} onCompanyIdSelected={handleCompanyIdSelected}  />
          </div>}
          {activeStep === 4 && <div>
            <BusinessInfo formRef3={formRef3} formRef={formRef} formRef2={formRef2} setActiveStep={setActiveStep} setActiveTab={setActiveTab} activeTab={activeTab}  />
          </div>}
          {activeStep === 5 && <div>
          <Finish/>
          </div>}
      </div>

      <div className='text-center mt-5'>
        <button className='btn button1 m-2'
        //  disabled={activeStep === 0}
          onClick={handleBack}
          style={{ display: activeStep === 0 || activeStep === 5 ? 'none' : 'inline-block' }}
          >
          Back
        </button>

        <button
          className='btn button2 m-2'
          disabled={activeStep === 5 || !isNextButtonVisible}
          onClick={handleNext}
        >
            {activeStep === 5 ? "Finish" : activeStep === 3 && isCompanySelected ? "Join" : "Next"}
            </button>
      </div>
    </div>
    
    </>


    

  )

  
}
