import React, { useState, useEffect } from 'react';
import './T1.css';

function T1() {
  return (
    <div className='c1'>
      <div className='c2'>
        <ToDoList />
      </div>
    </div>
  );
}

const ToDoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const handleRemove = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleToggleComplete = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);
    setTasks(sortedTasks);
  };

  const handleFilter = () => {
    const filteredTasks = tasks.filter(task => !task.completed);
    setTasks(filteredTasks);
  };

  return (
    <div className='fields' style={{ display: "flex", flexDirection: "column", marginTop: "12px", borderRadius: "12px" }}>
      <form onSubmit={handleSubmit}>
        <h5><label htmlFor="task">Task:</label></h5>
        <textarea 
          value={task} 
          id="task" 
          name="task" 
          rows="4" 
          cols="50"
          placeholder="Enter your tasks here..."
          onChange={(e) => setTask(e.target.value)}
        ></textarea>
        <button type='submit'>Add</button>
      </form>
      <br />
      <div className='controls'>
        <button onClick={handleSort}>Sort by Status</button>
        <button onClick={handleFilter}>Filter Completed</button>
      </div>
      <ul>
        {tasks.map((item, index) => (
          <li key={index} className={item.completed ? 'completed' : ''}>
            {item.text}
            <button onClick={() => handleToggleComplete(index)}>
              {item.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default T1;
