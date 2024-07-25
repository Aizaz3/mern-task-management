// components/TaskList.js

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, fetchTasks, updateTask, deleteTask } from '../actions/taskActions';

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('dueDate');
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreate = () => {
    if (!title || !description || !dueDate) {
      alert('Please fill out all required fields.');
      return;
    }
    const newTask = { title, description, dueDate, priority };
    dispatch(createTask(newTask));
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
  };

  const handleUpdate = (id) => {
    const updatedTask = { title, description, dueDate, priority, completed: false };
    dispatch(updateTask(id, updatedTask));
    setIsEditing(null);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCompleteToggle = (task) => {
    dispatch(updateTask(task._id, { ...task, completed: !task.completed }));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'All') return true;
    if (filter === 'Completed') return task.completed;
    if (filter === 'Not Completed') return !task.completed;
    return true;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sort === 'dueDate') {
      return new Date(a.dueDate) - new Date(b.dueDate);
    }
    if (sort === 'priority') {
      const priorities = { High: 1, Medium: 2, Low: 3 };
      return priorities[a.priority] - priorities[b.priority];
    }
    return 0;
  });

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Task Manager</h2>
      <div className="mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 rounded w-full mb-2"
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded w-full mb-2"
          required
          min={new Date().toISOString().split('T')[0]}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded w-full">
          Create Task
        </button>
      </div>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="All">All Tasks</option>
          <option value="Completed">Completed Tasks</option>
          <option value="Not Completed">Not Completed Tasks</option>
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded w-full mb-2"
        >
          <option value="dueDate">Sort by Due Date</option>
          <option value="priority">Sort by Priority</option>
        </select>
      </div>
      <ul>
        {sortedTasks.map((task) => (
          <li key={task._id} className="border-b p-2 mb-2">
            <h3 className="text-lg font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p>Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
            <p>Priority: {task.priority}</p>
            <p>Status: {task.completed ? 'Completed' : 'Not Completed'}</p>
            <button
              onClick={() => handleCompleteToggle(task)}
              className={`p-2 rounded ${task.completed ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'} mr-2`}
            >
              {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
            </button>
            <button
              onClick={() => {
                setTitle(task.title);
                setDescription(task.description);
                setDueDate(task.dueDate.split('T')[0]);
                setPriority(task.priority);
                setIsEditing(task._id);
              }}
              className="bg-yellow-500 text-white p-2 rounded mr-2"
            >
              Edit
            </button>
            <button onClick={() => handleDelete(task._id)} className="bg-red-500 text-white p-2 rounded">
              Delete
            </button>
            {isEditing === task._id && (
              <div className="mt-2">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Title"
                  className="border p-2 rounded w-full mb-2"
                  required
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                  className="border p-2 rounded w-full mb-2"
                  required
                />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="border p-2 rounded w-full mb-2"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button onClick={() => handleUpdate(task._id)} className="bg-blue-500 text-white p-2 rounded w-full">
                  Update Task
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
