const dotenv = require("dotenv")
const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db');
dotenv.config();
// console.log(process.env.DB_PASS);

//middleware
app.use(cors());
app.use(express.json);

app.listen(5000,()=>{
  console.log("server has started on port 5000");
})