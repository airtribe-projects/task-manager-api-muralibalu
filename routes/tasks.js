const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Initialize tasks exactly as test expects
let tasks = [
    {
        id: 1,
        title: "Set up environment",
        description: "Install Node.js, npm, and git",
        completed: true
    }
];
let nextId = 2;

// Validation middleware for creating/updating tasks (all fields required)
const validateTask = [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('completed').isBoolean().withMessage('Completed must be boolean'),
];

// GET all tasks
router.get('/', (req, res) => {
    res.json(tasks);
});

// GET task by ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
});

// POST create a new task
router.post('/', validateTask, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { title, description, completed } = req.body;
    const newTask = { id: nextId++, title, description, completed };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT update a task (all fields required)
router.put('/:id', validateTask, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    const { title, description, completed } = req.body;
    task.title = title;
    task.description = description;
    task.completed = completed;

    res.status(200).json(task);
});

// DELETE a task
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return res.status(404).json({ error: "Task not found" });

    tasks.splice(index, 1);
    res.status(200).json({ message: "Task deleted successfully" });
});

module.exports = router;
