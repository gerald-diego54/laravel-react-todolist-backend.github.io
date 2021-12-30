import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import SaveIcon from '@mui/icons-material/Save';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import sweetAlert from 'sweetalert';
import '../css/style.css';

const ToDoList = () => {
    // const navigate = useNavigate();
    const [codingJouranal, setCodingJournal] = useState({
        task: "",
        thought: "",
        date: ""
    });


    const handleInput = (e) => {
        setCodingJournal({ ...codingJouranal, [e.target.name]: e.target.value });
    }

    const addToDo = (e) => {
        e.preventDefault();

        const data = {
            task: codingJouranal.task,
            thought: codingJouranal.thought,
            date: codingJouranal.date
        }
        console.log(data);

        axios.post("api/addtodolist", data).then(response => {
            if (response.data.status === 200) {
                sweetAlert({
                    icon: "success",
                    text: response.data.message
                }).then(() => {
                    window.location.href = "/addtodolist";
                });
                setCodingJournal({
                    task: "",
                    thought: "",
                    date: ""
                });
                // navigate('/addtodolist');
            }
            else if (response.data.status === 422) sweetAlert({ icon: "error", text: "Missing input required!" });
        });

    }




    return (
        <div className='container-fluid'><br /><br /><br />
            <div className='container'>
                <form onSubmit={addToDo}>
                    <div className='row'>
                        <div className='col'>
                            <h3 className='text-dark fw-bold'>My Coding Journal</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <TextField sx={{ width: '400px' }} onChange={handleInput} name='task' value={handleInput.task} label="My Tasks" />
                            
                        </div>
                    </div><br />
                    <div className='row'>
                        <div className='col'>
                            <TextField sx={{ width: '400px' }} onChange={handleInput} name='thought' value={handleInput.thought} label="My Thoughts" />
                           
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'><br />
                            <TextField
                                onChange={handleInput}
                                name='date'
                                value={handleInput.date}
                                sx={{ width: '400px' }}
                                label="Date Start"
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'><br />
                            <Button style={{backgroundColor: '#212529'}} sx={{ marginLeft: 0, width: 400 }}
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

export default ToDoList
