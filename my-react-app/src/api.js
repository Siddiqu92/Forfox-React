

const users = [
  { id: 1, name: 'User 1', group: 'groupA' },
  { id: 2, name: 'User 2', group: 'groupA' },
  { id: 3, name: 'User 3', group: 'groupB' },
  // Add more users and groups as needed
];

const tasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', completed: false, group: 'groupA' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', completed: true, group: 'groupA' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', completed: false, group: 'groupB' },
  // Add more tasks for different groups
];

export const fetchTasksByGroup = (group) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const groupTasks = tasks.filter((task) => task.group === group);
      resolve(groupTasks);
    }, 500);
  });
};

export const addTask = (newTask) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      newTask.id = tasks.length + 1;
      tasks.push(newTask);
      resolve(newTask);
    }, 500);
  });
};

export const updateTaskCompletion = (taskId, completed) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        task.completed = completed;
        resolve(task);
      } else {
        resolve(null);
      }
    }, 500);
  });
};

export const deleteTask = (taskId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = tasks.findIndex((t) => t.id === taskId);
      if (index !== -1) {
        const deletedTask = tasks.splice(index, 1)[0];
        resolve(deletedTask);
      } else {
        resolve(null);
      }
    }, 500);
  });
};
