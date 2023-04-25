import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom"
import './handyDash.scss';
import "./handyperson.scss";
import HandyPerName from "./HandyPerName";

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
        window.location = '/#menu';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className='handy_dash-page'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <HandyPerName />
          <div className=" collapse navbar-collapse"
            id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
            <li className="nav-item">
                <Link className="nav-link mx-2 active" aria-current="page" to="/handyDash">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2 active"
                  aria-current="page"
                  to="/handyperson">Job List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link mx-2 active"
                  aria-current="page"
                  to="/handyperson_history">Your History</Link>
              </li>
              <li className="nav-item">
              <button type="button" class="btn btn-secondary btn-default" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {handyPerson && (
        <div className="page-content page-container" id="page-content">
          <div className="padding">
            <div className="row container d-flex justify-content-center">
              <div className="col-xl-6 col-md-12">
                <div className="card user-card-full">
                  <div className="row m-l-0 m-r-0">
                    <div className="col-sm-4 bg-c-lite-green user-profile">
                      <div className="card-block text-center text-white">
                        <div className="m-b-25">
                        </div>
                        <h6 className="f-w-600">{handyPerson.first_name} {handyPerson.last_name}</h6>
                        <h4>{handyPerson.skill_name}</h4>
                        <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                      </div>
                    </div>
                    <div className="col-sm-8">
                      <div className="card-block">
                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Email</p>
                            <h5 className="text-muted f-w-400">{handyPerson.email}</h5>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Phone</p>
                            <h5 className="text-muted f-w-400">{handyPerson.phone_number}</h5>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Address</p>
                            <h5 className="text-muted f-w-400">{handyPerson.address}</h5>
                          </div>
                          <div className="col-sm-6">
                            <p className="m-b-10 f-w-600">Rating</p>
                            <h5 className="text-muted f-w-400">{handyPerson.rating}</h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HandyDash;