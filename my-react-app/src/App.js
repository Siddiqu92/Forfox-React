import React, { useState } from 'react';
import './App.css';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [userGroup, setUserGroup] = useState('groupA'); 

  return (
    <div className="App">
      <h1>Task Management System</h1>
      <TaskForm
        tasks={tasks}
        setTasks={setTasks}
        userGroup={userGroup}
      />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        userGroup={userGroup}
      />
    </div>
  );
}

export default App;
