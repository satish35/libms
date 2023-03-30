import { useEffect, useState } from "react";
import { useStudentAuth } from "./StudentAuthProvider";

const Profile = () =>{

    const username= useStudentAuth();
    const roll_no=username.user;
    const body1={roll_no};

    const [name,setName]= useState('');
    const [roll,setRoll_no]= useState('');
    const [branch,setBranch]= useState('');
    const [div,setDiv]= useState('');
    const [contact_no,setContact_no]= useState('');
    const [email,setEmail]= useState('');

    const body2={name,roll_no,branch,div,contact_no,email};
    const [read,setRead]=useState("readonly");
    const [loading,setLoading]=useState(true);

    useEffect(() =>{
        const call = async() =>{
            const result= await fetch("http://localhost:5000/student/profile",{
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(body1),
            })
            const jsonData= await result.json();
            console.log(jsonData);
            setName(jsonData[0].name);
            setRoll_no(jsonData[0].roll_no);
            setBranch(jsonData[0].branch);
            setDiv(jsonData[0].div);
            setContact_no(jsonData[0].contact_no);
            setEmail(jsonData[0].email);
            setLoading(false);
        }

        call();
    },[])

    const handleSubmit= async (e) =>{
        e.preventDefault();
        const response= await fetch("http://localhost:5000/student/update",{
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(body2),
        })
        const jsonData= await response.json();
        alert(jsonData);
    }


    return(
        loading ? <h2>loading</h2> :
            <>
                <button type="submit" onClick={() =>{
                    setRead("");
                }}>Edit profile</button>
                <label for="name">name</label>
                <input type={Text} id="name" value={name} onChange={(e) =>{setName(e.target.value)}} readOnly={read}></input>
                <label for="roll">roll_no</label>
                <input type={Text} id="roll" value={roll} onChange={(e) =>{setRoll_no(e.target.value)}} readOnly={"readonly"}></input>
                <label for="branch">branch</label>
                <input type={Text} id="branch" value={branch} onChange={(e) =>{setBranch(e.target.value)}} readOnly={read}></input>
                <label for="div">div</label>
                <input type={Text} id="div" value={div} onChange={(e) =>{setDiv(e.target.value)}} readOnly={read}></input>
                <label for="contact_no">contact_no</label>
                <input type={Text} id="contact_no" value={contact_no} onChange={(e) =>{setContact_no(e.target.value)}} readOnly={read}></input>
                <label for="email">email</label>
                <input type={Text} id="email" value={email} onChange={(e) =>{setEmail(e.target.value)}} readOnly={read}></input>
                <button type="submit" onClick={handleSubmit}>submit</button>
            </>
    );
}

export default Profile;