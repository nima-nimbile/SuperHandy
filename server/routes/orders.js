const express = require('express');
const router = express.Router();
const db = require('../db');


router.get("/", async (req, res) => { // Modify the route to "/"" instead of "/:id"
  try {
    const someInfo = await db.query(`
      SELECT 
        customers.first_name, 
        customers.last_name, 
        skills.skill_name, 
        tasks.duration, 
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
    `); // Remove the WHERE clause that filters by customer id
    res.json(someInfo.rows);
  } catch (error) {
    // Handle error
    console.error(error);
  }
});

module.exports = router;