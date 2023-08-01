// App.js

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';
import { fetchTasksByGroup, addTask, updateTaskCompletion, deleteTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [userGroup, setUserGroup] = useState('groupA');
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchTasksByGroup(userGroup)
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
        setLoading(false);
      });
  }, [userGroup]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    const newTask = {
      title,
      description,
      completed: false,
      group: userGroup,
    };
    addTask(newTask)
      .then((addedTask) => {
        if (addedTask) {
          setTasks([...tasks, addedTask]);
          setTitle('');
          setDescription('');
        }
      })
      .catch((error) => {
        console.error('Error adding task:', error);
      });
  };

  const handleToggleComplete = (taskId, completed) => {
    updateTaskCompletion(taskId, completed)
      .then((updatedTask) => {
        if (updatedTask) {
          setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        }
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

  const handleDelete = (taskId) => {
    deleteTask(taskId)
      .then((deletedTask) => {
        if (deletedTask) {
          setTasks(tasks.filter((t) => t.id !== deletedTask.id));
        }
      })
      .catch((error) => {
        console.error('Error deleting task:', error);
      });
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return; // Item was dropped outside the list
    const newTasks = Array.from(tasks);
    const [reorderedTask] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, reorderedTask);
    setTasks(newTasks);
  };

  return (
    <div className="App">
      <h1>Task Management System</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
      {loading ? (
        <div>Loading tasks...</div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="taskList">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="task-list"
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task.id}
                    draggableId={task.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
                          <h3>{task.title}</h3>
                          <p>{task.description}</p>
                          <button
                            onClick={() => handleToggleComplete(task.id, !task.completed)}
                          >
                            {task.completed ? 'Incomplete' : 'Complete'}
                          </button>
                          <button onClick={() => handleDelete(task.id)}>Delete</button>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
}

export default App;
  