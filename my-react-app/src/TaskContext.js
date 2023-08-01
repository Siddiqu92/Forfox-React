import React, { createContext, useState } from 'react';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [userGroup, setUserGroup] = useState('groupA'); // You can set the user group dynamically with user authentication.

  return (
    <TaskContext.Provider value={{ tasks, setTasks, userGroup, setUserGroup }}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskContext, TaskProvider };

