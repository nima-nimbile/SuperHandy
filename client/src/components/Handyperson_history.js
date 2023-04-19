import React, { useState, useEffect } from "react";
import "./handyperson_history.css";

const HandypersonHistory = () => {
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
  return (
    <div>
      <h1>Handyperson History</h1>
      <button className="history"><a href="/handyperson">Back</a></button>
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
              <td>{item.customers.first_name}</td>
              <td>{item.customers.last_name}</td>
              <td>{item.skills.skill_name}</td>
              <td>{item.tasks.create_time}</td>
              <td>{item.skills.price}</td>
              <td>{item.tasks.description}</td>
              <td>{item.tasks.address}</td>
              <td>{item.customers.email}</td>
              <td className={item.orders.status === "Done" ? "done" : ""}>
                {item.status}
              </td>
            </tr>))}
        </tbody>
      </table>
    </div>
  );
};

export default HandypersonHistory;