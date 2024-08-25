import { createContext, useEffect, useState } from "react";
import axiosInstance from "../hooks/axiosInstance";


export let UserContext=createContext()
export default function UserContextProvider(props){

const [specialities, setspecialities] = useState();

const [CountriesUseInInfo,setCountriesUseInInfo] = useState([]);



    const [registrationDropdowns,setregistrationDropdowns] = useState([]);
    const getregistrationDropdowns = async () => {
        try {
            let response = await axiosInstance.get(`registration-dropdowns`)
            setregistrationDropdowns(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getregistrationDropdowns()
    }, [])
// console.log(registrationDropdowns.data.data);



return <UserContext.Provider value={{specialities,setspecialities,registrationDropdowns,setCountriesUseInInfo,CountriesUseInInfo}} >
             {props.children}
    </UserContext.Provider>
}