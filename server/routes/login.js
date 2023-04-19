const express = require('express');
const router = express.Router();
const db = require('../db');


router.post('/', (req, res) => {
  const { email, password, userType } = req.body;
  let tableName = '';
  if (userType === 'customer') {
    tableName = 'customers';
  } else if (userType === 'handyperson') {
    tableName = 'handypersons';
  } else {
    res.status(401).json({ success: false, message: 'Invalid user type.' });
    return;
  }

  db.query(`SELECT * FROM ${tableName} WHERE email = $1`, [email])
    .then((result) => {
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      if (result.rows[0].password !== password) {
        throw new Error('Invalid password');
      }
      req.session.userId = result.rows[0].id;
      req.session.userType = userType;
      if (userType === 'customer') {
        res.status(200).json({ success: true, message: 'Login successful. Redirecting to customer dashboard...' });
      } else if (userType === 'handyperson') {
        res.status(200).json({ success: true, message: 'Login successful. Redirecting to handy person dashboard...' });
      }
    })
    .catch((err) => {
      res.status(401).json({ success: false, message: err.message });
    });
});

module.exports = router;