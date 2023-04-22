import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import HandyPerName from "./HandyPerName";
import axios from 'axios';
import "./handyperson_history.css";

const HandypersonHistory = () => {
  const [todos, setTodos] = useState([]);
  

  const getDataBase = async (e) => {
    try {
      const response = await fetch(`http://localhost:5000/orders`);
      const jsonData = await response.json();
      setTodos(jsonData);
      
    } catch (err) {
      console.log(err.message)
    }
  };
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
  useEffect(() => {
    getDataBase();
  }, [])

  return (
    <div>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
        <HandyPerName/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <Link className="nav-link mx-2 active" aria-current="page" to="/handyperson">Your Page</Link>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <table className="superhandy-table">
        <thead>
          <tr>
            <th>First_name</th>
            <th>Last_name</th>
            <th>Task</th>
            <th>Date</th>
            <th>Price</th>
            <th>Description</th>
            <th>Address</th>
            <th>Customer Contact</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(item => (
            <tr key={item.order_id}>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.skill_name}</td>
              <td>{item.create_time}</td>
              <td>${item.price}</td>
              <td>{item.description}</td>
              <td>{item.address}</td>
              <td>{item.email}</td>
              <td className={item.status === "Done" ? "done" : (item.status === "In progress" ? "in-progress" : "")}>
                {item.status}
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default HandypersonHistory;