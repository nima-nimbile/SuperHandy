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



  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteRow/${id}`);
      console.log(tableData, "tableDataaaaaaaaa")
      setTableData(prevTableData => {
        // Filter out the deleted row from the previous state
        const updatedTableData = prevTableData.filter(item => item.id !== id);
        
        // Return the updated state
        return updatedTableData;
      });
    } catch (error) {
      console.log(error.message);
    }
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
              <th>Price</th>
              <th>Description</th>
              <th>Status</th>
              <th>Handyman contact</th>
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
           <tbody>
             {tableData.map((row)=>(
              <tr key={row.id}>
                <td>{row.first_name}</td>
                <td>{row.skill_name}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.price}</td>
                <td>{row.description}</td>
                <td>{row.status}</td>
                <td>{row.handyman_contact}</td>
                <td><button className="btn btn-danger" onClick={() => handleDeleteClick(row.id)} >Delete</button></td>
                <td><button>Edit</button></td>
              </tr>
            ))} 
          </tbody> 
        </table>
      </div>

      </>
      );
  }

  export default CustomerHistory;