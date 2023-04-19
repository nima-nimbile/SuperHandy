import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import "./handyperson.css";

const Handyperson = () => {
  const [todos, setTodos] = useState([]);
  

  const getDataBase = async (e) => {
    try {
      const response = await fetch(`http://localhost:5000/order/${1}`);
      const jsonData = await response.json();
      setTodos(jsonData);
      
    } catch (err) {
      console.log(err.message)
    }
  };
  
  useEffect(() => {
    getDataBase();
  }, [])

  const handleAccept = async (orderId) => {
    // Update the status of the todo object
    const updatedTodos = todos.map(todo => {
      if (todo.order_id === orderId) {
        return { ...todo, status: "Done" };
      }
      return todo;
    });
    
    setTodos(updatedTodos);

  };

  return (
    <div>
      <h1>Handyperson</h1>
      <button className="history"><Link to="/handyperson_history">History</Link></button>
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
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
          {todos.map(item => (
            <tr key={item.order_id}> 
              <td> {item.first_name}</td>
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
              <td>
              <button className="accept" onClick={() => handleAccept(item.order_id)}>Accept</button>
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default Handyperson;
