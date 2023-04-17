import { useState } from 'react';
import axios from 'axios';
import './login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/login', { email, password, userType })
      .then((response) => {
        console.log(response);
        // Redirect the user to the appropriate page based on the server's response
      })
      .catch((error) => {
        console.error(error);
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
      </form>
    </div>
  );
}

export default Login;
