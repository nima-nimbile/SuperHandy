import React, { useState } from 'react';
import axios from 'axios';
import './register.scss';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setUserType] = useState('');
  const [skill, setSkill] = useState('');

  const handleRegister = () => {
    axios.post('/register', {
      firstName,
      lastName,
      email,
      phoneNumber,
      username,
      password,
      address,
      userType,
      skill
    })
    .then((response) => {
      console.log(response.data.message);
      // Redirect to appropriate dashboard based on userType
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
  }

  return (
    <div className="register-page">
      <div className="form-container">
        <h3>Register</h3>
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="text" id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <label htmlFor="address">Address</label>
        <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <label htmlFor="userType">User Type</label>
        <select id="userType" value={userType} onChange={(e) => setUserType(e.target.value)}>
          <option value="">Select user type</option>
          <option value="customer">Customer</option>
          <option value="handyperson">Handy Person</option>
        </select>
        {userType === 'handyperson' && (
          <>
            <label htmlFor="skill">Skill</label>
            <select id="skill" value={skill} onChange={(e) => setSkill(e.target.value)}>
              <option value="">Select skill</option>
              <option value="general">General</option>
              <option value="electric">Electric</option>
              <option value="install">Install</option>
              <option value="plumb">Plumb</option>
            </select>
          </>
        )}
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Register;