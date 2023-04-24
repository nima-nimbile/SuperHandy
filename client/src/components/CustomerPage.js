import React, { useState, useEffect } from "react";
import axios from 'axios';
import './customerPage.css';
import { NavLink, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
        window.location = '/login';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <nav className="nav-customer-page">
        <h1>Customer Page</h1>
        <div className="nav-customer-page-div">
          <button><NavLink to="/CustomerHistory">History</NavLink></button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>


      <div className="customer-page">
        <form className="form-container">
          <lable>Task:
            <select value={selectedTaskOption} onChange={(event) => setSelectedTaskOption(event.target.value)} >
              <option value="">Choose your task</option>
              <option value="General">General ($35 per hour)</option>
              <option value="Electrician">Electrician ($50 per hour)</option>
              <option value="Installation">Installation ($30 per hour)</option>
              <option value="Plumbing">Plumbing ($45 per hour)</option>
            </select>
          </lable>

          <label>Duration:
            <select value={selectedStimatedTimeOption} onChange={(event) => setSelectedStimatedTimeOption(event.target.value)}>
              <option value="">Choose your duration</option>
              <option value="One hour">One hour</option>
              <option value="Two hours">Two hours</option>
              <option value="Three hours">Three hours</option>
              <option value="More">More</option>
            </select>
          </label>

          <lable>Date:
            <DatePicker selected={date} onChange={date => setDate(date)} dateFormat="MM/dd/yyyy" /></lable>

          <label>Time:
            <select value={selectedTimeOption} onChange={(event) => setSelectedTimeOption(event.target.value)}>
              <option value="">Choose a time</option>
              <option value="9am">9am</option>
              <option value="11am">11am</option>
              <option value="1pm">1pm</option>
              <option value="3pm">3pm</option>
              <option value="5pm">5pm</option>
            </select>
          </label>

          <lable>Description:
            <input type="text" value={description} onChange={(event) => setDescription(event.target.value)}></input>
          </lable>

          <lable>Address:
            <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} />
          </lable>

          <div className="button-customer-page">

            <button type="submit" onClick={handleSubmit}><a href="/CustomerHistory">Save</a></button>
            <button type="cancle" onClick={handleCancel}><a href="/CustomerPage">Reset</a></button>
            {errorMessage && <div className="error-message">{errorMessage}</div>}

          </div >
        </form >
      </div >
    </>
  );
}

export default CustomerPage;
