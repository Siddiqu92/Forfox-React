 
import React from 'react';

import './App.css';

const Task = ({ task, onDelete, onToggleComplete }) => {
  return (
    <div>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={onToggleComplete}>
        {task.completed ? 'Incomplete' : 'Complete'}
      </button>
      <button onClick={onDelete}>Delete</button>
    </div>
  );
};

export default Task;
