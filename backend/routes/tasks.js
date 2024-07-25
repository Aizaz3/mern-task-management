// routes/tasks.js
const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authenticate = require('./auth');

// Create a new task
router.post('/', async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  console.log(req.body);
  try {
    const task = new Task({ title, description, dueDate, priority });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(400).json({ message: 'Bad Request', error: error.message });
  }
}); 

/*/ Get all tasks for the user
router.get('/tasks', authenticate, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});
*/
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
});

// Update a task
router.put('/:id', authenticate, async (req, res) => {
  const { title, description, dueDate, priority, completed } = req.body;
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, dueDate, priority, completed },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task' });
  }
});

// Delete a task
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
});

module.exports = router;
