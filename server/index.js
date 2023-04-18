require('dotenv').config(); 
const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db');


//middleware
app.use(cors());
app.use(express.json());

const loginRoute = require("./routes/login");
const registerRoute = require("./routes/register");


app.use('/login', loginRoute);
app.use('/register', registerRoute);


app.listen(5000,()=>{
  console.log("server has started on port 5000");
})