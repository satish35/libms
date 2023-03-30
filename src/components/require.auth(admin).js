import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentAuth } from "./StudentAuthProvider";

const RequireAuthAdmin= ({children}) =>{
    const username= useStudentAuth();
    const navigate= useNavigate();

    useEffect(() =>{
        if(username.user==null)
        {
            navigate('/adminlogin');
        }
    },[])

    return(
        <>
            {children}
        </>
    );

/*    const nav= () =>{
        navigate('/studentlogin');
    }
    cd
    console.log(username.user);
    if(username.user!=null)
    {
        return(
            <>
                {children}
            </>
        );
    }
    else{
        nav();
    }*/
}

export default RequireAuthAdmin;