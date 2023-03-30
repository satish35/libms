import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Drop from "./drop";
import { useStudentAuth } from "./StudentAuthProvider";

const NavStudent= () =>{
    const [drop,setDrop]=useState(false);
    const navigate= useNavigate();
    const username= useStudentAuth();
    return(
        <>
            <button type="submit" onClick={() =>{
                setDrop(!drop);
                }}>{username.user}</button>
            {
                drop?<Drop/>:null
            }
            <div>
                <button type="submit" onClick={() =>{navigate('/student')}}>book search</button>
                <button type="submit" onClick={() =>{navigate('/student/order')}}>order</button>
                <button type="submit" onClick={() =>{navigate('/student/status')}}>status</button>
                <button type="submit" onClick={() =>{navigate('/student/suggestion')}}>suggestion</button>
            </div>
        </>
    );
}

export default NavStudent;