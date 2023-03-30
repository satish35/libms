import { useEffect, useState } from "react";


const AdminSuggestion =() =>{

    const [suggestion,setSuggestion]=useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const getData = async () =>{
            const response = await fetch("http://localhost:5000/admin/suggestion",{
                method: "GET"
            });
            const jsonData = await response.json();
            setSuggestion(jsonData);
            setLoading(false);
        };
        getData();
    },[])

    const handleDelete = async id =>{
        const response=  await fetch(`http://localhost:5000/admin/suggestdelete/${id}`,{
            method: "DELETE",
        })

        console.log(response);
        setSuggestion(suggestion.filter(item =>item.id!==id));
    }
    return(
        loading ? <h2>loading</h2> :
            <>
                <table class="table">
                    <thead>
                        <tr>
                            <th>student_roll_no</th>
                            <th>suggestion</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suggestion.map((item) =>{
                            return(
                                <tr key={item.id}>
                                    <th>{item.student_id}</th>
                                    <th>{item.suggestion}</th>
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

export default AdminSuggestion;