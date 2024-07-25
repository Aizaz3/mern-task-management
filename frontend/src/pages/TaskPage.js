import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../actions/taskActions';

const TaskPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleCreateTask = () => {
    setCurrentTask(null);
    setIsFormOpen(true);
  };

  const handleEditTask = (task) => {
    setCurrentTask(task);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>
      <button
        onClick={handleCreateTask}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Create Task
      </button>
      <TaskList onEdit={handleEditTask} />
      {isFormOpen && <TaskForm task={currentTask} onClose={handleCloseForm} />}
    </div>
  );
};

export default TaskPage;
