import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import './handyDash.scss';
import "./handyperson.scss";

const HandyDash = (props) => {
  const [handyPerson, setHandyPerson] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/handyDash`, {
      withCredentials: true
    })
      .then((response) => {
        setHandyPerson(response.data.handyperson);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location = '/login';
        }
      });
  }, []);

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

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <h1 className="navbar-brand">Handyperson</h1>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div className=" collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
                <Link className="nav-link mx-2 active" aria-current="page" to="/handyperson">Job List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2 active" aria-current="page" to="/handyperson_history">Job History</Link>
              </li>
              <button onClick={handleLogout}>
                  Logout
                </button>
            </ul>
          </div>
        </div>
      </nav>
      <div className="handy-dash">
        {handyPerson && (
          <>
            <h1 className="handy-dash__title">{handyPerson.first_name} {handyPerson.last_name}'s Profile</h1>
            <div className="handy-dash__info">
              <p className="handy-dash__info-item"><span>Email:</span> {handyPerson.email}</p>
              <p className="handy-dash__info-item"><span>Phone Number:</span> {handyPerson.phone_number}</p>
              <p className="handy-dash__info-item"><span>Username:</span> {handyPerson.username}</p>
              <p className="handy-dash__info-item"><span>Address:</span> {handyPerson.address}</p>
              <p className="handy-dash__info-item"><span>Rating:</span> {handyPerson.rating}</p>
              <p className="handy-dash__info-item"><span>Skill:</span> {handyPerson.skill_name}</p>
              <p className="handy-dash__info-item"><span>Price:</span> {handyPerson.price}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
  
export default HandyDash;