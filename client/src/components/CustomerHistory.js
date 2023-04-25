import React, { useEffect, useState } from "react";
import axios from 'axios';
import './customerHistory.css';
import { NavLink } from 'react-router-dom';
import { Link } from "react-router-dom"
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
        window.location = '/#menu';
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className="customer_history-page">
     <div className="history_page">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <div className=" collapse navbar-collapse"
            id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link className="nav-link mx-2 active"
                  aria-current="page"
                  to="/CustomerPage">Your Profile</Link>
              </li>
              <li className="nav-item">
              <button type="button" className="btn btn-secondary btn-default" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
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
    </div>
    </div>
  );
}

  export default CustomerHistory;