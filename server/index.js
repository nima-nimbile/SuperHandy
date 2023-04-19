require('dotenv').config(); 
const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db');
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['bootcamp'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


//middleware
app.use(cors());
app.use(express.json());

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const handyDashRoute = require("./routes/handyDash");
const ordersRoute = require("./routes/orders");
const editStatusRoute = require("./routes/editStatus");

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/handyDash', handyDashRoute);
app.use('/orders', ordersRoute);
app.use('/editStatus', editStatusRoute);


app.listen(5000,()=>{
  console.log("server has started on port 5000");
})