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


 /*  const deleteRow = (id) => {
    axios.delete(`http://localhost:5000/customerHistory/${id}`)
      .then(() => {
        // update state or do other actions after successful deletion
      })
      .catch((err) => {
        // handle error
      });
  };

    const handleDeleteClick = () => {
      deleteRow(id);
    }; */

    //  const handleDeleteClick = async (id) => {
    //   try {
    //     const deleteRow = await fetch(`http://localhost:5000/deleteRow/${id}`, {
    //       method: "DELETE"
    //     })
    //     setTableData(tableData.filter(item => item.row.id !== id))
    //   } catch (error) {
    //     console.log(error.message);
    //   }
    //  }
    
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
              {tableData.map((row)=>(
                 row && row.id ? (
              <tr key={row.id}>
                <td>{row.first_name}</td>
                <td>{row.skill_name}</td>
                <td>{row.date}</td>
                <td>{row.time}</td>
                <td>{row.price}</td>
                <td>{row.description}</td>
                <td>{row.status}</td>
                <td>{row.email}</td>
                <td><button className="btn btn-danger" onClick={() => handleDeleteClick(row.id)} >Delete</button></td>
                <td><button>Edit</button></td>
              </tr>
            ) : null ))}
          </tbody> 
        </table>
      </div>

      </>
      );
  }

  export default CustomerHistory;