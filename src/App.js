import React, { useState } from 'react';
import './App.css';


function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [taskPriority, setTaskPriority] = useState('low');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState('');
  const [editedPriority, setEditedPriority] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = {
        text: taskInput,
        priority: taskPriority,
      };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      setTaskPriority('low');
    }
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateTaskText = (index) => {
    if (editedTask.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index].text = editedTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedTask('');
    }
  };

  const updateTaskPriority = (index) => {
    if (editedPriority.trim() !== '') {
      const updatedTasks = [...tasks];
      updatedTasks[index].priority = editedPriority;
      setTasks(updatedTasks);
      setEditingIndex(null);
      setEditedPriority('');
    }
  };

  const countHighPriorityTasks = () => tasks.filter((task) => task.priority === 'high').length;
  const countMediumPriorityTasks = () => tasks.filter((task) => task.priority === 'medium').length;
  const countLowPriorityTasks = () => tasks.filter((task) => task.priority === 'low').length;

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div>
        <p>Total Tasks: {tasks.length}</p>
        <p>High Priority Tasks: {countHighPriorityTasks()}</p>
        <p>Medium Priority Tasks: {countMediumPriorityTasks()}</p>
        <p>Low Priority Tasks: {countLowPriorityTasks()}</p>
      </div>
      <div>
        <input
          type="text"
          placeholder="Add a task"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
        />
        <select
          value={taskPriority}
          onChange={(e) => setTaskPriority(e.target.value)}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task, index) => (
          <li
            key={index}
            style={{
              backgroundColor:
              task.priority === 'high'
                ? '#ff8888' // Slightly darker Red
                : task.priority === 'medium'
                ? '#ffff88' // Slightly darker Yellow
                : '#88ff88' // Slightly darker Green
            }}
          >
            <div>
              {editingIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editedTask}
                    onChange={(e) => setEditedTask(e.target.value)}
                  />
                  <button onClick={() => updateTaskText(index)}>Save Text</button>
                </div>
              ) : (
                <div>
                  {task.text}
                  <button onClick={() => setEditingIndex(index)}>Edit Text</button>
                </div>
              )}
            </div>
            <div>
              {editingIndex === index ? (
                <div>
                  <select
                    value={editedPriority}
                    onChange={(e) => setEditedPriority(e.target.value)}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <button onClick={() => updateTaskPriority(index)}>Save Priority</button>
                </div>
              ) : (
                <div>
                  Priority: {task.priority}
                  <button onClick={() => setEditingIndex(index)}>Edit Priority</button>
                </div>
              )}
            </div>
            <button onClick={() => removeTask(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
