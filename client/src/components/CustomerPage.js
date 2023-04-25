import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "./doc/Logo.PNG"
import './customerPage.scss';
import ReactDatePicker from "react-datepicker";
import CustomerName from "./CustomerName";

const CustomerPage = (props) => {
  const [customerPage, setCustomerPage] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/customerPage`, {
      withCredentials: true
    })
      .then((response) => {
        setCustomerPage(response.data.customerPage);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          window.location = '/login';
        }
      });
  }, []);

  const [selectedTaskOption, setSelectedTaskOption] = useState('');
  const [selectedStimatedTimeOption, setSelectedStimatedTimeOption] = useState('');
  const [selectedTimeOption, setSelectedTimeOption] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleSubmit = () => {
    if (
      selectedTaskOption === '' ||
      selectedStimatedTimeOption === '' ||
      selectedTimeOption === '' ||
      date === '' ||
      description === '' ||
      address === '') {
      setErrorMessage('Please fill up all fields');
      return;
    }

    axios.post('http://localhost:5000/customerPage', {
      selectedTaskOption,
      selectedStimatedTimeOption,
      selectedTimeOption,
      date,
      description,
      address
    }, {
      withCredentials: true
    })
      .then((response) => {
        return navigate('/CustomerHistory');
      })
      .catch((error) => {
        setErrorMessage('account already used');
      });
  }

  const handleCancel = () => {
    setSelectedTaskOption("");
    setSelectedStimatedTimeOption("");
    setSelectedTimeOption("");
    setDescription("");
    setAddress("");
    setErrorMessage("");
  };

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
    <div className="customer_page">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
        <div className="container-fluid">
          <CustomerName />
          <div className=" collapse navbar-collapse"
            id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto ">
              <li className="nav-item">
                <button type="button" className="btn btn-secondary btn-default" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="mainOne">
        <div className='logo'>
          <img src={logo} alt="logo" width="450" height="350" />
        </div>
      </div>
      <div className="customer-page">
        <form className="form-container">
        <h6>Create a Task</h6>
          <lable htmlFor="Task">Task</lable>
          <select id="Task" value={selectedTaskOption} onChange={(event) => setSelectedTaskOption(event.target.value)} >
            <option value="">Choose your task</option>
            <option value="General">General ($35 per hour)</option>
            <option value="Electrician">Electrician ($50 per hour)</option>
            <option value="Installation">Installation ($30 per hour)</option>
            <option value="Plumbing">Plumbing ($45 per hour)</option>
          </select>


          <label htmlFor="Duration">Duration</label>
          <select id="Duration" value={selectedStimatedTimeOption} onChange={(event) => setSelectedStimatedTimeOption(event.target.value)}>
            <option value="">Choose your duration</option>
            <option value="One hour">One hour</option>
            <option value="Two hours">Two hours</option>
            <option value="Three hours">Three hours</option>
            <option value="More">More</option>
          </select>

          <lable htmlFor="Date">Date</lable>
          <ReactDatePicker className="datapicker" id="Date" selected={date}
            onChange={date => setDate(date)} dateFormat="MM/dd/yyyy"
          />

          <label htmlFor="Time">Time</label>
          <select id="Time" value={selectedTimeOption} onChange={(event) => setSelectedTimeOption(event.target.value)}>
            <option value="">Choose a time</option>
            <option value="9am">9am</option>
            <option value="11am">11am</option>
            <option value="1pm">1pm</option>
            <option value="3pm">3pm</option>
            <option value="5pm">5pm</option>
          </select>

          <lable htmlFor="Description">Description</lable>
          <input type="text" id="Description" value={description} onChange={(event) => setDescription(event.target.value)}></input>

          <lable htmlFor="Address">Address</lable>
          <input id="Address" type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
          <div className="unic">
            <button type="submit" onClick={handleSubmit}><a className='Save' href="/CustomerHistory">Save</a>
              <span></span><span></span><span></span><span></span>
            </button>
            <button type="cancle" onClick={handleCancel}><a className='Reset' href="/CustomerPage">Reset</a>
              <span></span><span></span><span></span><span></span>
            </button>
          </div>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form >
      </div >
    </div>
  );
}

export default CustomerPage;
