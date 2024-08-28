import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';
import { UserContext } from '../../Context/UserContext';
import { useForm } from 'react-hook-form';
import axiosInstance from '../../hooks/axiosInstance';
import { ColorRing } from 'react-loader-spinner';

export default function StepTwoBusiness(formRef,activeTab, onTabChange,setActiveTab ) {
    let {register,handleSubmit,formState:{errors}}=useForm();
    const [error, setError] = useState()
    const [loading, setLoading]=useState(false)
    
    
    let{registrationDropdowns}=useContext(UserContext)
    // console.log(registrationDropdowns.data.data[2]);
    
 
    //////////////////////////////////////////////////////////////////
    
    
      return (
        <>
         

        </>
      )
    }
