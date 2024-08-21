import { createContext, useState } from "react";


export let UserContext=createContext()
export default function UserContextProvider(props){

const [specialities, setspecialities] = useState();







return <UserContext.Provider value={{specialities,setspecialities}} >
             {props.children}
    </UserContext.Provider>
}