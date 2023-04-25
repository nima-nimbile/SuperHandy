import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import Register from './Register';
import axios from 'axios';
import './register.scss';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    setShowRegister(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', { email, password, userType }, {withCredentials:true})
      .then((response) => {
        if (userType === 'customer') {
          navigate('/customerPage');
        } else if (userType === 'handyperson') {
          navigate(`/handyDash`);
        }
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Invalid email, password, or user type.');
      });
  };

  return (
    <div className='login-page-container'>
      {showRegister ? (
        <Register />
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>Login Here</h3>
          <label htmlFor="email">Email</label>
          <input type="text" value={email} placeholder="Email" id="email" onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="password">Password</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" id="password"/>
          <label htmlFor="userTyp">User Type</label>
          <select value={userType} onChange={(event) => setUserType(event.target.value)} id="userTyp">
            <option value="">Select user type</option>
            <option value="customer">Customer</option>
            <option value="handyperson">HandyPerson</option>
          </select>
          <button type="submit" >Log In
          <span></span><span></span><span></span><span></span>
          </button>
          <button>
            <Link to="/#menu" className='register'onClick={handleRegisterClick}>Register page</Link>
            <span></span><span></span><span></span><span></span>
            </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </form>
      )}
    </div>
  );
}

export default Login;
