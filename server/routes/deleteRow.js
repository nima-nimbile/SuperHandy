const express = require('express');
const router = express.Router();
const db = require('../db');

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRow = await db.query(`DELETE FROM tasks WHERE id = $1`, [id]);
    res.json({ message: 'Row deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete row' });
  }
});

module.exports = router;
