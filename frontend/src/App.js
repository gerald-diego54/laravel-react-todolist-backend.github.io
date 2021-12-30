import './App.css';
import ToDoList from './components/ToDoList';
import axios from 'axios';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ViewList from './components/ViewList';
import EditTaskandThoughts from './components/EditTaskandThoughts';

axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar /><br />
        <Routes>
          <Route exact path="/addtodolist" element={<ToDoList />}></Route>
          <Route exact path="/viewlist" element={<ViewList />}></Route>
          <Route exact path="/viewlist/editlist/:id" element={<EditTaskandThoughts />}></Route>
        </Routes>
      </Router> 
    </div>
  );
}

export default App;
