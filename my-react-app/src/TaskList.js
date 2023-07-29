 
import React from 'react';
import Task from './Task';
import './App.css';

const TaskList = ({ tasks, setTasks, userGroup }) => {
  const handleDelete = (task) => {
    setTasks(tasks.filter((t) => t !== task));
  };

  const handleToggleComplete = (task) => {
    setTasks(
      tasks.map((t) =>
        t === task ? { ...t, completed: !t.completed } : t
      )
    );
  };

  return (
    <div>
      <h2>Task List for {userGroup}</h2>
      {tasks.map((task) => (
        <Task
          key={task.title}
          task={task}
          onDelete={() => handleDelete(task)}
          onToggleComplete={() => handleToggleComplete(task)}
        />
      ))}
    </div>
  );
};

export default TaskList;
