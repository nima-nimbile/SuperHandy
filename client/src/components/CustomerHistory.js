import React, { useEffect, useState } from "react";
import axios from 'axios';
import './customerHistory.css';
import { NavLink } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';


const CustomerHistory = (props) => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/customerHistory`, {
      withCredentials: true
    })
      .then((response) => {
        setTableData(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location = '/login';
        }
      });
  }, []);


  const handleDeleteClick = (id) => {
    // Find the index of the row to be deleted
    const indexToDelete = tableData.findIndex(row => row.task_id === id);
    
    // Create a copy of the table data array
    const updatedTableData = [...tableData];
    
    // Remove the row from the copied array
    updatedTableData.splice(indexToDelete, 1);
    
    // Update the state to remove the row from the UI
    setTableData(updatedTableData);
    
    // Send the delete request to the server
    axios.delete(`http://localhost:5000/deleteRow/${id}`)
      .then((response) => {
        // Do nothing on success
      })
      .catch((error) => {
        console.log(error.message);
        // If the delete request fails, revert the UI state
        setTableData(tableData);
      });
  }

  const handleLogout = () => {
    console.log('Logging out...');
    axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then((response) => {
        window.location = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <>
      <nav className="nav-customer-history">
        <h1>Customer History</h1>
        <div className="nav-customer-history-div">
          <button><NavLink to="/CustomerPage">Add new task</NavLink></button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="customer-history">
        <table>
          <thead>
            <tr>
              <th>Handyperson name</th>
              <th>Task</th>
              <th>Date</th>
              <th>Time</th>
              <th>During</th>
              <th>Price</th>
              <th>Description</th>
              <th>Status</th>
              <th>Handyman contact</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.task_id}>
                <td>{row.first_name}</td>
                <td>{row.skill_name}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.duration}</td>
                <td>{row.price}</td>
                <td>{row.description}</td>
                <td>{row.status}</td>
                <td>{row.email}</td>
                {row.status !== 'pending' && (
                  <>
                  <td></td>
                  <td></td>
                </>
                )}
                  {row.status === 'pending' && (
                    <>
                      <td><button className="btn btn-danger" onClick={() => handleDeleteClick(row.task_id)}>Delete</button></td>
                      <td><button>Edit</button></td>
                    </>
                  )}
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

  export default CustomerHistory;