const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  if (req.session.userType !== "customer"){
    res.sendStatus(401);
    return;
  }
})

router.post('/', (req, res) => {
  const { selectedTaskOption, selectedStimatedTimeOption, selectedTimeOption, date, description, address } = req.body;
  let skill_id;
  if (selectedTaskOption === 'General') {
    skill_id = 1;
  } else if (selectedTaskOption === 'Electrician') {
    skill_id = 2;
  } else if (selectedTaskOption === 'Installation') {
    skill_id = 3;
  } else if (selectedTaskOption === 'Plumbing') {
    skill_id = 4;
  }
  let customer_id = 2;

  db.query(`IINSERT INTO tasks (skill_id, duration, date, time, description, address, customer_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`, 
  [skill_id, selectedStimatedTimeOption, date, selectedTimeOption, description, address, customer_id/* customer_id: , req.body.userId */])

    .then((result) => {
      const taskId = result.rows[0].id;
      db.query('INSERT INTO orders (status, task_id) VALUES ($1, $2)', ['pending', taskId])
      .then(()=> {
        req.session.userId = taskId;
        res.status(201).json({ success: true, message: 'Your task added successfully. You can see the process in history page...' });
      })
      .catch((err) => {
        res.status(400).json({ success: false, message: err.message });
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    })
  });

  module.exports = router;