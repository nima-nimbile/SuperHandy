const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query(`SELECT handypersons.id, 
    handypersons.first_name, 
    handypersons.last_name, 
    handypersons.email, 
    handypersons.phone_number, 
    handypersons.username, 
    handypersons.address, 
    handypersons.rating, 
    skills.skill_name, 
    skills.price 
    FROM handypersons 
    JOIN skills ON handypersons.skill_id = skills.id 
    WHERE handypersons.id = $1`, 
  [id])
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({ success: false, message: 'Handy person not found.' });
      } else {
        const handyperson = result.rows[0];
        res.status(200).json({
          success: true,
          handyperson: {
            id: handyperson.id,
            first_name: handyperson.first_name,
            last_name: handyperson.last_name,
            email: handyperson.email,
            phone_number: handyperson.phone_number,
            username: handyperson.username,
            address: handyperson.address,
            rating: handyperson.rating,
            skill_id: handyperson.skill_id,
            skill_name: handyperson.skill_name,
            price: handyperson.price
          }
        });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: 'Internal server error.' });
    });
});
module.exports = router;