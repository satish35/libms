import { useNavigate } from "react-router-dom";



const Home=() =>{
    const navigate= useNavigate();
    return(
        <>
            <label for="student">student</label>
            <input type={"radio"} onClick={() =>{navigate('/studentlogin')}} value="student" id="student"></input>
            <label for="admin">admin</label>
            <input type={"radio"} onClick={() =>{navigate('/adminlogin')}} value="admin" id="admin"></input>
        </>
   );
}

export default Home;