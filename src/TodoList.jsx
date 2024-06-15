import React, { useState } from 'react';
import Confetti from 'react-dom-confetti';
import './styles.css';


const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 40,
    elementCount: 100,
    dragFriction: 0.12,
    duration: 2500,
    stagger: 3,
    width: '10px',
    height: '10px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  };

  const addTodo = () => {
    const todoText = inputValue.trim();
    if (!todoText) return;

    const newTodo = { text: todoText, completed: false };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
    if (newTodos[index].completed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000); // Hide confetti after 2 seconds
    }
  };


  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="container">
      <h1 className="header">To-Do List</h1>
      <div className="input-container">
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a task"
        />
        <button onClick={addTodo}>ADD</button>
      </div>
      <div className="task-section">
        <h2>Pending Tasks</h2>
        <ul id="remaining-list">
          {todos
            .filter(todo => !todo.completed)
            .map((todo, index) => (
              <li key={index} onClick={() => toggleTodo(index)} className={todo.completed ? 'completed' : ''}>
                {todo.text}
                <button onClick={(e) => { e.stopPropagation(); deleteTodo(index); }}>DELETE</button>
              </li>
            ))}
        </ul>
      </div>
      <div className="task-section">
        <h2>Accomplished Tasks</h2>
        <ul id="completed-list">
          {todos
            .filter(todo => todo.completed)
            .map((todo, index) => (
              <li key={index} onClick={() => toggleTodo(index)} className={todo.completed ? 'completed' : ''}>
                {todo.text}
                <button onClick={(e) => { e.stopPropagation(); deleteTodo(index); }}>DELETE</button>
              </li>
            ))}
        </ul>
        <Confetti active={showConfetti} config={confettiConfig} />
      </div>

    </div>
  );
};

export default TodoList;
