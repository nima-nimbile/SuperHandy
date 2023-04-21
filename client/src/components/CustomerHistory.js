import React, { useEffect, useState } from "react";
import axios from "axios";
import './customerHistory.css';
import { NavLink } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';

const CustomerHistory = (props) => {
  const [customerPage, setCustomerPage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/customerHistory`, {
      withCredentials: true
    })
      .then((response) => {
        setCustomerPage(response.data.customerPage);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location = '/login';
        }
      });
  }, []);

  const [tableData, setTableData] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:5000/customerHistory');
      const result = await response.json();
      setTableData(result);
    }
    fetchData();
  }, []);


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
              <th>Handyman name</th>
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
                <td>{row.handyman}</td>
                <td>{row.task}</td>
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