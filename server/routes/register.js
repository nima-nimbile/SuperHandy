const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', (req, res) => {
  const { firstName, lastName, email, phoneNumber, username, password, address, userType, skill } = req.body;

  let tableName = '';
  if (userType === 'customer') {
    tableName = 'customers';
  } else if (userType === 'handyperson') {
    tableName = 'handypersons';
  } else {
    res.status(400).json({ success: false, message: 'Invalid user type.' });
    return;
  }

  db.query(`SELECT * FROM ${tableName} WHERE email = $1`, [email])
    .then((result) => {
      if (result.rows.length > 0) {
        throw new Error('Email already registered');
      }
      if (userType === 'customer') {
        return db.query(`INSERT INTO ${tableName} (first_name, last_name, email, phone_number, username, password, address) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [firstName, lastName, email, phoneNumber, username, password, address])
      } else {
        return db.query(`INSERT INTO ${tableName} (first_name, last_name, email, phone_number, username, password, address, skill) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`, [firstName, lastName, email, phoneNumber, username, password, address, skill])
      }
    })
    .then((result) => {
      res.cookie('userId', result.rows[0].id);
      res.cookie('userType', userType);
      if (userType === 'customer') {
        res.status(201).json({ success: true, message: 'Registration successful. Redirecting to customer dashboard...' });
      } else if (userType === 'handyperson') {
        res.status(201).json({ success: true, message: 'Registration successful. Redirecting to handy person dashboard...' });
      }
    })
    .catch((err) => {
      res.status(400).json({ success: false, message: err.message });
    });
});

module.exports = router;