import { Outlet } from "react-router-dom";
import NavStudent from "./navbarstudent";


const Student = () =>{
    return(
        <>
            <NavStudent/>
            <Outlet/>
        </>
    );
}

export default Student;