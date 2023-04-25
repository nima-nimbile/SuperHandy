import React, { useState, useEffect } from "react";

const CustomerName = () => {
  const [name, setName] = useState(null);

  const getDataBase = async () => {
    try {
      const response = await fetch(`http://localhost:5000/orders`, {credentials: 'include'});
      const jsonData = await response.json();
      setName(jsonData[0]);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getDataBase();
  }, []);
console.log(name, "nameeeee")
  return (
    <h1 className="navbar-brand">
      {name ? `WELCOME! ${name.first_name}` : ""}
    </h1>
  );
};

export default CustomerName;
