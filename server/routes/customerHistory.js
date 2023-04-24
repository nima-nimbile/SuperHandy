const express = require('express');
const router = express.Router();
const db = require('../db');



router.get("/", async (req, res) => { // Modify the route to "/"" instead of "/:id"
  if (req.session.userType !== "customer"){
    res.sendStatus(401);
    return;
  }
  try {
    const fetchInfo = await db.query(`
    SELECT 
    handypersons.first_name, 
    skills.skill_name,
    tasks.date, 
    tasks.time,
    tasks.duration,
    skills.price, 
    tasks.description, 
    orders.status,
    handypersons.email,
    orders.id,
    tasks.id as task_id
  FROM 
    customers 
  JOIN 
    tasks ON customers.id = tasks.customer_id 
  JOIN 
    skills ON tasks.skill_id = skills.id 
  JOIN 
    orders ON tasks.id = orders.task_id
  LEFT JOIN
    handypersons ON orders.handyperson_id = handypersons.id
  WHERE
    customers.id = $1`, 
    [req.session.userId]);
    res.json(fetchInfo.rows);
  } catch (error) {
    console.error(error);
  }
});


module.exports = router;