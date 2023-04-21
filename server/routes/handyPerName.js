const express = require('express');
const router = express.Router();
const db = require('../db');

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const someInfo = await db.query(`
      SELECT 
      first_name,
      last_name
      FROM 
      handypersons
      WHERE id = $1
    `, [id]); 
    res.json(someInfo.rows);
  } catch (error) {
    // Handle error
    console.error(error);
  }
});

module.exports = router;