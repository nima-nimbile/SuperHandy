import React, { useEffect, useState } from "react";
import axios from 'axios';
import './customerHistory.css';
import { NavLink } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';


function CustomerHistory() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/customerHistory');
      const result = await response.json();
      setTableData(result);
    }
    fetchData();
  }, []);


  return (
    <>
      <nav className="nav-customer-history">
      <h1>Customer History</h1>
      <div className="nav-customer-history-div">
          <button><NavLink exact to="/">Home</NavLink></button>
          <button><NavLink to="/CustomerPage">Add new task</NavLink></button>
          <button><NavLink to="/">Logout</NavLink></button>
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
             {/* {tableData.map((row)=>(
              <tr key={row.id}>
                <td>{row.first_name}</td>
                <td>{row.skill_name}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.price}</td>
                <td>{row.description}</td>
                <td>{row.status}</td>
                <td>{row.handyman_contact}</td>
                <td><button>Delete</button></td>
                <td><button>Edit</button></td>
              </tr>
            ))}  */}
          </tbody> 
        </table>
      </div>

      </>
      );
  }

  export default CustomerHistory;