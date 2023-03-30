import { useState } from "react";
import { useStudentAuth } from "./StudentAuthProvider";


const Order = () =>{

    const useAuth=useStudentAuth();
    const [book_details, setBook_details]= useState('');

    const student_roll_no=useAuth.user;

    const body={ student_roll_no,book_details };

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch('http://localhost:5000/student/order',
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body),
        }).then((response) =>{
            if(!response.ok)
            {
               throw new Error("Something went wrong");
            }
            return response.json();
        }).then(data =>{alert(data);
        }).catch(error =>{
            console.log(error);
        })
    }


    return(
        <form onSubmit={handleSubmit}>
            <label for="book_details">book_details</label>
            <input type={Text} id="book_details" value={book_details} onChange={(e) =>{setBook_details(e.target.value)}}></input>
            <button type="submit" class="btn btn-primary">Order</button>
        </form>
    );
}

export default Order;