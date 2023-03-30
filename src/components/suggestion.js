import { useState } from "react";
import { useStudentAuth } from "./StudentAuthProvider";

const Suggestion= () =>{
    const [suggestion,setSuggestion] = useState('');
    const username=useStudentAuth();
    const roll_no=username.user;

    const handleSubmit = (e) =>{
        e.preventDefault();
        const body= { roll_no,suggestion };
        fetch('http://localhost:5000/student/suggestion',
        {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(body),
        }).then(response =>{
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
        <>
            <form onSubmit={handleSubmit}>
                <label for="suggestion">suggestion</label>
                <input type={Text} value={suggestion} onChange={(e) =>{setSuggestion(e.target.value)}} id="suggestion"></input>
                <button type="submit" class="btn btn-primary">submit</button>
            </form>
        </>
    );
}

export default Suggestion;