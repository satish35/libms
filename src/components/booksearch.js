import { useState } from "react";

const BookSearch= () =>{

    const [title,setTitle]= useState('');
    const [isbn_code,setIsbn_code]= useState(null);
    const [author_name,setAuthor_name]= useState('');

    const body={title,isbn_code,author_name};

    const handleSubmit = (e) =>{
        e.preventDefault();
        fetch("http://localhost:5000/student/book",
        {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
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
                <label for="title">title</label>
                <input type={Text} id="title" value={title} onChange={(e) =>{setTitle(e.target.value)}}></input>
                <label for="isbn_code">isbn_code</label>
                <input type={Text} id="isbn_code" value={isbn_code} onChange={(e) =>{setIsbn_code(e.target.value)}}></input>
                <label for="author_name">author_name</label>
                <input type={Text} id="author_name" value={author_name} onChange={(e) =>{setAuthor_name(e.target.value)}}></input>
                <button type="submit" class="btn btn-primary">submit</button>
            </form>
        </>    
    );
}

export default BookSearch;