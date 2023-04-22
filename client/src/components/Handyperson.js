import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HandyPerName from "./HandyPerName";
import axios from 'axios';
import "./handyperson.css";

const Handyperson = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);


  const getDataBase = async () => {
    try {
      const response = await fetch(`http://localhost:5000/orders`, {credentials: 'include'});
      const jsonData = await response.json();
      setTodos(jsonData);
      setFilteredTodos(jsonData.filter((item) => item.status !== "Done"));
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleAccept = async (id, status) => {
    try {
      // Send update request to backend API
      await fetch(`http://localhost:5000/editStatus/${id}`, {
        method: "POST",
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      // Update local state with the updated status
      const updatedTodos = todos.map((item) => {
        if (item.id === id) {
          return { ...item, status };
        }
        return item;
      });
      setTodos(updatedTodos);
      setFilteredTodos(updatedTodos.filter((item) => item.status !== "Done"));
    } catch (error) {
      console.error("Failed to update status:", error);
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
  }, []);


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <HandyPerName />
          <button className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse"
            id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
                <Link className="nav-link mx-2 active" aria-current="page" to="/handyDash">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2 active"
                  aria-current="page"
                  to="/handyperson_history">Job History</Link>
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
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.map((item) => (
            <tr key={item.id}>
              <td> {item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.skill_name}</td>
              <td>{item.duration}</td>
              <td>${item.price}</td>
              <td>{item.description}</td>
              <td>{item.address}</td>
              <td>{item.email}</td>
              <td
                className={
                  item.status === "Done"
                    ? "done"
                    : item.status === "In progress"
                      ? "in-progress"
                      : ""
                }
              >
                {item.status}
              </td>
              <td>
                {item.status === "In progress" ? (
                  <button
                    className="accept"
                    onClick={() => handleAccept(item.id, "Done")}
                  >
                    Complete
                  </button>
                ) : item.status === "Done" ? (
                  ""
                ) : (
                  <button
                    className="accept"
                    onClick={() => handleAccept(item.id, "In progress")}
                  >
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Handyperson;
