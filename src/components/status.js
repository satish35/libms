import { useEffect, useState } from "react";
import { useStudentAuth } from "./StudentAuthProvider";


const Status= () =>{

    const [data,setData]= useState([]);
    const useAuth=useStudentAuth();
    const roll_no=useAuth.user;
    const body={roll_no};

    useEffect(() =>{
        const getData = async() =>{
            try {
                const response = await fetch("http://localhost:5000/student/status",{
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(body),
                })
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                console.error(err);
            }
    
        }
        getData();
    },[])

    console.log(data);
    return(
        <>
            <h1>im in status</h1>
            <table class="table">
                <thead>
                    <tr>
                        <th>student_roll_no</th>
                        <th>book_details</th>
                        <th>book_issued_on</th>
                        <th>book_to_be_returned</th>
                        <th>fine</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) =>{
                        return(
                            <tr>
                                <th>{item.student_roll_no}</th>
                                <th>{item.book_details}</th>
                                <th>{item.book_issued_on}</th>
                                <th>{item.book_to_be_returned}</th>
                                <th>{item.fine}</th>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </>
    );
}

export default Status;