const dotenv = require("dotenv")
const express = require("express");
const app = express();
const cors = require("cors");
const db = require('./db');
const { Pool } = require("pg");
dotenv.config();
// console.log(process.env.DB_PASS);

//middleware
app.use(cors());
app.use(express.json());

//ROUTES//


app.get("/hp/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const someInfo = await db.query(`
      SELECT 
        customers.first_name, 
        customers.last_name, 
        skills.skill_name, 
        tasks.create_time, 
        skills.price, 
        tasks.description, 
        tasks.address, 
        customers.email, 
        orders.status,
        orders.id
      FROM 
        customers 
      JOIN 
        tasks ON customers.id = tasks.customer_id 
      JOIN 
        skills ON tasks.skill_id = skills.id 
      JOIN 
        orders ON tasks.id = orders.task_id 
      WHERE
        customers.id = $1
    `, [id]); // Pass the id parameter as a query parameter
    res.json(someInfo.rows);
  } catch (error) {
    // Handle error
    console.error(error);
  }
});

//edit request

app.put("/edit/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const {status} = req.body;
    const updatStatus = await db.query(`UPDATE orders SET status = $1 WHERE orders_id = $2`, 
    [status, id]
    );
res.json(updatStatus)
  } catch (error) {
    console.error(error);
  }
})

app.listen(5000, () => {
  console.log("server has started on port 5000");
})  