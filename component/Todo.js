
import React, { useState, useEffect } from 'react';
import styles from './Todo.module.css';

const Card = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);
  const [currentDate, setCurrentDate] = useState(' ');

  useEffect(() => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(new Date().toLocaleDateString('en-US', options));
  }, []);

  const addTask = () => {
    if (task.trim() !== "") {
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const timestamp = `${hours}:${minutes}`;

      const newTask = {
        text: task,
        timestamp: timestamp,
        completed: false // Added completed state
      };
      setTodos([newTask, ...todos]);
      setTask('');
    } else {
      alert('Input Task');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  };

  const handleInputChange = (event) => {
    setTask(event.target.value);
  };

  const deleteTask = (index) => {
    const newTodos = todos.filter((element, i) => i !== index);
    setTodos(newTodos);
  };

  const completeTask = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  };

  const moveTaskUp = (index) => {
    if (index > 0) {
      const updatedTasks = [...todos];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTodos(updatedTasks);
    }
  };

  const moveTaskDown = (index) => {
    if (index < todos.length - 1) {
      const updatedTasks = [...todos];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTodos(updatedTasks);
    }
  };

  return (
    <>
      <div className="bg-custom-bg bg-cover bg-center">
        <div className='flex justify-center items-center h-screen'>
          <div className='max-w-lg h-160 w-full border border-black text-center p-10 bg-neutral-100 rounded-xl'>
          <p className="text-4xl font-bold text-sky-700 font-mono text-center">{currentDate}</p>
            <h1 className="text-2xl font-bold mb-4 text-sky-700">Todo List</h1>
            <div className='flex space-x-2 mb-4'>
              <input
                type="text"
                value={task}
                maxLength={50}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
                placeholder="Enter your task"
                className="flex-1 p-2 mr-10px h-10 w-20 border-black border w-200px rounded"
              />
              <button
                onClick={addTask}
                className="px-4 py-2 bg-sky-700 text-white rounded font-extrabold"
              >
               +
              </button>
            </div>
            <ul className='list-none p-0 max-h-64 overflow-auto relative'>

              {todos.map((todo, index) => (
                <li key={index} className="flex justify-between items-center p-4 border-b border-black mb-3 max-h-18">

                  <div className={`flex flex-row  ${todo.completed ? 'line-through' : ''}`}>
                    <span className='flex justify-center items-center ml-8 text-left p-2 '>{todo.text}</span>
                  </div>

                  <div className="flex space-x-1">
                    <button onClick={() => completeTask(index)} className="px-2.5 py-1 bg-sky-700 text-white rounded font-extrabold">✓</button>
                    <button onClick={() => deleteTask(index)} className="px-2.5 py-1 bg-red-600 text-white rounded font-bold">✘</button>
                  </div>
             
                  <div className='flex flex-col gap-y-1 absolute '>
                    <button onClick={() => moveTaskUp(index)} className="px-2.5 py-1 bg-red-600 text-white rounded font-bold  absolute -left-4 -top-9">↑</button>
                    <button onClick={() => moveTaskDown(index)} className="px-2.5 py-1 bg-red-600 text-white rounded font-bold absolute -left-4">↓</button>
                  </div>

                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
