import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import sweetAlert from 'sweetalert';
import { useParams } from 'react-router-dom';
import '../css/style.css';

const EditTaskandThoughts = () => {
    const [codingJournal, setCodingJournal] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    console.log(codingJournal);
    const handleInput = (e) => {
        setCodingJournal({ ...codingJournal, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        const todolist_id = id;
        axios.get(`api/edit/${todolist_id}`).then((response) => {
            console.log(response.data.status);
            if (response.data.status === 200) {
                setCodingJournal(response.data.todolist);
            }
            else if (response.data.status === 404) {
                sweetAlert({ icon: "error", text: response.data.message }).then(() => {
                    window.location.href = "/viewlist";
                });
            }
        });
    }, [id]);

    const updateList = (e) => {
        e.preventDefault();
        const data = {
            task: codingJournal.task,
            thought: codingJournal.thought,
            date: codingJournal.date
        }
        console.log(data);
        axios.put(`api/update/${id}`, data).then(response => {
            if (response.data.status === 200){
                sweetAlert({icon: "success", text: response.data.message}).then(() => {
                    window.location.href = "/viewlist";
                });
            }
            else if (response.data.status === 422) sweetAlert({icon: "info", text: "All fields are mandatory!"});
        });
    }


    return (
        <div className='container-fluid'><br /><br /><br />
            <div className='container'>
                <form onSubmit={updateList}>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='text-dark fw-bold' style={{marginLeft: 150}}>Updating My Coding Journal</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <TextField sx={{ width: '400px' }} onChange={handleInput} name='task' value={codingJournal.task} label="My Tasks" focused />
        
                        </div>
                    </div><br />
                    <div className='row'>
                        <div className='col'>
                            <TextField sx={{ width: '400px' }} onChange={handleInput} name='thought' value={codingJournal.thought} label="My Thoughts" focused />

                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'><br />
                            <TextField
                                onChange={handleInput}
                                name='date'
                                value={codingJournal.date}
                                sx={{ width: '400px' }}
                                label="Date Start"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                focused
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'><br />
                            <Button style={{backgroundColor: "#212529"}} sx={{ marginLeft: 0, width: 400 }}
                                color="primary"
                                type="submit"
                                startIcon={<SaveIcon />}
                                variant="contained"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTaskandThoughts
