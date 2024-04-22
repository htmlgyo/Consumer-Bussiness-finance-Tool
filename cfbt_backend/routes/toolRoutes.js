const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all tools
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tools');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get tool by ID
router.get('/:id', async (req, res) => {
  try {
    const toolId = req.params.id;
    const [rows] = await db.query('SELECT * FROM tools WHERE id = ?', [toolId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    res.json(rows[0]); // Assuming there's only one tool with the given ID
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new tool
router.post('/', async (req, res) => {
  try {
    const { name, description, link, image } = req.body;
    await db.query('INSERT INTO tools (name, description, link, image) VALUES (?, ?, ?, ?)', [name, description, link, image]);
    res.json({ message: 'Tool added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Update tool by ID
router.put('/:id', async (req, res) => {
  try {
    const toolId = req.params.id;
    const { name, description, link, image } = req.body;
    
    // Check if the tool exists
    const [existingTool] = await db.query('SELECT * FROM tools WHERE id = ?', [toolId]);
    if (existingTool.length === 0) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    
    // Update the tool
    await db.query('UPDATE tools SET name = ?, description = ?, link = ?, image = ? WHERE id = ?', [name, description, link, image, toolId]);
    
    res.json({ message: 'Tool updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete tool by ID
router.delete('/:id', async (req, res) => {
  try {
    const toolId = req.params.id;
    
    // Check if the tool exists
    const [existingTool] = await db.query('SELECT * FROM tools WHERE id = ?', [toolId]);
    if (existingTool.length === 0) {
      return res.status(404).json({ message: 'Tool not found' });
    }
    
    // Delete the tool
    await db.query('DELETE FROM tools WHERE id = ?', [toolId]);
    
    res.json({ message: 'Tool deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
