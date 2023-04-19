import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './handyDash.scss';

const HandyDash = () => {
  const [handyPerson, setHandyPerson] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/handyDash/1')
      .then((response) => {
        setHandyPerson(response.data.handyperson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
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
  );
};
  
export default HandyDash;