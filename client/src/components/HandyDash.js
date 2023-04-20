import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './handyDash.scss';
import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom"
import "./handyperson.css";

const HandyDash = (props) => {
  const [handyPerson, setHandyPerson] = useState(null);
  const {id} = useParams();
  const userId = props.userId;


  console.log("id",id);
  useEffect(() => {
    axios.get(`http://localhost:5000/handyDash/${id}`)
      .then((response) => {
        setHandyPerson(response.data.handyperson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userId]);

  return (
    <div>
      <h1>Handyperson</h1>
      <button className="history"><Link to="/handyperson_history">History</Link></button>
      <button className="Logout" onClick={() => window.location = "/#menu"}>
        Logout
      </button>
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