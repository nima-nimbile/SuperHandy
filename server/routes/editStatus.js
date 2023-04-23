const express = require('express');
const router = express.Router();
const db = require('../db');


router.post("/:id", async (req,res) => {
  try {
    const { id } = req.params;
    const {status} = req.body;
    console.log("cookie id", req.session.userId);
    // const {handyperson_id} =req.session.userId;
    const updatStatus = await db.query(`UPDATE orders SET status = $1, handyperson_id = $2 WHERE id = $3`, 
    [status, req.session.userId, id]
    );
res.json(updatStatus.rows)
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;