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
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editPriority, setEditPriority] = useState('Medium');
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(fetchTasks()); // Fetch tasks when component mounts
  }, [dispatch]);

  const handleCreate = () => {
    if (!title || !description || !dueDate) {
      setError('Title, description, and due date are required.');
      return;
    }

    if (new Date(dueDate) <= new Date()) {
      setError('Due date must be in the future.');
      return;
    }

    const newTask = { title, description, dueDate, priority };
    dispatch(createTask(newTask));

    // Clear the input fields after creating the task
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
  };

  const handleUpdate = (task) => {

    if (new Date(dueDate) <= new Date()) {
      setError('Due date must be in the future.');
      return;
    }
    const updatedTask = {
      ...task,
      title: editTitle || task.title,
      description: editDescription || task.description,
      dueDate: editDueDate || task.dueDate,
      priority: editPriority || task.priority
    };
    dispatch(updateTask(task._id, updatedTask));
    setEditingTask(null);
  };

  const handleCompleteToggle = (task) => {
    dispatch(updateTask(task._id, { ...task, completed: !task.completed }));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Manager</h1>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        />
        <a>Set Due Date</a>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-2 rounded"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border border-gray-300 p-2 w-full mb-4 rounded"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={handleCreate}
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          Create Task
        </button>
      </div>

      <ul>
        {tasks.map(task => (
          <li key={task._id} className="mb-4 p-4 bg-white rounded-lg shadow-sm flex justify-between items-center">
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{task.title}</h2>
              <p>{task.description}</p>
              <p className="text-gray-600">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
              <p className="text-gray-600">Priority: {task.priority}</p>
              <p className={`font-semibold ${task.completed ? 'text-green-500' : 'text-red-500'}`}>
                Status: {task.completed ? 'Completed' : 'Not Completed'}
              </p>
            </div>
            <div className="flex items-center ml-4">
              <button
                onClick={() => handleCompleteToggle(task)}
                className={`p-2 rounded mr-2 ${task.completed ? 'bg-red-500' : 'bg-green-500'} text-white`}
              >
                {task.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
              <button
                onClick={() => {
                  setEditingTask(task._id);
                  setEditTitle(task.title);
                  setEditDescription(task.description);
                  setEditDueDate(task.dueDate);
                  setEditPriority(task.priority);
                }}
                className="p-2 bg-yellow-500 text-white rounded mr-2"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteTask(task._id))}
                className="p-2 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>

            {editingTask === task._id && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Edit Task</h3>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  placeholder="Title"
                  className="border border-gray-300 p-2 w-full mb-2 rounded"
                />
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  placeholder="Description"
                  className="border border-gray-300 p-2 w-full mb-2 rounded"
                />
                <input
                  type="date"
                  value={editDueDate}
                  onChange={(e) => setEditDueDate(e.target.value)}
                  className="border border-gray-300 p-2 w-full mb-2 rounded"
                />
                <select
                  value={editPriority}
                  onChange={(e) => setEditPriority(e.target.value)}
                  className="border border-gray-300 p-2 w-full mb-4 rounded"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
                <button
                  onClick={() => handleUpdate(tasks.find(task => task._id === editingTask))}
                  className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
                >
                  Update Task
                </button>
                <button
                  onClick={() => setEditingTask(null)}
                  className="bg-gray-500 text-white p-2 w-full rounded mt-2"
                >
                  Cancel
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
//Task list working code