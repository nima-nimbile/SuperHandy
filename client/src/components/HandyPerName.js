import React, { useState, useEffect } from "react";
import axios from 'axios';

const HandyPerName = () => {
  const [name, setName] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/handyDash`, {
      withCredentials: true
    })
      .then((response) => {
        setName(response.data.handyperson);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location = '/login';
        }
      });
  }, []);
console.log(name, "nameeeee")
  return (
    <h1 className="navbar-brand">
      {name ? `WELCOME! ${name.first_name}` : ""}
    </h1>
  );
};

export default HandyPerName;
