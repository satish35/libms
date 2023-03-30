import { createContext, useContext } from "react";
import { useState } from "react";

const StudentContext= createContext(null);

export const StudentAuth= ({children}) =>{
    const [user , setUser]= useState(null);

    const login = (user) =>{
        setUser(user);
    }

    const logout= () =>{
        setUser('');
    }
    return(
        <StudentContext.Provider value={{user,login,logout}}>
            {children}
        </StudentContext.Provider>
    );
}

export const useStudentAuth = () =>{
    return useContext(StudentContext);
}