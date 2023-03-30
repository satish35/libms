import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Quagga from 'quagga';
import './scanner.css'

const Register= () =>{
    
    const [name,setName]= useState('');
    const [roll_no,setRoll_no]= useState('');
    const [branch,setBranch]= useState('');
    const [div,setDiv]= useState('');
    const [contact_no,setContact_no]= useState('');
    const [email,setEmail]= useState('');
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const [loading,setLoading]=useState(true);

    const body={name,roll_no,branch,div,contact_no,email,username,password}
    const navigate = useNavigate();

    useEffect(() =>{
        Quagga.init({
            inputStream: {
              name: "Live",
              type: "LiveStream",
              constraints: {
                width: '790',
                height: '490'
              },
              numberOfWorkers: navigator.hardwareConcurrency,
              target: document.querySelector('#reader')
            },
            locate: true,
            decoder: {
              readers: ["code_39_reader","code_39_vin_reader"]
            }
          }, function (err) {
            if (err) {
              return 
            }
            Quagga.start()
          })
          Quagga.onDetected((data) =>{
            console.log(data);
            console.log(data.codeResult.code);
            Quagga.stop();
            Quagga.offProcessed();
            const roll_no=data.codeResult.code;
            console.log(roll_no);
            const body={roll_no};
            fetch("http://localhost:5000/student/profile",{
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(body),
            }).then(data =>data.json()
            ).then(jsonData =>{
                setName(jsonData[0].name);
                setRoll_no(jsonData[0].roll_no);
                setBranch(jsonData[0].branch);
                setDiv(jsonData[0].div);
                setContact_no(jsonData[0].contact_no);
                setEmail(jsonData[0].email);
            }).catch(err =>{
                console.error(err.message);
            })
            setLoading(false);
          })
    },[])

    const handleSubmit =(e) =>{
        e.preventDefault();
        fetch("http://localhost:5000/student/register",{
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(body),
        }).then(
            response =>response.json(),
        ).then(data =>{
            console.log(data);
            navigate('/studentlogin');
        }).catch(error =>{
            console.log(error);
        })
    }

    return(
        <form onSubmit={handleSubmit}>
            {
                loading? <div id="reader" width="450px"></div> : null
            }
            <label for="name">name</label>
            <input type={Text} id="name" value={name} onChange={(e) =>{setName(e.target.value)}}></input>
            <label for="roll_no">roll_no</label>
            <input type={Text} id="roll_no" value={roll_no} onChange={(e) =>{setRoll_no(e.target.value)}}></input>
            <label for="branch">branch</label>
            <input type={Text} id="branch" value={branch} onChange={(e) =>{setBranch(e.target.value)}}></input>
            <label for="div">div</label>
            <input type={Text} id="div" value={div} onChange={(e) =>{setDiv(e.target.value)}}></input>
            <label for="contact_no">contact_no</label>
            <input type={Text} id="contact_no" value={contact_no} onChange={(e) =>{setContact_no(e.target.value)}}></input>
            <label for="email">email</label>
            <input type={Text} id="email" value={email} onChange={(e) =>{setEmail(e.target.value)}}></input>
            <label for="username">username</label>
            <input type={Text} id="username" value={username} onChange={(e) =>{setUsername(e.target.value)}}></input>
            <label for="password">password</label>
            <input type={password} id="password" value={password} onChange={(e) =>{setPassword(e.target.value)}}></input>
            <button type="submit">submit</button>
        </form>
    );
}

export default Register;