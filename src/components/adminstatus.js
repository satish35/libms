import {  useState } from "react";

const StatusAdmin = () =>{
    const [roll_no,setRoll_no]=useState('');
    const [data,setData]=useState([]);
    const body={roll_no};

    const getData = async() =>{
        try {
            console.log("s");
            const response = await fetch("http://localhost:5000/admin/status",{
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




    const handleSubmit= (e) =>{
        e.preventDefault();
        getData();
    };

    const handleDelete =  async id =>{
        const response= await fetch(`http://localhost:5000/admin/recdelete/${id}`, {
            method: "DELETE",
        })

        console.log(response);
        setData(data.filter(dat =>dat.id!==id))
    };

    return(
        <>
            <label for="roll_no">Enter roll_no</label>
            <input type={Text} id="roll_no" value={roll_no} onChange={(e) =>{setRoll_no(e.target.value)}}></input>
            <button type="submit" class="btn btn-primary" onClick={handleSubmit}>get</button>
            <table class="table">
                <thead>
                    <tr>
                        <th>student_roll_no</th>
                        <th>book_details</th>
                        <th>book_issued_on</th>
                        <th>book_to_be_returned</th>
                        <th>fine</th>
                        <th>delete</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) =>{
                        return(
                            <tr key={item.id}>
                                <th>{item.student_roll_no}</th>
                                <th>{item.book_details}</th>
                                <th>{item.book_issued_on}</th>
                                <th>{item.book_to_be_returned}</th>
                                <th>{item.fine}</th>
                                <th><button type="submit" class="btn btn-danger" onClick={() =>{
                                    handleDelete(item.id);
                                    }}>delete</button></th>
                            </tr>
                        );
                    })}
                </tbody>

            </table>
        </>
    );
}

export default StatusAdmin;