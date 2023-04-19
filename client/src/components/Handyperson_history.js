import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "./handyperson_history.css";

const HandypersonHistory = () => {
  const [todos, setTodos] = useState([]);
  

  const getDataBase = async (e) => {
    try {
      const response = await fetch(`http://localhost:5000/hp/${1}`);
      const jsonData = await response.json();
      setTodos(jsonData);
      
    } catch (err) {
      console.log(err.message)
    }
  };
  
  useEffect(() => {
    getDataBase();
  }, [])

  return (
    <div>
      <h1>Handyperson History</h1>
      <button className="history"><Link to="/handyperson">Back</Link></button>
      <button className="Logout" onClick={() => window.location = "/#menu"}>
        Logout
      </button>
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
              <td className={item.status === "Done" ? "done" : ""}>
                {item.status}
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default HandypersonHistory;