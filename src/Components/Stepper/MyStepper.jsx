import React, { useEffect, useRef } from 'react'
import  { useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import RegisterationType from '../Register/RegisterationType';
import RegistrationDropdowns from '../Register/RegistrationDropdowns';
import RegistrationOtp from '../Register/RegistrationOtp';
import RegisterationCompanyInfo from '../Register/RegisterationCompanyInfo';
import Finish from '../Register/Finish';
import BusinessInfo from '../Register/BusinessInfo';



export default function MyStepper() {

    const [activeStep, setActiveStep] = useState(0);
    const [idHash, setidHash] = useState(null);
    // Disable the "Next" button when returning to the first step
    const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('home');
    const [isCompanySelected, setIsCompanySelected] = useState(false);

    //  مرجع علشان امسك الفورم 
    const formRef = useRef(null);

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
          // Call API to join the selected company
          // await axiosInstance.post('/join-company', { companyName: selectedCompany });
          alert('Successfully joined the company!');
          // setActiveStep(prevStep => prevStep + 1); // Move to the next step after successful API call
        } catch (error) {
          console.error('Error joining company:', error);
        }
      } else {
        if (formRef.current) {
          formRef.current.requestSubmit(); // Proceed with the registration of a new company
        }
      }
    } else if (activeStep === 4) {
      switch (activeTab) {
        case 'home':
          setActiveTab('profile');
          break;
        case 'profile':
          setActiveTab('contact');
          break;
        case 'contact':
          setActiveStep(prevStep => prevStep + 1);
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
          <RegisterationCompanyInfo formRef={formRef} setActiveStep={setActiveStep} onCompanySelected={handleCompanySelected}  />
          </div>}
          {activeStep === 4 && <div>
            <BusinessInfo activeTab={activeTab}  />
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
