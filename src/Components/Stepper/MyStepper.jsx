import React, { useEffect, useRef } from 'react'
import  { useState } from 'react';
import { Stepper, Step } from 'react-form-stepper';
import RegisterationType from '../Register/RegisterationType';
import RegistrationDropdowns from '../Register/RegistrationDropdowns';
import RegistrationOtp from '../Register/RegistrationOtp';
import RegisterationCompanyInfo from '../Register/RegisterationCompanyInfo';
import Finish from '../Register/Finish';



export default function MyStepper() {

    const [activeStep, setActiveStep] = useState(0);
    const [idHash, setidHash] = useState(null);
    // Disable the "Next" button when returning to the first step
    const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);

    //  مرجع علشان امسك الفورم 
    const formRef = useRef(null);

    const handleNext = () => {
      if (activeStep === 1 && formRef.current) {
          // لإرسال النموذج بشكل برمجي
          formRef.current.requestSubmit();
      }
      else if(activeStep === 2 && formRef.current){
        formRef.current.requestSubmit();
      }
      else if(activeStep === 3 && formRef.current){
        formRef.current.requestSubmit();
      }
      else {
          setActiveStep(prevStep => prevStep + 1);
      }
  };

    const handleBack = () => {
      setActiveStep(prevStep => {
        const newStep = prevStep - 1;
        if (newStep === 0) {
          // Disable the "Next" button when returning to the first step
          setIsNextButtonVisible(false); 
        }
        return newStep;
      });
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
          <RegisterationCompanyInfo formRef={formRef} setActiveStep={setActiveStep} />
          </div>}
          {activeStep === 4 && <div>
            hello
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
          {activeStep === 5 ? "Finish" : "Next"}
        </button>
      </div>
    </div>
    
    </>


    

  )

  
}
