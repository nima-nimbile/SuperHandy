require('dotenv').config(); 
const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db');
app.set('trust proxy', 1);
const cookieSession = require('cookie-session');


app.use(cookieSession({
  name: 'session',
  keys: ['bootcamp'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000, // 24 hours

}))


//middleware
app.use(cors({credentials: true, origin: "http://localhost:3000"}));
app.use(express.json());

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");
const handyDashRoute = require("./routes/handyDash");
const ordersRoute = require("./routes/orders");
const editStatusRoute = require("./routes/editStatus");
const logoutRoute = require("./routes/logout");

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/handyDash', handyDashRoute);
app.use('/orders', ordersRoute);
app.use('/editStatus', editStatusRoute);
app.use('/logout', logoutRoute);


app.listen(5000,()=>{
  console.log("server has started on port 5000");
})