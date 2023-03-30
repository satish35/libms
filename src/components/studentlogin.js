import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentAuth } from "./StudentAuthProvider";

const StudentLogin= () =>{
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');
    const useAuth= useStudentAuth();
    

    const navigate=useNavigate();
    const body={ username, password };

    const handleSubmit= () =>{
        console.log(password);
        fetch('http://localhost:5000/student/',{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body),
        })
        .then(async(response) =>
        {
            if(response.status===200)
            {
                useAuth.login(await response.json());
                navigate('/student');
            }
            else if(response.status===403){
                console.log("password is incorrect");
            }
        })
        .catch(error =>{console.log(error)});
    }


    return(
        <>
            <label for="username">username</label>
            <input type={Text} value={username} onChange={(e) =>{setUsername(e.target.value)}} id="username"></input>
            <div>
                <label for="password">password</label>
                <input type={"password"} value={password} onChange={(e) =>{setPassword(e.target.value)}} id="password"></input>
            </div>
            <button type="submit" onClick={() =>{navigate('/register')}}>create new</button>
            <button type="submit" onClick={handleSubmit}>submit</button>
        </>
    );
}

export default StudentLogin;