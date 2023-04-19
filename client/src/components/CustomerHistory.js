import React, { useEffect, useState } from "react";

import './customerHistory.css';
import { NavLink } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';


function CustomerHistory() {
  const [tableData, setTableData] = useState([]);
  

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/get-data');
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
          {/* <tbody>
            {tableData.map((row)=>(
              <tr key={row.id}>
                <td>{row.handyman}</td>
                <td>{row.task}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.price}</td>
                <td>{row.description}</td>
                <td>{row.status}</td>
                <td>{row.handyman_contact}</td>
                <td>{row.delete}</td>
                <td>{row.edit}</td>
              </tr>
            ))}
          </tbody> */}
           <tbody>
              <tr>
                <td>Albert Es</td>
                <td>General</td>
                <td>24/03/2023</td>
                <td>3 pm</td>
                <td>$70</td>
                <td>I need your help</td>
                <td>pending for doing</td>
                <td>778-951-5698</td>
                <td><button>Delete</button></td>
                <td><button>Edit</button></td>
              </tr>
              <tr>
                <td>Martin Lee</td>
                <td>Plumbing</td>
                <td>12/02/2023</td>
                <td>9 am</td>
                <td>$85</td>
                <td>I need your help</td>
                <td>pending for accept</td>
                <td>778-951-1234</td>
                <td><button>Delete</button></td>
                <td><button>Edit</button></td>
              </tr>
          </tbody>
        </table>
      </div>


      </>
      );
  }

  export default CustomerHistory;