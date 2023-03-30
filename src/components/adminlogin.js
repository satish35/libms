import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentAuth } from "./StudentAuthProvider";

const Loginpage = () =>{

    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [status,setStatus] = useState('');
    const userset=useStudentAuth();

    const navigate=useNavigate();

    const body= {username,password};

    const handleSubmit= (e) =>{
        e.preventDefault();
        fetch("http://localhost:5000/admin/",{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(body),
        }).then(async (response) =>{
            if(response.ok){
                userset.login(await response.json());
                navigate('/admin');
            }
            else{
                return response.json();
            }
        }).then(data =>{
            setStatus(data);
        }).catch(error =>{
            console.log(error);
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            <label for="username">username</label>
            <input type={Text} id="username" value={username} onChange={(e) =>{setUsername(e.target.value)}}></input>
            <label for="password">password</label>
            <input type={"password"} id="password" value={password} onChange={(e) =>{setPassword(e.target.value)}}></input>
            <span>{status}</span>
            <button type="submit">submit</button>
        </form>
    );
}

export default Loginpage;