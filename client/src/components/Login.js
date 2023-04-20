import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './login.scss';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:5000/login', { email, password, userType })
    .then((response) => {
      if (userType === 'customer') {
        return navigate('/customer');
      } else if (userType === 'handyperson') {
        return navigate(`/handyDash/${response.data.userId}`);
      }
    })
      .catch((error) => {
        console.error(error);
        setErrorMessage('Invalid email, password, or user type.');
      });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit} className="form-container">
        <h3>Login Here</h3>
        <label>Email</label>
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <label>Password</label>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <label>User Type</label>
        <select value={userType} onChange={(event) => setUserType(event.target.value)}>
          <option value="">Select user type</option>
          <option value="customer">Customer</option>
          <option value="handyperson">HandyPerson</option>
        </select>
        <button type="submit">Login</button>
        <div>
          <a href="/register" className="login">Register</a>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default Login;
