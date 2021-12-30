import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import sweetAlert from 'sweetalert';

function ViewList() {
    const [codingJouranal, setCodingJournal] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("api/viewlist").then(response => {
            if (response["status"] === 200){
                setCodingJournal(response.data.list);
                setLoading(false);
            }
            console.log(response.data.list);
        });
    }, []);
    console.log(codingJouranal);

    if (loading){
        return <h4>Loading To Do Lists</h4>;
    }
    else {
        var list_table = "";
        list_table = codingJouranal.map((elements, index) => {
            console.log(index);
            return (
                <tr key={index}>
                    <td>{elements.task}</td>
                    <td>{elements.thought}</td>
                    <td>{elements.date}</td>
                    <td><Link to={`editlist/${elements.id}`} className='btn btn-success btn-md'>Edit</Link></td>
                    <td><button type='button' onClick={(e) => deletelist(e, elements.id)} className='btn btn-danger btn-md'>Delete</button></td>
                </tr>
            );
        });
    }
    const deletelist = (e, id) => {
        e.preventDefault();
        const delClick = e.currentTarget;
        delClick.innerText = "Deleting...";
        axios.delete(`api/deletelist/${id}`).then((response) => {
            if (response.data.status === 200){
                sweetAlert({
                    icon: "success",
                    text: response.data.message
                });
                delClick.closest("tr").remove();
            }
            else if (response.data.status === 422) sweetAlert({
                icon: "error",
                text: response.data.message
            });
            else if (response.data.status === 404) {
                sweetAlert({
                    icon: "info",
                    text: "All fields are mandatory!"
                });
                delClick.innerText = "delete";
            }
        });
    }
    return (
        <div className='container-fluid'>
            <div className='container'>
                <table className='table table-striped table-dark table-responsive'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tasks</th>
                            <th>Thoughts</th>
                            <th>Date</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list_table}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ViewList
