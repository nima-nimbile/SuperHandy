const express = require('express');
const router = express.Router();
const db = require('../db');

router.put("/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const {status} = req.body;
    const updatStatus = await db.query(`UPDATE orders SET status = $1 WHERE id = $2`, 
    [status, id]
    );
res.json(updatStatus.rows)
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;