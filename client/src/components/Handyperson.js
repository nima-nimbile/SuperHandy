import React, { useState, useEffect } from "react";
import "./handyperson.css";

const Handyperson = () => {
  const [todos, setTodos] = useState([]);

  const getDataBase = async (e) => {
    try {
      const response = await fetch("http://localhost:5000/hp/:id");
      const jsonData = await response.json();
      setTodos(jsonData)
    } catch (err) {
      console.log(err.message)
    }
  };

  useEffect(() => {
    getDataBase();
  }, [])

  const handleAccept = (orderId) => {
    console.log(`Accepted order with ID: ${orderId}`);
  };

  return (
    <div>
      <h1>Handyperson</h1>
      <button className="history"><a href="/handyperson_history">History</a></button>
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
              <td>{item.customers.first_name}</td>
              <td>{item.customers.last_name}</td>
              <td>{item.skills.skill_name}</td>
              <td>{item.tasks.create_time}</td>
              <td>{item.skills.price}</td>
              <td>{item.tasks.description}</td>
              <td>{item.tasks.address}</td>
              <td>{item.customers.email}</td>
              <td className={item.orders.status === "Done" ? "done" : ""}>
                {item.orders.status}
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
