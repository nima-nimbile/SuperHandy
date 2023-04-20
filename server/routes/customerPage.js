const express = require('express');
const router = express.Router();
const db = require('../db');



router.post('/task/:id', (req, res) => {
  const { selectedTaskOption, selectedStimatedTimeOption, selectedTimeOption, date, description, address } = req.session;
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

  db.query(`INSERT INTO tasks (skill_id, duration, date, time, description, address, customer_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [skill_id, selectedStimatedTimeOption, date, selectedTimeOption, description, address, reg.session.userId])
    })
    .then((result) => {
      req.session.userId = result.rows[0].id;
        res.status(201).json({ success: true, message: 'Your task added successfully. You can see the process in history page...' });
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    });


module.exports = router;