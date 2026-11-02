const express = require('express');
const router = express.Router();
const pool = require('./db');

// GET: View all students
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM students ORDER BY id'
        );

        res.json(result.rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// POST: Add a student
router.post('/', async (req, res) => {
    try {
        const { name, email, course } = req.body;

        if (!name || !email || !course) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const result = await pool.query(
            `INSERT INTO students (name, email, course)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [name, email, course]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

// DELETE: Delete a student
router.delete('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'DELETE FROM students WHERE id = $1 RETURNING *',
            [req.params.id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: 'Student not found'
            });
        }

        res.json({
            message: 'Student deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;