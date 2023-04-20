import React, { useState, useEffect } from "react";

const HandyPerName = ({ todos }) => {
  const [name, setName] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (todos.length > 0) {
          // Extract the ID from the first todo in the todos array
          const id = todos[0].id; 
          const response = await fetch(
            `http://localhost:5000/handyPerName/${id}`
          );
          const jsonData = await response.json();
          setName(jsonData);
        }
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, [todos]);
  console.log(name, "nameeeeeee")
  return (
    <h1 className="navbar-brand">
      {name ? `Handyperson: ${name[0].first_name} ${name[0].last_name}` : ""}
    </h1>
  );
};

export default HandyPerName;
