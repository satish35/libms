import { useNavigate } from "react-router-dom";
import { useStudentAuth } from "./StudentAuthProvider";

const NavAdmin= () =>{
    const navigate= useNavigate();
    const username= useStudentAuth();
    return(
        <>
            <button type="submit" onClick={() =>{
                username.logout();
                navigate('/')
                }}>{username.user}</button>
            <div>
            <button type="submit" onClick={() =>{navigate('/admin')}}>add</button>
            <button type="submit" onClick={() =>{navigate('/admin/status')}}>status</button>
            <button type="submit" onClick={() =>{navigate('/admin/status')}}>update</button>
            <button type="submit" onClick={() =>{navigate('/admin/suggestion')}}>suggestion</button>
            </div>
        </>
    );
}

export default NavAdmin;