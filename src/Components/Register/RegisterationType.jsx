import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import image1 from "../../Image/Vector.png"
import { UserContext } from '../../Context/UserContext';


export default function RegisterationType({ onOptionSelect }) {

    const [RegisterationType, setRegisterationType] = useState([]);
    // ID In url path
    const [IdRegisterationType, SetIdRegisterationType] = useState([]);
    const { setspecialities } = useContext(UserContext);
    
    const getRegisterationType= async ()=>{
        try{
            let response=await axios.get(`https://uat-icons.com/Quote2supply/api/registration-types`)
            setRegisterationType(response.data.data);            
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getRegisterationType()
    },[])

    const handleImageClick = (data) => {
        SetIdRegisterationType(data.id);
        onOptionSelect()
        setspecialities(data?.specialities);
        
        // window.location.hash = `#${Id}`;
    }
    
  return (
    <>
        <div className='container  '>
            <p className='RegisterationTypep'>What brings you here today? Please select one of the following options</p>
              <div className="item d-flex align-items-center justify-content-center">
                  {RegisterationType.map((data, index) => (
                      <div className='RegisterationTypeImage' key={index}>
                          <input type="radio" id={`image-${index}`} name="images" hidden />
                          <div onClick={() => handleImageClick(data)} className='collcetion'>
                              <label htmlFor={`image-${index}`}>
                                  <img src={data.background_path} alt={data.name} />
                              </label>
                                <div className="markTrue">
                                    {IdRegisterationType === data.id && (
                                        <div className="layermark">
                                            <div className="checkmark-overlay">
                                                <img src={image1} alt='img' />
                                            </div>
                                            <div className="title-overlay">
                                                <div className="">{data.description}</div>
                                            </div>

                                        </div>
                                    )}
                                </div>
                              <div className="layer">{data.description}</div>
                          </div>
                      </div>
                  ))}
              </div>
        </div>
    </>
  )
}
