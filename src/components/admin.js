import { Outlet } from "react-router-dom";
import NavAdmin from "./navbaradmin";

const Admin= () =>{
    return(
        <>
            <h1>im in admin</h1>
            <NavAdmin/>
            <Outlet/>
        </>
    );
}

export default Admin;