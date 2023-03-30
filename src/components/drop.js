import { useNavigate } from "react-router-dom";
import { useStudentAuth } from "./StudentAuthProvider";


const Drop = () =>{
    const navigate=useNavigate();
    const username=useStudentAuth();

    return(
        <div>
            <button type="submit" onClick={() =>{
                navigate('/studentprofile');
            }}>profile</button>
            <button type="submit" onClick={() =>{
                username.logout();
                navigate('/')
                }}>logout</button>
        </div>
    );
}

export default Drop;